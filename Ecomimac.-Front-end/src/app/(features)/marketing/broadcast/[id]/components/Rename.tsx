import { Form, useForm, usePatch } from "@/utils/hooks"
import Popup from "@/app/(components)/popup"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import Button from "@/app/(components)/button"
import { concatPathName, RouteMap } from "@/utils/common"
import { FormData } from "../Setup"

interface IProps {
  form: Form<FormData>
  onExit: VoidFunction
}

interface FormRename {
  name: string
}

const Rename = (props: IProps) => {
  const form = useForm<FormRename>({ name: props.form.data.name })
  const patchRename = usePatch(
    concatPathName(RouteMap.BROADCASTS, props.form.data.id, RouteMap.RENAME)
  )

  const onFinish = () => {
    patchRename.request({ name: form.data.name })
    props.onExit()
  }
  return (
    <Popup
      width={564}
      onExit={props.onExit}
      name="Đổi tên chiến dịch"
      trigger={
        <Button onClick={onFinish} main icon="icon/edit-light.svg">
          Hoàn tất
        </Button>
      }
    >
      <Column gap={8}>
        <Column>
          <Title>Đổi tên</Title>
          <Description>
            Đặt tên cho chiến dịch để dễ tìm kiếm và quản lý. Ví dụ: “Khuyến mãi
            tháng 5”, “Chăm sóc khách hàng VIP”, v.v.
          </Description>
        </Column>
        <Input label="Tên chiến dịch" {...form.create("name")}></Input>
      </Column>
    </Popup>
  )
}

export default Rename
