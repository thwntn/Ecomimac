import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { ProductResponse } from "@/utils/interface"
import Frame from "@/app/(components)/frame"
import Counter from "./components/Counter"
import Container from "@/app/(components)/container"
import List from "./components/List"
import Row from "@/app/(components)/row"
import Button from "@/app/(components)/button"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./components/Create_Update"
import { RouteMap } from "@/utils/common"
import Column from "@/app/(components)/column"
import Input from "@/app/(components)/input"
import Dropdown from "@/app/(components)/dropdown"
import Icon from "@/app/(components)/icon"
import Filter from "@/app/(components)/list/filter"
import Line from "@/app/(components)/line"

const Product = () => {
  const without = useWithout()
  const product = useGet<RecordAndCounter<ProductResponse>>(RouteMap.PRODUCT, {
    params: new QueryOptions(),
  })
  return (
    <Frame>
      <Row justifyBetween>
        <Container></Container>
        <Button
          onClick={() =>
            without.append(<CreateUpdate onExit={without.close} />)
          }
          icon="icon/create-light.svg"
          main
        >
          Tạo mới sản phẩm
        </Button>
      </Row>
      <Counter product={product} />
      <Line name="Danh sách"></Line>
      <Filter filters={[]}></Filter>
      <List getProduct={product} />
    </Frame>
  )
}

export default Product
