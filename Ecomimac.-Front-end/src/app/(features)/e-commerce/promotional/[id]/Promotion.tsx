import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Information from "./components/Information"
import { useGet } from "@/utils/hooks"
import { RouteMap, concatPathName } from "@/utils/common"
import { useParams } from "next/navigation"
import { PromotionResponse } from "@/utils/interface"
import Line from "@/app/(components)/line"
import Product from "./components/Product"
import Wrapper from "@/app/(components)/wrapper"
import Column from "@/app/(components)/column"

interface IParams {
  [key: string]: string
  id: string
}

const Promotion = () => {
  const params = useParams<IParams>()
  const getPromotion = useGet<PromotionResponse>(
    concatPathName(RouteMap.PROMOTION, params.id)
  )

  console.log(getPromotion)

  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row size={0.1}>
          <Button main icon="icon/edit-light.svg">
            Cập nhật
          </Button>
        </Row>
      </Row>
      <Row gap={24}>
        <Column size={4}>
          <Information getPromotion={getPromotion}></Information>
        </Column>
        <Column size={8}>
          <Wrapper></Wrapper>
        </Column>
      </Row>
      <Line name="Chi tiết"></Line>
      <Product getPromotion={getPromotion}></Product>
    </Frame>
  )
}

export default Promotion
