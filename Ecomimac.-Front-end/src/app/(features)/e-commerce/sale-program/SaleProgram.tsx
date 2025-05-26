import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Counter from "./components/Counter"
import List from "./components/List"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./components/Create_Update"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { RouteMap } from "@/utils/common"
import { SaleProgramResponse } from "@/utils/interface"
import Line from "@/app/(components)/line"

const SaleProgram = () => {
  const without = useWithout()
  const salePrograms = useGet<RecordAndCounter<SaleProgramResponse>>(
    RouteMap.SALE_PROGRAM,
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
      <Line name="Danh sách chương trình"></Line>
      <List salePrograms={salePrograms}></List>
    </Frame>
  )
}

export default SaleProgram
