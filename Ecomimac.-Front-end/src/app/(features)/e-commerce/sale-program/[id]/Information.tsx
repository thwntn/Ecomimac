import { RouteMap } from "@/utils/common"
import Column from "@/app/(components)/column"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Report from "./components/Report"
import { useParams } from "next/navigation"
import { useGet, usePatch, usePost } from "@/utils/hooks"
import {
  RevenueResponse,
  SaleProgramResponse,
  SaleProgramStatusResponse,
} from "@/utils/interface"
import Product from "./components/Product"
import RenderIf from "@/app/(components)/render-if"
import Promotion from "./components/Promotion"
import Button from "@/app/(components)/button"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "../components/Create_Update"
import Discount from "./components/Discount"
import Transaction from "./components/Transaction"
import Counter from "./components/Counter"
import Detail from "./components/Detail"
import Line from "@/app/(components)/line"
import Dropdown from "@/app/(components)/dropdown"

interface IParams {
  [key: string]: string
  id: string
}

const Information = () => {
  const params = useParams<IParams>()
  const without = useWithout()

  const saleProgram = useGet<SaleProgramResponse>(
    RouteMap.SALE_PROGRAM + "/" + params.id
  )
  const getRevenue = useGet<RevenueResponse>(
    RouteMap.SALE_PROGRAM + "/" + RouteMap.REVENUE + "/" + params.id
  )
  const getStatus = useGet<SaleProgramStatusResponse[]>(
    RouteMap.SALE_PROGRAM + "/" + RouteMap.STATUS
  )
  const updateStatus = usePatch<SaleProgramResponse>(
    RouteMap.SALE_PROGRAM + "/" + RouteMap.STATUS + "/" + params.id
  )

  const changeStatus = (status: number) =>
    updateStatus.request({ status }).then(() => saleProgram.fetch())

  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row itemsCenter justifyEnd gap={16}>
          <Row size={5}>
            <RenderIf
              reference={getStatus.response}
              render={(status) => (
                <Dropdown
                  label="Trạng thái chương trình bán hàng"
                  onChange={(item) => changeStatus(item.key)}
                  items={status}
                  each={(item) => item.title}
                  show={(item) => item.title}
                ></Dropdown>
              )}
            ></RenderIf>
          </Row>
          <Button
            onClick={() =>
              without.append(
                <RenderIf
                  reference={saleProgram.response}
                  render={(saleProgram) => (
                    <CreateUpdate
                      salePrograms={saleProgram}
                      onExit={without.close}
                    ></CreateUpdate>
                  )}
                ></RenderIf>
              )
            }
            main
            icon="icon/edit-light.svg"
          >
            Cập nhật
          </Button>
        </Row>
      </Row>
      <Row size={8} gap={24}>
        <Column gap={24}>
          <Row gap={24}>
            <Row size={4}>
              <Detail saleProgram={saleProgram}></Detail>
            </Row>
            <Row size={8}>
              <Counter getRevenue={getRevenue}></Counter>
            </Row>
          </Row>
          <Line name="Chi tiết"></Line>
          <Row gap={24}>
            <Column size={8} gap={24}>
              <Report id={params.id} saleProgram={saleProgram}></Report>
              <Transaction saleProgramId={params.id}></Transaction>
            </Column>
            <Column gap={24} size={4}>
              <Product saleProgram={saleProgram}></Product>
              <Promotion saleProgram={saleProgram}></Promotion>
              <Discount saleProgram={saleProgram}></Discount>
            </Column>
          </Row>
        </Column>
      </Row>
    </Frame>
  )
}

export default Information
