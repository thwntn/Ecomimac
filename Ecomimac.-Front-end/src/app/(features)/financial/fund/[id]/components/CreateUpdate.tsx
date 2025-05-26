import { Validate, useForm, usePost } from "@/utils/hooks"
import { CashResponse, FundResponse } from "@/utils/interface"
import { RouteMap, Helper } from "@/utils/common"
import { Message } from "@/utils/common"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import { OFF } from "@/app/(components)/common"

export interface FormData {
  name: string
  quantity: string
}

const validate: Validate<FormData> = {
  name: (name: string) => name,
  quantity: (quantity: string) => quantity,
}

const CreateUpdate = ({
  fund,
  cash,
  onExit,
}: {
  fund: FundResponse
  cash?: CashResponse
  onExit: VoidFunction
}) => {
  const form = useForm<FormData>(Object(cash), validate)
  const create = usePost(RouteMap.CASH + "/" + fund.id)

  const onCreateUpdate = () => {
    const status = form.validate.run()
    if (status === OFF) return

    create.request(form.data)
    onExit()
  }

  return (
    <Popup
      onExit={onExit}
      trigger={<Button onClick={onCreateUpdate}>Lưu thay đổi</Button>}
      width={645}
      name="Thêm giao dịch"
    >
      <Column gap={8}>
        <Column>
          <Content>1. List</Content>
          <Description>
            Dòng thời gian hiển thị lịch sử từng bước của giao dịch. Mở rộng các
            thao tác riêng lẻ cho mô tả trạng thái, mã lý do trạng thái và dấu
            thời gian sự kiện. Dữ liệu này sẽ giúp bạn hiểu điều gì đã xảy ra
            với giao dịch và khắc phục sự cố nếu cần.
          </Description>
        </Column>
        <Input
          {...form.create("name")}
          autoFocus
          label="Tên"
          placeholder="Lương, thưởng"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
      </Column>
      <Column gap={8}>
        <Column>
          <Content>2. Cost giao dịch</Content>
          <Description>
            Tổng số tiền thu được tính bằng đơn vị tiền tệ giao dịch.
          </Description>
        </Column>
        <Input
          {...form.create("quantity")}
          label={"Cost"}
          placeholder="10.000.000 vnđ"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
