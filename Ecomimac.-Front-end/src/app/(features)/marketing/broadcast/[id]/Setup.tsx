import Column from "@/app/(components)/column"
import Container from "@/app/(components)/container"
import Description from "@/app/(components)/description"
import Frame from "@/app/(components)/frame"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import {
  BroadcastProcess,
  concatPathName,
  HubMethodName,
  RouteMap,
} from "@/utils/common"
import { useConnection } from "@/utils/functions"
import {
  RecordAndCounter,
  useEffectOnce,
  useForm,
  useGet,
  usePatch,
  Validate,
} from "@/utils/hooks"
import { BroadcastResponse } from "@/utils/interface/Broadcast"
import { ContentResponse } from "@/utils/interface/Content"
import { DataResponse } from "@/utils/interface/Data"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Action from "./components/Action"
import Content from "./components/Content"
import Information from "./components/Information"
import MapField from "./components/MapField"
import Prepare from "./components/Prepare"
import Process from "./components/Process"
import Line from "@/app/(components)/line"
import NormalZaloNotificationService from "./components/previews/zalo-notification-service/NormalZaloNotificationService"
import PreviewContent from "./components/previews"

export class Map {
  constructor(field: string, key: string | undefined) {
    this.field = field
    this.key = key
  }
  key: string | undefined
  field: string
}

export interface FormData {
  id?: string
  name: string
  content: ContentResponse
  contentId?: string
  sendKey: string
  data: DataResponse
  dataId?: string
  maps: Map[]
  process?: BroadcastProcess
}

const validate: Validate<FormData> = {
  name: (name: string) => name,
  data: (data: DataResponse) => data,
  sendKey: (sendKey: string) => sendKey,
  content: (content: ContentResponse) => content,
  maps: (maps: Map[]) => maps.every((map) => map.field && map.key),
}

export interface IPrams {
  [key: string]: string
  id: string
}

const Setup = () => {
  const params = useParams<IPrams>()
  const connection = useConnection()
  const [isSetup, setIsSetup] = useState<boolean>(false)
  const form = useForm<FormData>({ maps: [] }, validate)
  const fetchListData = useGet<RecordAndCounter<DataResponse>>(RouteMap.DATA)

  const fetchBroadcast = useGet<BroadcastResponse>(
    concatPathName(RouteMap.BROADCASTS, params.id)
  )

  const postActive = usePatch<BroadcastResponse>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.ACTIVE, params.id)
  )

  //  Summary:
  //      Initial map content
  useEffect(() => {
    if (fetchBroadcast.response === undefined) return
    form.set(fetchBroadcast.response)
    form.append("maps", fetchBroadcast.response.parseMap)
    //
  }, [fetchBroadcast.response])

  //  Summary:
  //      Re-fresh broadcast
  useEffectOnce(() =>
    connection.effectOn(HubMethodName.BROADCAST_INFORMATION, () =>
      fetchBroadcast.fetch.call(undefined)
    )
  )
  return (
    <Frame>
      <RenderIf
        reference={isSetup === false}
        render={() => (
          <Row itemsCenter justifyBetween>
            <Container></Container>
            <Action
              setIsSetup={setIsSetup}
              form={form}
              fetchBroadcast={fetchBroadcast}
              postActive={postActive}
            ></Action>
          </Row>
        )}
      ></RenderIf>

      <RenderIf
        reference={isSetup}
        render={() => <Prepare></Prepare>}
        reverse={
          <Row gap={24}>
            <Column size={6} gap={24}>
              <Information
                fetchBroadcast={fetchBroadcast}
                fetchListData={fetchListData}
                form={form}
              ></Information>

              <Line name="Nội dung"></Line>

              <Content form={form}></Content>
              <RenderIf
                reference={form.data.maps.length > 0}
                render={() => (
                  <MapField
                    fetchBroadcast={fetchBroadcast}
                    form={form}
                  ></MapField>
                )}
              ></RenderIf>
            </Column>
            <Column gap={24} size={6}>
              <Process fetchBroadcast={fetchBroadcast}></Process>
              <PreviewContent fetchBroadcast={fetchBroadcast}></PreviewContent>
            </Column>
          </Row>
        }
      ></RenderIf>
    </Frame>
  )
}

export default Setup
