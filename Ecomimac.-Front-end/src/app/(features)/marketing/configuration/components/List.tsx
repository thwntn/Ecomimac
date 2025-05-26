import Column from "@/app/(components)/column"
import Context from "@/app/(components)/context"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Line from "@/app/(components)/line"
import Filter from "@/app/(components)/list/filter"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import {
  ChannelBroadcast,
  concatPathName,
  Helper,
  HubMethodName,
  RouteMap,
} from "@/utils/common"
import { useConfirm, useConnection } from "@/utils/functions"
import { useDelete, useEffectOnce, useGet } from "@/utils/hooks"
import { ChannelResponse } from "@/utils/interface"
import { EmailCredentialResponse } from "@/utils/interface/EmailCredential"
import { useEffect } from "react"

const List = () => {
  const confirm = useConfirm()
  const connection = useConnection()
  const deleteMailCredential = useDelete(RouteMap.EMAIL_CREDENTIAL)

  const fetchChannel = useGet<Array<ChannelResponse>>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.CHANNEL)
  )

  const fetchEmailCredential = useGet<Array<EmailCredentialResponse>>(
    RouteMap.EMAIL_CREDENTIAL
  )

  const remove = (emailCredential: EmailCredentialResponse) =>
    confirm(() =>
      deleteMailCredential.request({ pathname: emailCredential.id })
    )

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.MAIL_CREDENTIAL, () =>
      fetchEmailCredential.fetch()
    )
  )
  return (
    <Column gap={24}>
      <Filter filters={[]}></Filter>
      <div className="grid grid-cols-3 gap-[24px]">
        <RenderIf
          reference={fetchChannel.response}
          render={(channels) => (
            <RenderIf
              reference={fetchEmailCredential.response}
              render={(emailCredential) =>
                emailCredential.map((item, index) => {
                  const channel = channels.find(
                    (channel) => channel.enum === ChannelBroadcast.EMAIl
                  )
                  if (channel === undefined) return

                  return (
                    <Wrapper>
                      <Row justifyBetween>
                        <Image
                          src={concatPathName(
                            process.env.NEXT_PUBLIC_BACKEND,
                            channel.icon
                          )}
                          width={48}
                          height={48}
                        ></Image>
                        <Context
                          items={[
                            {
                              icon: "icon/trash.svg",
                              label: (
                                <span className="text-red-500">
                                  Xoá định danh
                                </span>
                              ),
                              callback: () => remove(item),
                            },
                          ]}
                        ></Context>
                      </Row>

                      <Column>
                        <Title lineClamp={1}>{item.name}</Title>
                        <Description lineClamp={2}>
                          {channel.description}
                        </Description>
                      </Column>

                      <Column>
                        <Description>Tài khoản: {item.userName}</Description>
                        <Description>Mật khẩu: ************</Description>
                      </Column>

                      <Line></Line>

                      <Row>
                        <Row itemsCenter gap={4}>
                          <Icon dir="icon/configuration/clock.svg"></Icon>
                          <Description>
                            {Helper.Time.format(item.created)}
                          </Description>
                        </Row>
                        <Row itemsCenter gap={4}>
                          <Icon dir="icon/configuration/user.svg"></Icon>
                          <Description>{item.profile.name}</Description>
                        </Row>
                      </Row>
                    </Wrapper>
                  )
                })
              }
            ></RenderIf>
          )}
        ></RenderIf>
      </div>
    </Column>
  )
}

export default List
