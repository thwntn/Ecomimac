import {
  concatPathName,
  formatNumber,
  Message,
  Redirect,
  RouteMap,
} from "@/utils/common"
import { RecordAndCounter, useForm, useGet, usePost, Validate } from "@/utils/hooks"
import { ChannelResponse } from "@/utils/interface/Broadcast"
import { ContentResponse } from "@/utils/interface/Content"
import { DataResponse } from "@/utils/interface/Data"
import { EmailCredentialResponse } from "@/utils/interface/EmailCredential"
import { useRouter } from "@/utils/functions"
import Button from "@/app/(components)/button"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import { convert, OFF } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Text from "@/app/(components)/text"
import Title from "@/app/(components)/title"

interface FormData {
  name: string
  description: string
  channel: string
  credentialId: string
  content: ContentResponse
  data: DataResponse
}

const validate: Validate<FormData> = {
  name: (name: string) => name,
  description: (description: string) => description,
  channel: (channel: number) => [0, 1, 2].includes(channel),
  credentialId: (credentialId: string) => credentialId,
  content: (content: ContentResponse) => content,
  data: (data: DataResponse) => data,
}

interface IProps {
  onExit(): void
}

const CreateUpdate = (props: IProps) => {
  const router = useRouter()
  const form = useForm<FormData>({}, validate)
  const fetchData = useGet<RecordAndCounter<DataResponse>>(RouteMap.DATA)
  const create = usePost(RouteMap.BROADCASTS)

  const fetchContent = useGet<RecordAndCounter<ContentResponse>>(
    RouteMap.CONTENTS
  )

  const fetchChannel = useGet<Array<ChannelResponse>>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.CHANNEL)
  )

  const fetchCredential = useGet<Array<EmailCredentialResponse>>(
    RouteMap.EMAIL_CREDENTIAL
  )

  const onPreview = (content: ContentResponse) =>
    window.open(
      concatPathName(
        window.location.origin,
        Redirect.MARKETING,
        Redirect.CONTENT,
        content.id
      )
    )

  const onFinish = () => {
    if (form.validate.run() === OFF) return

    //  Summary:
    //    Request create data
    //
    const formdata = Object.assign(
      { contentId: form.data.content.id, dataId: form.data.data.id },
      form.data
    )

    create.request(formdata)
    props.onExit()
  }

  const isLoad = convert(
    fetchData.isWait === true ||
      fetchContent.isWait === true ||
      fetchChannel.isWait === true ||
      fetchCredential.isWait === true
  )
  return (
    <Popup
      isLoad={isLoad}
      name="Gửi tin"
      onExit={props.onExit}
      width={654}
      trigger={
        <Button icon="icon/edit-light.svg" main onClick={onFinish}>
          Hoàn tất
        </Button>
      }
    >
      <Column gap={8}>
        <Column>
          <Title>Thông tin cơ bản</Title>
          <Description>Tên mẫu gửi, nội dung bao hàm </Description>
        </Column>
        <Input
          label="Tên luồng gửi"
          error={Message.CAN_NOT_EMPTY}
          placeholder="Tin nhắn sản phẩm mới"
          {...form.create("name")}
        ></Input>
        <Text
          label="Mô tả"
          error={Message.CAN_NOT_EMPTY}
          placeholder="Quảng cáo sản phẩm mới đến toàn bộ người dùng, ..."
          {...form.create("description")}
        ></Text>
      </Column>
      <Column gap={8}>
        <Column>
          <Title>Kênh gửi & định danh</Title>
          <Description>Tên mẫu gửi, nội dung bao hàm </Description>
        </Column>
        <RenderIf
          reference={fetchChannel.response}
          render={(channels) => (
            <Dropdown
              {...form.create("channel")}
              label="Kênh gửi"
              error={Message.CAN_NOT_EMPTY}
              items={channels}
              show={(item) => item.name}
              each={(item) => (
                <Row gap={12} itemsCenter>
                  <Image
                    width={32}
                    height={32}
                    src={concatPathName(
                      process.env.NEXT_PUBLIC_BACKEND,
                      item.icon
                    )}
                  ></Image>
                  <Column>
                    <Content>{item.name}</Content>
                    <Description>{item.description}</Description>
                  </Column>
                </Row>
              )}
              onChange={(item) => form.append("channel", item.enum)}
            ></Dropdown>
          )}
        ></RenderIf>
        <RenderIf
          reference={fetchCredential.response}
          render={(emalCredential) => (
            <Dropdown
              {...form.create("credentialId")}
              error={Message.CAN_NOT_EMPTY}
              label="Định danh"
              items={emalCredential}
              each={(item) => (
                <Column>
                  <Content>{item.name}</Content>
                  <Description>{item.domain}</Description>
                </Column>
              )}
              show={(item) => item.name}
              onChange={(item) => form.append("credentialId", item.id)}
            ></Dropdown>
          )}
        ></RenderIf>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Mẫu tin & danh sách gửi</Title>
          <Description>Chọn mẫu gửi, nội dung bao hàm</Description>
        </Column>
        <Column gap={8}>
          <RenderIf
            reference={fetchContent.response}
            render={(contents) => (
              <Dropdown
                {...form.create("content")}
                error={Message.CAN_NOT_EMPTY}
                label="Mẫu tin đã soạn"
                items={contents.data}
                show={(item) => item.name}
                each={(item) => (
                  <Row justifyBetween itemsCenter>
                    <Column>
                      <Content>{item.name}</Content>
                      <Description>{item.description}</Description>
                    </Column>
                    <div onClick={(event) => event.stopPropagation()}>
                      <Icon
                        dir="icon/broadcast/review-content.svg"
                        onClick={() => onPreview(item)}
                      />
                    </div>
                  </Row>
                )}
                onChange={(item) => form.append("content", item)}
              ></Dropdown>
            )}
          ></RenderIf>
          <RenderIf
            reference={fetchData.response}
            render={(data) => (
              <Dropdown
                {...form.create("data")}
                error={Message.CAN_NOT_EMPTY}
                label="Nguồn dữ liệu"
                items={data.data}
                each={(item) => (
                  <Row itemsCenter gap={16}>
                    <Character text={item.name}></Character>
                    <Column>
                      <Content>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                    <div className="w-fit">
                      <Row gap={4} itemsCenter>
                        <Description>Số lượng:</Description>
                        <Content>
                          {formatNumber(item.quantityRecord)} bản ghi
                        </Content>
                      </Row>
                    </div>
                  </Row>
                )}
                show={(item) => item.name}
                onChange={(item) => form.append("data", item)}
              ></Dropdown>
            )}
          ></RenderIf>
        </Column>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
