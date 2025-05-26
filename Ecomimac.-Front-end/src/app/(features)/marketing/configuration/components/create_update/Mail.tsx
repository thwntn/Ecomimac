import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import { OFF } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import Text from "@/app/(components)/text"
import Title from "@/app/(components)/title"
import { Message, RouteMap } from "@/utils/common"
import { Regex } from "@/utils/common/Helper/Validate"
import { useForm, usePost, Validate } from "@/utils/hooks"

interface IProps {
  onExit: VoidFunction
}

interface FormData {
  name: string
  userName: string
  apiKey: string
  domain: string
  from: string
}

const validate: Validate<FormData> = {
  name: (name: string) => name,
  userName: (userName: string) => userName,
  apiKey: (apiKey: string) => apiKey,
  domain: (domain: string) => Regex.domain(domain),
  from: (from: string) => Regex.mailgunFrom(from),
}

const Mail = (props: IProps) => {
  const form = useForm<FormData>({}, validate)
  const postMailCredential = usePost(RouteMap.EMAIL_CREDENTIAL)

  const onFinish = () => {
    const status = form.validate.run()
    if (status === OFF) return

    postMailCredential.request(form.data)
    props.onExit()
  }
  return (
    <Popup
      onExit={props.onExit}
      width={654}
      name="Kênh gửi email"
      trigger={
        <Button main onClick={onFinish} icon="icon/edit-light.svg">
          Hoàn tất
        </Button>
      }
    >
      <Column gap={8}>
        <Column>
          <Title>Thông tin kênh gửi email</Title>
          <Description>
            Cấu hình thông tin cơ bản của kênh gửi email
          </Description>
        </Column>
        <Input
          error={Message.CAN_NOT_EMPTY}
          label="Tên kênh"
          placeholder="Kênh Email Marketing"
          {...form.create("name")}
        ></Input>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Thông tin xác thực</Title>
          <Description>
            Cung cấp thông tin đăng nhập và khóa API để xác thực kênh gửi.
          </Description>
        </Column>
        <Input
          error={Message.CAN_NOT_EMPTY}
          label="Tên đăng nhập (Username)"
          placeholder="api"
          {...form.create("userName")}
        ></Input>
        <Text
          error={Message.CAN_NOT_EMPTY}
          label="Khóa API (API key)"
          placeholder="********************************"
          {...form.create("apiKey")}
        ></Text>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Thông tin tài khoản gửi</Title>
          <Description>
            Cấu hình chi tiết tài khoản gửi email và tên miền liên quan.
          </Description>
        </Column>
        <Input
          error={Message.BROADCAST_CONFIGURATION_FROM_ERROR}
          label="Tên tài khoản gửi"
          placeholder="Admin <example@domain.com>"
          {...form.create("from")}
        ></Input>
        <Input
          error={Message.BROADCAST_CONFIGURATION_DOMAIN_ERROR}
          label="Tên miền (Domain)"
          placeholder="example.com"
          {...form.create("domain")}
        ></Input>
      </Column>
    </Popup>
  )
}

export default Mail
