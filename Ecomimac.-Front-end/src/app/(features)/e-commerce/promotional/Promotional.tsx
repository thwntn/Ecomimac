import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Counter from "./components/Counter"
import List from "./components/List"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./components/create-update"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { PromotionResponse } from "@/utils/interface"
import { RouteMap } from "@/utils/common"
import Line from "@/app/(components)/line"

const Promotional = () => {
  const without = useWithout()
  const getPromotion = useGet<RecordAndCounter<PromotionResponse>>(
    RouteMap.PROMOTION,
    { params: new QueryOptions() }
  )
  return (
    <Frame>
      <Row justifyBetween itemsCenter>
        <Container></Container>
        <Button
          main
          icon="icon/create-light.svg"
          onClick={() =>
            without.append(
              <CreateUpdate onExit={without.close}></CreateUpdate>
            )
          }
        >
          Tạo chương trình
        </Button>
      </Row>
      <Counter></Counter>
      <Line name="Danh sách khuyến mãi"></Line>
      <List getPromotion={getPromotion}></List>
    </Frame>
  )
}

export default Promotional
