import { RouteMap, concatPathName } from "@/utils/common"
import { useForm, useGet, usePost, usePut } from "@/utils/hooks"
import { ChannelResponse } from "@/utils/interface/Broadcast"
import { ContentResponse } from "@/utils/interface/Content"
import Button from "@/app/(components)/button"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Text from "@/app/(components)/text"
import Title from "@/app/(components)/title"

interface FormData {
  name: string
  description: string
  mode: number
}

interface IProps {
  onExit(): void
}

const CreateUpdate = (props: IProps) => {
  const form = useForm<FormData>()
  const create = usePost<ContentResponse>(RouteMap.CONTENTS)
  const update = usePut<ContentResponse>(RouteMap.CONTENTS)
  const fetchMode = useGet<Array<ChannelResponse>>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.MODE)
  )

  const onFinish = () => {
    create.request(form.data)
    props.onExit()
  }

  return (
    <Popup
      width={564}
      onExit={props.onExit}
      trigger={
        <Button main icon="icon/edit-light.svg" onClick={onFinish}>
          Hoàn tất
        </Button>
      }
      name="Mẫu tin"
    >
      <Column gap={16}>
        <Row gap={8} itemsCenter>
          <Character size={36} text="1" noColor></Character>
          <Column>
            <Title>Thông tin</Title>
            <Description>
              Mô tả ngắn gọn mục đích hoặc nội dung chi tiết cho bản ghi.
            </Description>
          </Column>
        </Row>

        <Input
          label="Tên mẫu tin"
          placeholder="Quảng cáo sản phẩm tồn kho, ..."
          {...form.create("name")}
        ></Input>
        <Text
          label="Mô tả"
          placeholder="Gửi banner quảng cáo, danh sách sản phẩm mới, ..."
          {...form.create("description")}
        ></Text>
      </Column>
      <Column gap={16}>
        <Row gap={8} itemsCenter>
          <Character size={36} text="2" noColor></Character>
          <Column>
            <Title>Loại mẫu tin</Title>
            <Description>Chọn mẫu tin muốn gửi</Description>
          </Column>
        </Row>

        <RenderIf
          reference={fetchMode.response}
          render={(modes) => (
            <Dropdown
              label="Mẫu tin"
              items={modes}
              each={(item) => item.name}
              show={(item) => item.name}
              onChange={(item) => form.append("mode", item.mode)}
            ></Dropdown>
          )}
        ></RenderIf>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
