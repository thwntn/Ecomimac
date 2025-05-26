import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Line from "@/app/(components)/line"
import Row from "@/app/(components)/row"
import { HubMethodName, RouteMap } from "@/utils/common"
import { useConnection, useWithout } from "@/utils/functions"
import {
  QueryOptions,
  RecordAndCounter,
  useEffectOnce,
  useGet,
  useQuery,
} from "@/utils/hooks"
import { BroadcastResponse } from "@/utils/interface/Broadcast"
import Counter from "./components/Counter"
import CreateUpdate from "./components/create_update"
import List from "./components/List"

const Send = () => {
  const without = useWithout()
  const connection = useConnection()
  const fetchBroadcast = useGet<RecordAndCounter<BroadcastResponse>>(
    RouteMap.BROADCASTS,
    { params: new QueryOptions() }
  )

  const query = useQuery(fetchBroadcast, true)

  const onRefresh = () => fetchBroadcast.fetch({ params: new QueryOptions() })
  const onCreate = () =>
    without.append(<CreateUpdate onExit={without.close}></CreateUpdate>)

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.BROADCAST, () => query.updateLimit(8))
  )
  return (
    <Frame>
      <Row justifyBetween itemsCenter>
        <Container></Container>
        <Row size={0.1} gap={8}>
          <Button icon="icon/refresh.svg" onClick={onRefresh}>
            Làm mới
          </Button>
          <Button main icon="icon/create-light.svg" onClick={onCreate}>
            Tạo mới chiến dịch
          </Button>
        </Row>
      </Row>
      <Counter></Counter>
      <Line name="Chiến dịch quản bá sản phẩm"></Line>
      <List fetchBroadcast={fetchBroadcast}></List>
    </Frame>
  )
}

export default Send
