import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { ChannelBroadcast } from "@/utils/common"
import { useWithout } from "@/utils/functions"
import { Fetched } from "@/utils/hooks"
import { BroadcastResponse } from "@/utils/interface"
import { Fragment } from "react"
import NormalZaloNotificationService from "./zalo-notification-service/NormalZaloNotificationService"
import MobileZaloNotificationService from "./zalo-notification-service/mobile-zalo-notification-service"
import MailMobile from "./mail/Mobile"
import MailPreview from "./mail/Mail"

interface IProps {
  fetchBroadcast: Fetched<BroadcastResponse>
}

const PreviewContent = (props: IProps) => {
  const without = useWithout()

  return (
    <Wrapper gap={24}>
      <RenderIf
        reference={props.fetchBroadcast.response}
        render={(broadcast) => (
          <Fragment>
            <Row>
              <Column>
                <Title>Xem trước tin nhắn</Title>
                <Description>
                  Xem trước nội dung tin nhắn mẫu sẽ hiển thị như thế nào khi
                  gửi đến người nhận.
                </Description>
              </Column>

              <RenderIf
                reference={broadcast.channel === ChannelBroadcast.EMAIl}
                render={() => <MailMobile htmlText={broadcast.content.text} />}
              ></RenderIf>

              <RenderIf
                reference={broadcast.channel === ChannelBroadcast.ZALO}
                render={() => <MobileZaloNotificationService />}
              ></RenderIf>
            </Row>

            <RenderIf
              reference={broadcast.channel === ChannelBroadcast.EMAIl}
              render={() => <MailPreview htmlText={broadcast.content.text} />}
            ></RenderIf>

            <RenderIf
              reference={broadcast.channel === ChannelBroadcast.ZALO}
              render={() => <NormalZaloNotificationService />}
            ></RenderIf>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default PreviewContent
