import { Validate, useForm, usePost } from "@/utils/hooks"
import { RouteMap, Message } from "@/utils/common"
import { OFF, ON } from "@/app/(components)/common"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Row from "@/app/(components)/row"
import Input from "@/app/(components)/input"
import Text from "@/app/(components)/text"
import Dropdown from "@/app/(components)/dropdown"
import Icon from "@/app/(components)/icon"

export interface FormData {
  userName: string
  password: string
  description: string
  email: string
  name: string
}

const validate: Validate<FormData> = {
  userName: (userName: string) => userName,
  password: (password: string) => password,
  description: (description: string) => description,
  email: (email: string) => email,
  name: (name: string) => name,
}

const CreateUpdate = ({ onExit }: { onExit: VoidFunction }) => {
  const form = useForm<FormData>(
    {
      description: Message.IAM_DESCRIPTION,
    },
    validate
  )
  const subAccount = usePost(RouteMap.EXTRA)

  const onSave = () => {
    const status = form.validate.run()
    if (status === OFF) return

    subAccount.request(form.data)
    onExit()
  }

  return (
    <Popup
      name="Tạo tài khoản IAM"
      onExit={onExit}
      width={546}
      trigger={
        <Icon dir="icon/done.svg" onClick={onSave}>
          Create
        </Icon>
      }
    >
      <Column gap={8}>
        <Content>1. Information tài khoản</Content>
        <Description>
          Tài khoản IAM giúp bạn tiết kiệm thời gian bằng cách điền mật khẩu,
          địa chỉ và chi tiết thanh toán dựa trên thông tin mà bạn đã phân
          quyền.
        </Description>
      </Column>
      <Column gap={16}>
        <Row gap={8}>
          <Input
            autoFocus
            label="Username"
            placeholder="account@name"
            {...form.create("userName")}
            error={Message.CAN_NOT_EMPTY}
          ></Input>
          <Input
            label="Tên tài khoản"
            {...form.create("name")}
            placeholder="Join.DF"
            error={Message.CAN_NOT_EMPTY}
          ></Input>
        </Row>
        <Input
          label="Mật khẩu"
          {...form.create("password")}
          placeholder="******"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
        <Input
          label="Xác nhận mật khẩu"
          {...form.create("password")}
          placeholder="******"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
        <Text
          label="Mô tả"
          {...form.create("description")}
          placeholder="Tài khoản mới tạo,..."
          error={Message.CAN_NOT_EMPTY}
        ></Text>
        <Input
          label="Email"
          {...form.create("email")}
          placeholder="email@gmail.com"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
        {/* <PictureUI silent={ON} /> */}
      </Column>

      <Column gap={8}>
        <Content>2. Phân quyền</Content>
        <Description>
          Quản trị viên hệ thống (quyền Admin) là người dùng có quyền cao nhất
          trong hệ thống, đây là tài khoản có khả năng quản lý việc phân quyền
          trong ứng dụng.
        </Description>
      </Column>
      <Dropdown
        label="List mẫu"
        items={[]}
        each={(item) => item}
        show={(item) => String()}
      ></Dropdown>
    </Popup>
  )
}

export default CreateUpdate
