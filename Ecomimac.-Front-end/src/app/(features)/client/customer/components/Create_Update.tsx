import { RouteMap } from "@/utils/common"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Input from "@/app/(components)/input"
import { Form, useForm, usePost, usePut } from "@/utils/hooks"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Row from "@/app/(components)/row"
import Column from "@/app/(components)/column"
import { CustomerResponse } from "@/utils/interface"
import { TagResponse } from "@/utils/interface/Tag"
import OptionTag from "@/app/(components)/option-tag"

interface FormData {
  id?: string
  name: string
  phone: string
  address: string
  birthday: string
  tags: TagResponse[]
}

export class CreateCustomerState {
  constructor(public form: Form<FormData>, public request: VoidFunction) {}
}

const initialForm = {
  tags: [],
}

const CreateUpdate = ({
  onExit,
  customer,
}: {
  onExit: VoidFunction
  customer?: CustomerResponse
}) => {
  const form = useForm<FormData>(Object.assign(initialForm, customer))
  const create = usePost(RouteMap.CUSTOMER)
  const update = usePut(RouteMap.CUSTOMER)

  const request = () => {
    const formdata = Object.assign(
      {
        tagIds: form.data.tags.map((tag) => tag.id),
      },
      form.data
    )

    if (form.data.id) update.request(formdata)
    else create.request(formdata)
    onExit()
  }

  return (
    <Popup
      onExit={onExit}
      name="Thêm khách hàng"
      width={546}
      trigger={
        <Button main onClick={request}>
          Hoàn tất
        </Button>
      }
    >
      <Column>
        <Title>Thông tin cơ bản</Title>
        <Description>
          Bao gồm thông tin cá nhân, tương tác, hành vi và phản hồi
        </Description>
      </Column>
      <Row gap={16}>
        <Column size={8}>
          <Input
            label="Tên khách hàng"
            placeholder="Thiên Tân"
            {...form.create("name")}
          ></Input>
        </Column>
        <Column size={4}>
          <Input
            label="Năm sinh"
            placeholder="2000"
            {...form.create("birthday")}
          ></Input>
        </Column>
      </Row>
      <Column>
        <Title>Thông tin liên lac, định danh</Title>
        <Description>
          Dữ liệu quan trọng giúp doanh nghiệp hiểu rõ hơn về khách hàng của
          mình, bao gồm thông tin cá nhân
        </Description>
      </Column>
      <Input
        label="Số điện thoại"
        placeholder="0924894xxx"
        {...form.create("phone")}
      ></Input>
      <Input
        label="Địa chỉ"
        placeholder="293 Lâm Văn Bền, Quân 7, Tp.HCM"
        {...form.create("address")}
      ></Input>

      <Column gap={8}>
        <Column>
          <Title>Gắn thẻ</Title>
          <Description>Gom nhóm khách hàng</Description>
        </Column>

        <OptionTag onChange={(tags) => form.append("tags", tags)}></OptionTag>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
