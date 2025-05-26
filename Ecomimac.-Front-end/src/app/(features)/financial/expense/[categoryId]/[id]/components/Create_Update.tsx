import { Validate, useForm, usePost } from "@/utils/hooks"
import Popup from "@/app/(components)/popup"
import Row from "@/app/(components)/row"
import Input from "@/app/(components)/input"
import Calendar from "@/app/(components)/calendar"
import Text from "@/app/(components)/text"
import { useCallback } from "react"
import { RouteMap, Helper, Message, VNCurrency } from "@/utils/common"
import { useParams } from "next/navigation"
import { IconResponse, ExpenseTransactionResponse } from "@/utils/interface"
import { OFF } from "@/app/(components)/common"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Button from "@/app/(components)/button"
import { usePut } from "@/utils/hooks/Put"

export class FormObject {
  id?: string
  name: string
  description: string
  dateTime: Date | string
  amount: string
}

const validate: Validate<FormObject> = {
  name: (name: string) => name,
  description: (description: string) => description,
  dateTime: (dateTime: Date) => dateTime,
  amount: (amount: string) => amount,
}

interface IParams {
  [key: string]: string
  id: string
}

const CreateUpdate = ({
  onExit,
  expenseTransaction,
}: {
  expenseTransaction?: ExpenseTransactionResponse
  onExit: VoidFunction
}) => {
  const initial: { dateTime: Date; description: string } = {
    dateTime: Helper.Time.now(),
    description: "Giao dịch ngày " + Helper.Time.format(Helper.Time.now()),
  }
  //
  const params = useParams<IParams>()
  const create = usePost(RouteMap.EXPENSE_TRANSACTIONS + "/" + params.id)
  const update = usePut(RouteMap.EXPENSE_TRANSACTIONS)
  const form = useForm<FormObject>(
    Object(expenseTransaction || initial),
    validate
  )

  const onCreate = useCallback(() => {
    const status = form.validate.run()
    if (status === OFF) return

    const data: FormObject = {
      ...form.data,
      dateTime: Helper.Time.toISOString(form.data.dateTime),
    }

    if (form.data.id) update.request(data)
    else create.request(data)
    onExit()
  }, [form, onExit])

  return (
    <Popup
      onExit={onExit}
      trigger={
        <Button main onClick={onCreate} icon="icon/edit-light.svg">
          Hoàn tất
        </Button>
      }
      name="Thêm chi tiêu"
      width={546}
    >
      <Column>
        <Title>1. Thông tin</Title>
        <Description>
          Bảng chi tiêu cá nhân theo một cách hiểu đơn giản nhất, là tập hợp
          những thông tin liên quan đến tài chính cá nhân như các khoản chi
          tiêu, đầu tư, thu nhập,
        </Description>
      </Column>
      <Row gap={20}>
        <Input
          autoFocus
          placeholder="Mua sắm, thức ăn"
          label="Mục đích"
          error={Message.CONTENT_NOT_EMPTY}
          {...form.create("name")}
        ></Input>
        <Calendar
          onChange={(date) => form.append("dateTime", date)}
          label="Ngày giao dịch"
        ></Calendar>
      </Row>
      <Text label="Mô tả" {...form.create("description")} />
      <Input
        placeholder="120000"
        label="Số tiền"
        format={VNCurrency}
        error={Message.CHECK_VALUE}
        {...form.create("amount")}
      ></Input>
    </Popup>
  )
}

export default CreateUpdate
