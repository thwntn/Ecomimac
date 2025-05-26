import { Validate, useForm, usePost, usePatch } from "@/utils/hooks"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Row from "@/app/(components)/row"
import Input from "@/app/(components)/input"
import Calendar from "@/app/(components)/calendar"
import Text from "@/app/(components)/text"
import { RouteMap, Helper, Message, VNCurrency } from "@/utils/common"
import { IconResponse, ExpenseResponse } from "@/utils/interface"
import { OFF } from "@/app/(components)/common"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Column from "@/app/(components)/column"

export interface CreateUpdateForm {
  id?: string
  name: string
  description: string
  dateTime: string
  budget?: number
}

const validate: Validate<CreateUpdateForm> = {
  name: (name: string) => name,
  description: (description: string) => description,
  dateTime: (dateTime: unknown) => dateTime,
}

const CreateUpdate = ({
  category,
  onExit,
  expenseCategoryId,
}: {
  category?: ExpenseResponse
  onExit: VoidFunction
  expenseCategoryId: string
}) => {
  const initial: {
    dateTime: Date
    description: string
    expenseCategoryId: string
  } = {
    dateTime: Helper.Time.now(Helper.Time.timeZone.VIETNAM),
    description: Message.CATEGORY_DESCRIPTION,
    expenseCategoryId,
  }

  const form = useForm<CreateUpdateForm>(Object(category || initial), validate)
  const create = usePost(RouteMap.EXPENSE)
  const update = usePatch(RouteMap.EXPENSE)

  const onFinish = () => {
    const status = form.validate.run()
    if (status === OFF) return
    onExit()

    const formdata: CreateUpdateForm = form.data
    if (form.data.id === undefined) create.request(formdata)
    else update.request(formdata)
  }

  return (
    <Popup
      width={564}
      trigger={
        <Button onClick={onFinish} icon="icon/edit-light.svg" main>
          Hoàn tất
        </Button>
      }
      onExit={onExit}
      name="Danh mục chi tiêu"
    >
      <Column>
        <Title>1. Thông tin</Title>
        <Description>
          Bảng chi tiêu cá nhân theo một cách hiểu đơn giản nhất, là tập hợp
          những thông tin liên quan đến tài chính cá nhân như các khoản chi
          tiêu, đầu tư, thu nhập,
        </Description>
      </Column>
      <Column gap={12}>
        <Row gap={12}>
          <Input
            autoFocus
            label="Tên danh mục"
            placeholder="Mua sắm, du lịch"
            {...form.create("name")}
          ></Input>
          <Calendar
            label="Danh mục của tháng"
            onChange={(date) => form.append("dateTime", date)}
          ></Calendar>
        </Row>
        <Input
          autoFocus
          label="Ngân sách"
          placeholder="2.000.000 đ"
          format={VNCurrency}
          {...form.create("budget")}
        ></Input>
      </Column>
      <Text label="Mô tả" {...form.create("description")} />
    </Popup>
  )
}

export default CreateUpdate
