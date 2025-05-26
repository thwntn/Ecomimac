import { Form, Validate, useForm, usePost } from "@/utils/hooks"
import { RouteMap } from "@/utils/common"
import {
  DiscountTimeFrameType,
  Message,
  DiscountQuantityType,
  DiscountCode,
  DiscountType,
} from "@/utils/common/Constant"
import Popup from "@/app/(components)/popup"
import Input from "@/app/(components)/input"
import { useCallback } from "react"
import { DiscountResponse } from "@/utils/interface"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Text from "@/app/(components)/text"
import Button from "@/app/(components)/button"
import { usePut } from "@/utils/hooks/Put"
import { discountSelectOptions, ObjectType } from "../_meta"
import Code from "./components/Code"
import Quantity from "./components/Quantity"
import Time from "./components/Time"
import Type from "./components/Type"
import { TagResponse } from "@/utils/interface/Tag"
import OptionTag from "@/app/(components)/option-tag"

export interface FormObject {
  id?: string
  name: string
  percent: string
  amount: string
  maxAmount: number
  quantity: number
  description: string
  fromDate?: Date
  toDate?: Date
  discountCode?: DiscountCode
  discountType?: DiscountType
  discountTimeFrameType?: DiscountTimeFrameType
  discountQuantityType?: DiscountQuantityType
  tags: TagResponse[]
}

export interface CreateUpdateDiscount {
  form: Form<FormObject>
  request: VoidFunction
}

const validate: Validate<FormObject> = {
  name: (content: string) => content.length > 0,

  amount: (amount: number, form: FormObject) =>
    form.discountCode === DiscountCode.AMOUNT ? amount && amount >= 0 : true,

  percent: (percent: number, form: FormObject) =>
    form.discountCode === DiscountCode.PERCENT
      ? percent > 0 && percent < 100
      : true,

  maxAmount: (maxAmount: number, form: FormObject) =>
    form.discountCode === DiscountCode.PERCENT
      ? maxAmount && maxAmount >= 0
      : true,

  quantity: (quantity: number, form: FormObject) => {
    if (
      form.discountQuantityType === DiscountQuantityType.NONE ||
      form.discountQuantityType === undefined
    )
      return true
    return quantity && quantity > 0
  },
  description: (description: string) => description,
  fromDate: (fromDate: Date, form: FormObject) => {
    if (form.discountTimeFrameType === DiscountTimeFrameType.TIME_FRAME)
      return fromDate
    return true
  },
  toDate: (toDate: Date, form: FormObject) => {
    if (
      form.discountTimeFrameType === DiscountTimeFrameType.TIME_FRAME &&
      form.fromDate &&
      toDate <= form.fromDate
    )
      return false
    return true
  },

  tags: (tags: []) => tags.length > 0,
}

const initialForm = {
  discountTimeFrameType: DiscountTimeFrameType.TIME_FRAME,
  discountQuantityType: DiscountQuantityType.WITH_QUANTITY,
  discountCode: DiscountCode.AMOUNT,
  tags: [],
}

const CreateUpdate = ({
  discount,
  onExit,
}: {
  discount?: DiscountResponse
  onExit: VoidFunction
}) => {
  const form = useForm<FormObject>(
    Object.assign(initialForm, discount),
    validate
  )

  const create = usePost(RouteMap.DISCOUNT)
  const update = usePut(RouteMap.DISCOUNT)

  const onFinish = useCallback(() => {
    const status = form.validate.run()
    if (status === 0) return

    const request = Object.assign(
      { tagIds: form.data.tags.map((tag) => tag.id) },
      form.data
    )

    if (form.data.id) update.request(request).then(onExit)
    else create.request(request).then(onExit)
    /**
     *
     */
  }, [create, form, onExit])

  return (
    <Popup
      name="Tạo mã giảm giá"
      width={564}
      onExit={onExit}
      trigger={
        <Button main onClick={onFinish}>
          Hoàn tất
        </Button>
      }
    >
      <Column gap={16}>
        <Column>
          <Title>1. Thông tin cơ bản</Title>
          <Description>
            Tên mã giảm giá, mô tả chương trình thời gian áp dụng, ...
          </Description>
        </Column>
        <Input
          label="Tên mã giảm giá"
          placeholder="Discount tháng 5"
          error={Message.CAN_NOT_EMPTY}
          {...form.create("name")}
        ></Input>
        <Text
          label="Mô tả mã giảm giá *"
          placeholder="Mã giảm giá mặc định"
          error={Message.CAN_NOT_EMPTY}
          {...form.create("description")}
        ></Text>
      </Column>
      <Time form={form}></Time>
      <Type form={form}></Type>
      <Code form={form}></Code>
      <Quantity form={form}></Quantity>

      <Column>
        <Title>Gắn thẻ</Title>
        <Description>Gom nhóm mã giảm giá</Description>
      </Column>
      <OptionTag onChange={(tags) => form.append("tags", tags)}></OptionTag>
    </Popup>
  )
}

export default CreateUpdate
