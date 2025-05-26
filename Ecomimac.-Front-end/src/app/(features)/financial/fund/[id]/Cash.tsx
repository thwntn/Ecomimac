import { useParams } from "next/navigation"
import { FundResponse } from "@/utils/interface"
import { useEffectOnce, useGet } from "@/utils/hooks"
import { RouteMap, HubMethodName } from "@/utils/common"
import { useConnection, useWithout } from "@/utils/functions"
import ListCash from "./components/List"
import CreateUpdateCash from "./components/CreateUpdate"
import Button from "@/app/(components)/button"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import RenderIf from "@/app/(components)/render-if"
import Card from "../components/card"
import Line from "@/app/(components)/line"
import Wrapper from "@/app/(components)/wrapper"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import PolaChart from "@/app/(components)/chart/pola"

interface IParams {
  [key: string]: string
  id: string
}

const Cash = () => {
  const params = useParams<IParams>()
  const fund = useGet<FundResponse>(RouteMap.FUND + "/" + params.id)
  const connection = useConnection()
  const without = useWithout()

  useEffectOnce(() => connection.effectOn(HubMethodName.CASH, fund.fetch))
  return (
    <Frame>
      <Row justifyBetween>
        <Container />
        <RenderIf
          reference={fund.response}
          render={(item) => (
            <Button
              icon="icon/create.svg"
              onClick={() =>
                without.append(
                  <CreateUpdateCash onExit={without.close} fund={item} />
                )
              }
            >
              Thêm dòng tiền
            </Button>
          )}
        ></RenderIf>
      </Row>
      <RenderIf
        reference={fund.response}
        render={(fund) => <Card fund={fund}></Card>}
      ></RenderIf>
      <Line name="Giao dịch & Thống kê"></Line>
      <Row gap={16}>
        <Row size={8}>
          <ListCash fund={fund} />
        </Row>
        <Row size={4}>
          <Wrapper className="h-[426px]">
            <Column>
              <Title>Thông kê hoá đơn theo trạng thái</Title>
              <Description>30 ngày gần nhất</Description>
            </Column>
            <PolaChart></PolaChart>
          </Wrapper>
        </Row>
      </Row>
    </Frame>
  )
}

export default Cash
