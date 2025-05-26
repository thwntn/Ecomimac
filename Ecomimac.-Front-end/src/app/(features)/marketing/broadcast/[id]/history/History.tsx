import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import { concatPathName, RouteMap } from "@/utils/common"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import {
  CounterHistoryBroadcastResponse,
  HistoryResponse,
  HistoryStatusResponse,
} from "@/utils/interface"
import { useParams } from "next/navigation"
import Counter from "./components/Counter"
import List from "./components/List"
import Line from "@/app/(components)/line"

interface IParams {
  [key: string]: string
  id: string
}

const History = () => {
  const params = useParams<IParams>()
  const fetchCounterHistory = useGet<CounterHistoryBroadcastResponse>(
    concatPathName(
      RouteMap.BROADCASTS,
      params.id,
      RouteMap.BROADCAST_HISTORY_COUNTER
    )
  )

  const fetchHistory = useGet<RecordAndCounter<HistoryResponse>>(
    concatPathName(RouteMap.BROADCASTS, params.id, RouteMap.HISTORY),
    { params: new QueryOptions() }
  )

  const fetchHistoryStatus = useGet<Array<HistoryStatusResponse>>(
    concatPathName(RouteMap.HISTORY, RouteMap.STATUS)
  )

  const onRefresh = () => {
    fetchHistory.fetch({ params: new QueryOptions() })
    fetchCounterHistory.fetch()
  }

  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Button onClick={onRefresh} icon="icon/refresh.svg">
          Làm mới
        </Button>
      </Row>
      <Counter fetchCounterHistory={fetchCounterHistory}></Counter>
      <Line name="Danh sách thông tin đã gửi"></Line>
      <List
        fetchHistory={fetchHistory}
        fetchHistoryStatus={fetchHistoryStatus}
      ></List>
    </Frame>
  )
}

export default History
