import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import List from "./components/List"
import { QueryOptions, RecordAndCounter, useEffectOnce, useGet } from "@/utils/hooks"
import { HubMethodName, RouteMap } from "@/utils/common"
import { DataResponse } from "@/utils/interface/Data"
import { useConnection, useWithout } from "@/utils/functions"
import CreateUpdate from "./components/create_update"
import Counter from "./components/Counter"

const Data = () => {
  const without = useWithout()
  const connection = useConnection()
  const fetchData = useGet<RecordAndCounter<DataResponse>>(RouteMap.DATA, {
    params: new QueryOptions(),
  })

  const onCreate = () =>
    without.append(<CreateUpdate onExit={without.close}></CreateUpdate>)

  const onRefresh = () => fetchData.fetch({ params: new QueryOptions() })

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.DATA, () =>
      fetchData.fetch({ params: new QueryOptions(), silent: true })
    )
  )
  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>

        <Row size={0.1} gap={8} itemsCenter>
          <Button icon="icon/refresh.svg" onClick={onRefresh}>
            Làm mới
          </Button>
          <Button main icon="icon/data/create.svg" onClick={onCreate}>
            Thêm nguồn dữ liệu
          </Button>
        </Row>
      </Row>
      <Counter></Counter>
      <List fetchData={fetchData}></List>
    </Frame>
  )
}

export default Data
