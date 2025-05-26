import { concatPathName, Message, Redirect, RouteMap } from "@/utils/common"
import { useEffectOnce, usePost } from "@/utils/hooks"
import { OpenIntegrateSessionResponse } from "@/utils/interface/OpenIntegrateSession"
import { SnackbarMode, useSnackbar } from "@/utils/functions"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { Fragment } from "react"

interface IProps {
  broadcastId: string
  onExit: VoidFunction
}

const Session = (props: IProps) => {
  const snackbar = useSnackbar()
  const postSession = usePost<OpenIntegrateSessionResponse>(
    concatPathName(
      RouteMap.OPEN_INTEGRATE_SESSION,
      RouteMap.OPEN_INTEGRATE_SESSION_CREATE_BROADCAST
    )
  )

  useEffectOnce(
    () => void postSession.request({ broadcastId: props.broadcastId })
  )

  const urlIntegrate = (openIntegrateSession: OpenIntegrateSessionResponse) =>
    concatPathName(
      process.env.NEXT_PUBLIC_INTEGRATE_N8N,
      RouteMap.OPEN_INTEGRATE_SESSION,
      openIntegrateSession.session,
      RouteMap.ACTIVE
    )

  const onToClipboard = (openIntegrateSession: OpenIntegrateSessionResponse) =>
    navigator.clipboard.writeText(urlIntegrate(openIntegrateSession)).then(() =>
      snackbar(SnackbarMode.warning, {
        title: Message.BROADCAST_COPY_INTEGRATION_TO_CLIPBOARD,
        description:
          Message.BROADCAST_COPY_INTEGRATION_TO_CLIPBOARD_DESCRIPTION,
      })
    )

  const isLoad = convert(postSession.isWait === true)
  return (
    <Popup isLoad={isLoad} onExit={props.onExit} width={465}>
      <Column gap={24} justifyCenter itemsCenter className="p-[24px]">
        <Row justifyCenter itemsCenter>
          <div className="p-[32px] bg-gray-100 rounded-full">
            <Image width={56} height={56} dir="icon/broadcast/n8n.png"></Image>
          </div>
        </Row>
        <Column justifyCenter>
          <Description className="text-center">Phiên làm việc</Description>
          <RenderIf
            reference={postSession.response}
            render={(session) => (
              <Title className="!text-[20px] text-center">
                {session.session}
              </Title>
            )}
          ></RenderIf>
        </Column>
        <Column gap={16}>
          <Column>
            <RenderIf
              reverse="..."
              reference={postSession.response}
              render={(session) => (
                <Fragment>
                  <Content>Sao chép đường dẫn tích hợp</Content>
                  <Row justifyBetween itemsCenter gap={8}>
                    <Description lineClamp={1}>
                      {urlIntegrate(session)}
                    </Description>
                    <Icon
                      onClick={() => onToClipboard(session)}
                      dir="icon/broadcast/copy-url.svg"
                    ></Icon>
                  </Row>
                </Fragment>
              )}
            ></RenderIf>
          </Column>
          <Column>
            <Content>Cài đặt vào node "HTTP Request" của n8n</Content>
            <Description>
              Trong phần cấu hình node, bạn dán URL vừa sao chép ở bước trên vào
              trường URL.
            </Description>
          </Column>
          <Column>
            <Content>Kích hoạt luồng</Content>
            <Description>
              Khi có request gửi đến từ nền tảng ngoài (hoặc từ chính hệ thống),
              luồng sẽ được kích hoạt và thực thi các bước trong workflow.
            </Description>
          </Column>
        </Column>

        <Image
          width="100%"
          height={256}
          className="rounded-[4px]"
          dir="icon/broadcast/example-session.png"
        ></Image>
      </Column>
    </Popup>
  )
}

export default Session
