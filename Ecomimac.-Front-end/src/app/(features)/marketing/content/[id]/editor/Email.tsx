import Column from "@/app/(components)/column"
import Builder from "./builder/main"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Wrapper from "@/app/(components)/wrapper"
import Button from "@/app/(components)/button"
import { useForm, useGet, usePatch } from "@/utils/hooks"
import { RouteMap, concatPathName } from "@/utils/common"
import { useParams } from "next/navigation"
import { BroadcastResponse } from "@/utils/interface/Broadcast"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Character from "@/app/(components)/character"
import Content from "@/app/(components)/content"
import RenderIf from "@/app/(components)/render-if"
import { Fragment } from "react"
import Tag from "@/app/(components)/tag"
import { tags } from "@/app/(features)/marketing/broadcast/_"

interface FormData {
  content: string
}

interface IPrams {
  [key: string]: string
  id: string
}

const Email = () => {
  const params = useParams<IPrams>()
  const form = useForm<FormData>()
  const information = useGet<BroadcastResponse>(
    concatPathName(RouteMap.BROADCASTS, params.id)
  )
  const active = usePatch(
    concatPathName(RouteMap.BROADCASTS, RouteMap.ACTIVE, params.id)
  )
  const updateContent = usePatch(
    concatPathName(RouteMap.BROADCASTS, RouteMap.CONTENTS, params.id)
  )

  const onSave = () => updateContent.request(form.data)

  const onRunBroadcast = () => active.request({})
  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row size={0.1} gap={8}>
          <Button icon="icon/edit.svg" onClick={onSave}>
            Lưu nội dung
          </Button>
          <Button main icon="icon/create-light.svg" onClick={onRunBroadcast}>
            Kích hoạt
          </Button>
        </Row>
      </Row>
      <Wrapper>
        <RenderIf
          reference={information.response}
          render={(broadcast) => (
            <Fragment>
              <Column>
                <Title>Chi tiết thiết lập quảng bá</Title>
                <Description>
                  Broadcast tin nhắn là hành động gửi cùng một nội dung tin nhắn
                  đến nhiều người nhận cùng lúc, thường dùng trong các hệ thống
                </Description>
              </Column>
              <Column>
                <Row gap={8} itemsCenter>
                  <Character text={broadcast.name}></Character>
                  <Column>
                    <Content>{broadcast.name}</Content>
                    <Description lineClamp={1}>{broadcast.name}</Description>
                  </Column>
                </Row>
              </Column>
              <Tag items={tags}></Tag>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Row gap={24}>
        <RenderIf
          reference={information.response}
          render={(broadcast) => (
            <div
              dangerouslySetInnerHTML={{
                __html: broadcast.content,
              }}
            ></div>
          )}
        ></RenderIf>
        {/* <Column size={10}>
          <Wrapper padding={0} className="overflow-hidden">
            <Builder onChange={updateHTMLContent} />
          </Wrapper>
        </Column>
        <Column size={2}>
          <Sample></Sample>
        </Column> */}
      </Row>
    </Frame>
  )
}

export default Email
