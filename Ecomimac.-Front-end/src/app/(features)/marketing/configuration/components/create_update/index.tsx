import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import {
  ChannelBroadcast,
  concatPathName,
  Message,
  RouteMap,
} from "@/utils/common"
import { useGet } from "@/utils/hooks"
import { ChannelResponse } from "@/utils/interface"
import { Fragment, useState } from "react"
import Mail from "./Mail"
import { SnackbarMode, useSnackbar } from "@/utils/functions"

interface IProps {
  onExit: VoidFunction
}

const CreateUpdate = (props: IProps) => {
  const snackbar = useSnackbar()
  const [mode, setMode] = useState<ChannelBroadcast>()
  const fetchChannel = useGet<Array<ChannelResponse>>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.CHANNEL),
  )

  const onSetup = (mode: ChannelBroadcast) => {
    if ([ChannelBroadcast.EMAIl].includes(mode)) {
      setMode(mode)
      return
    }

    snackbar(SnackbarMode.primary, {
      title: Message.FEATURE_NOT_FINAL,
      description: Message.FEATURE_NOT_FINAL_DESCRIPTION,
    })

    props.onExit()
  }

  return (
    <Fragment>
      {/* Main session "Choose setup channel" */}
      <RenderIf
        reference={mode === undefined}
        render={() => (
          <Popup
            isLoad={convert(fetchChannel.isWait === true)}
            onExit={props.onExit}
            width={564}
            name="Thêm cấu hình kênh"
            className="gap-[0]"
          >
            <Column className="!grid !grid-cols-3" gap={16} padding={24}>
              <RenderIf
                reference={fetchChannel.response}
                render={(channels) =>
                  channels.map((channel, index) => (
                    <Column
                      key={index}
                      gap={16}
                      className="hover:bg-gray-100 py-[12px] px-[8px] rounded-[8px] cursor-pointer border border-dashed"
                      onClick={() => onSetup(channel.enum)}
                    >
                      <Image
                        src={concatPathName(
                          process.env.NEXT_PUBLIC_BACKEND,
                          channel.icon,
                        )}
                        width={40}
                        height={40}
                      ></Image>
                      <Column>
                        <Content>{channel.name}</Content>
                        <Description>{channel.description}</Description>
                      </Column>
                    </Column>
                  ))
                }
              ></RenderIf>
            </Column>
            <footer></footer>
          </Popup>
        )}
      />

      <RenderIf
        reference={mode === ChannelBroadcast.EMAIl}
        render={() => <Mail onExit={props.onExit}></Mail>}
      ></RenderIf>
    </Fragment>
  )
}

export default CreateUpdate
