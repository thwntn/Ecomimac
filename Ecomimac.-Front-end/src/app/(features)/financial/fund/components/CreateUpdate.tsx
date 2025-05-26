import { Validate, useForm, usePost } from "@/utils/hooks"
import { RouteMap } from "@/utils/common"
import { OFF } from "@/app/(components)/common"
import { CardType, Message } from "@/utils/common"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Input from "@/app/(components)/input"
import Dropdown from "@/app/(components)/dropdown"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"

export interface FormData {
  name: string
  type: string
  number: string
  author: string
  description: string
  backgroundUrl: string
}

const validate: Validate<FormData> = {
  name: (name: string) => name,
  type: (type: string) => type,
  number: (number: string) => number,
  author: (author: string) => author,
  description: (description: string) => description,
  backgroundUrl: (backgroundUrl: string) => backgroundUrl,
}

const CreateUpdate = ({ onExit }: { onExit: VoidFunction }) => {
  const form = useForm<FormData>({}, validate)
  const create = usePost(RouteMap.FUND)

  const onCreateUpdate = () => {
    const status = form.validate.run()
    if (status === OFF) return

    create.request(form.data)
    onExit()
  }

  return (
    <Popup
      name="Thêm nguồn tiền"
      onExit={onExit}
      trigger={
        <Button main onClick={onCreateUpdate}>
          Lưu thay đổi
        </Button>
      }
      width={546}
    >
      <Column gap={16}>
        <Column>
          <Title>Thông tin thẻ</Title>
          <Description>Thông tin liên kết ngân hàng xác thực</Description>
        </Column>
        <Input
          {...form.create("number")}
          name="number"
          label="Số thẻ"
          placeholder="2384 8374 8374 3873"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
        <Input
          {...form.create("author")}
          label="Tên chủ thẻ"
          placeholder="Mr.Join"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
        <div className="flex gap-4">
          <Input
            {...form.create("name")}
            label="Tên thẻ"
            placeholder="black.cash"
            error={Message.CAN_NOT_EMPTY}
          ></Input>
          <Dropdown
            label="Loại thẻ"
            onChange={(item) => form.append("type", item.value)}
            show={(item: { name: string; value: string }) => item.value}
            error={Message.CAN_NOT_EMPTY}
            items={Object.keys(CardType).map((item) => ({
              name: item,
              value: Object(CardType)[item],
            }))}
            each={(item) => <div>{item.value}</div>}
          ></Dropdown>
        </div>
      </Column>
      <Column gap={16}>
        <Column>
          <Title>Giao diện</Title>
          <Description>Hình nền thẻ, mô tả thông tin</Description>
        </Column>
        <Input
          {...form.create("description")}
          label="Mô tả, chú thích thẻ"
          placeholder="Thẻ dùng để chi tiêu trong tháng, ..."
          error={Message.CAN_NOT_EMPTY}
        ></Input>
        <Input
          {...form.create("backgroundUrl")}
          label="Hình nền thẻ"
          placeholder="https://cdn.image.png"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
