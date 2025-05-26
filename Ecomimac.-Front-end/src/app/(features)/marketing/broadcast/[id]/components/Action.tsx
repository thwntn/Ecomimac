import Button from "@/app/(components)/button"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import { OFF } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import {
  BroadcastProcess,
  concatPathName,
  Message,
  Redirect,
  RouteMap,
} from "@/utils/common"
import { useConfirm, useRouter, useWithout } from "@/utils/functions"
import { Fetched, Form, Patch, useGet, usePatch } from "@/utils/hooks"
import { BroadcastResponse } from "@/utils/interface"
import { useParams } from "next/navigation"
import { Dispatch, Fragment, SetStateAction } from "react"
import { FormData, IPrams } from "../Setup"
import Session from "./Session"

interface IProps {
  fetchBroadcast: Fetched<BroadcastResponse>
  postActive: Patch<BroadcastResponse>
  form: Form<FormData>
  setIsSetup: Dispatch<SetStateAction<boolean>>
}

const Action = (props: IProps) => {
  const confirm = useConfirm()
  const params = useParams<IPrams>()
  const without = useWithout()
  const router = useRouter()
  const updateReference = usePatch(concatPathName(RouteMap.BROADCASTS))

  const loopBroadcast = useGet<BroadcastResponse>(
    concatPathName(RouteMap.BROADCASTS, params.id, RouteMap.LOOP),
    { initial: false }
  )

  const patchStop = usePatch<BroadcastResponse>(
    concatPathName(RouteMap.BROADCASTS, params.id, RouteMap.BROADCAST_STOP)
  )

  const cloneBroadcast = useGet<BroadcastResponse>(
    concatPathName(RouteMap.BROADCASTS, params.id, RouteMap.CLONE),
    { initial: false }
  )

  const onClone = (broadcast: BroadcastResponse) =>
    confirm(
      () => {
        cloneBroadcast
          .fetch()
          .finally(() =>
            router.push(
              concatPathName(String(), Redirect.MARKETING, Redirect.BROADCAST)
            )
          )
      },
      {
        title: Message.BROADCAST_CLONE_TITLE,
        description: Message.BROADCAST_CLONE_DESCRIPTION,
      },
      <Row itemsCenter gap={8}>
        <Character text={broadcast.name}></Character>
        <Column className="overflow-hidden">
          <Title lineClamp={1}>{broadcast.name}</Title>
          <Description lineClamp={1}>{broadcast.description}</Description>
        </Column>
      </Row>
    )

  const gotoHistory = () =>
    router.push(
      concatPathName(
        String(),
        Redirect.MARKETING,
        Redirect.BROADCAST,
        params.id,
        Redirect.HISTORY
      )
    )

  const openSession = (broadcast: BroadcastResponse) =>
    without.append(
      <Session onExit={without.close} broadcastId={broadcast.id} />
    )

  const onResend = () =>
    confirm(
      () => {
        loopBroadcast.fetch()
        prepare()
      },
      {
        title: Message.BROADCAST_RE_SEND_TITlE,
        description: Message.BROADCAST_RE_SEND_DESCRIPTION,
      }
    )

  const onStop = () =>
    confirm(() => patchStop.request(Object.assign({})), {
      title: Message.BROADCAST_STOP_TITLE,
      description: Message.BROADCAST_STOP_DESCRIPTION,
    })

  const onRun = () => {
    //  Summary:
    //      Check validate
    if (props.form.validate.run() === OFF) return

    confirm(
      () => {
        //  Summary:
        //      Update reference & save before active
        const updateReference = onUpdateReference()
        if (updateReference === undefined) return

        updateReference.then(() => {
          prepare()
          //  Summary:
          //      Re-update & active broadcast
          props.postActive
            .request(Object({}))
            .finally(props.fetchBroadcast.fetch)
        })
      },
      {
        title: Message.BROADCAST_ACTIVE_TITLE,
        description: Message.BROADCAST_ACTIVE_DESCRIPTION,
      }
    )
  }

  const onUpdateReference = () => {
    if (props.form.validate.run() === OFF) return

    return updateReference.request(props.form.data, {
      pathname: concatPathName(params.id, RouteMap.REFERENCE),
    })
  }

  const prepare = () => {
    props.setIsSetup(true)
    //  Summary:
    //      Re-fresh broadcast
    setTimeout(() => {
      props.setIsSetup(false)
      props.fetchBroadcast.fetch()
    }, 5000)
  }
  return (
    <Row size={0.1} gap={8} itemsCenter>
      <RenderIf
        reference={props.fetchBroadcast.response}
        render={(broadcast) => (
          <Fragment>
            <Button
              onClick={() => openSession(broadcast)}
              icon="icon/broadcast/n8n.svg"
            >
              Tích hợp tự động
            </Button>
            <Button
              icon="icon/broadcast/copy.svg"
              onClick={() => onClone(broadcast)}
            >
              Tạo bản sao
            </Button>
            <Button onClick={gotoHistory} icon="icon/broadcast/history.svg">
              Lịch sử & thống kê
            </Button>

            <Column>
              <div className="h-[32px] w-[1px] bg-gray-300 mx-[8px]"></div>
            </Column>

            <RenderIf
              reference={broadcast.process === BroadcastProcess.DRAFT}
              render={() => {
                return (
                  <Fragment>
                    <Button main onClick={onRun} icon="icon/create-light.svg">
                      Kích hoạt
                    </Button>

                    <Button
                      main
                      onClick={onUpdateReference}
                      icon="icon/edit-light.svg"
                    >
                      Lưu thiết lập
                    </Button>
                  </Fragment>
                )
              }}
            ></RenderIf>

            <RenderIf
              reference={broadcast.process === BroadcastProcess.SENDING}
              render={() => {
                return (
                  <Button main onClick={onStop} icon="icon/broadcast/stop.svg">
                    Dừng gửi
                  </Button>
                )
              }}
            ></RenderIf>

            <RenderIf
              reference={
                broadcast.process === BroadcastProcess.DONE ||
                broadcast.process === BroadcastProcess.CANCEL
              }
              render={() => (
                <Button
                  main
                  icon="icon/broadcast/refresh.svg"
                  onClick={onResend}
                >
                  Gửi lại
                </Button>
              )}
            ></RenderIf>
          </Fragment>
        )}
      ></RenderIf>
    </Row>
  )
}

export default Action
