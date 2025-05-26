import { Fetched, useForm, usePatch } from "@/utils/hooks"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Input from "@/app/(components)/input"
import Text from "@/app/(components)/text"
import { RouteMap } from "@/utils/common"
import { AccountResponse } from "@/utils/interface"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"

export class FormObject {
  name: string
  birthday: string
  description: string
  address: string
  phone: string
}

const Modify = ({
  onExit,
  account,
}: {
  onExit: VoidFunction
  account: Fetched<AccountResponse>
}) => {
  const update = usePatch(RouteMap.PROFILE)
  const form = useForm<FormObject>(
    Object(account.response && account.response.profile)
  )

  const onUpdate = () => {
    update.request(form.data).then(account.fetch)
    onExit()
  }

  return (
    <Popup
      name="Cập nhật thông tin"
      trigger={
        <Button main icon="icon/edit-light.svg" onClick={onUpdate}>
          Cập nhật
        </Button>
      }
      onExit={onExit}
      width={564}
    >
      <Column gap={8}>
        <Column>
          <Title>1. Định danh</Title>
          <Description>
            Định danh là quá trình hoặc phương pháp dùng để xác định và phân
            biệt một đối tượng, cá nhân hoặc thực thể cụ thể trong một hệ thống
          </Description>
        </Column>
        <Input {...form.create("name")} label="Tên"></Input>
        <Input {...form.create("birthday")} label="Ngày sinh"></Input>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>2. Thông tin</Title>
          <Description>
            Định danh là quá trình hoặc phương pháp dùng để xác định và phân
            biệt một đối tượng, cá nhân hoặc thực thể cụ thể trong một hệ thống
          </Description>
        </Column>
        <Text {...form.create("description")} label="Mô tả"></Text>
        <Input {...form.create("address")} label="Địa chỉ"></Input>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>3. Liên lạc</Title>
          <Description>
            Cá nhân hoặc thực thể cụ thể trong một hệ thống
          </Description>
        </Column>
        <Input {...form.create("phone")} label="Số điện thoại"></Input>
      </Column>
    </Popup>
  )
}

export default Modify
