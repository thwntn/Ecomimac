import Frame from "@/app/(components)/frame"
import Profile from "./components/Profile"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { RouteMap, concatPathName } from "@/utils/common"
import { useParams } from "next/navigation"
import { convert } from "@/app/(components)/common"
import RenderIf from "@/app/(components)/render-if"
import { CustomerResponse, InvoiceResponse } from "@/utils/interface"
import Container from "@/app/(components)/container"
import Invoice from "./components/Invoice"
import Row from "@/app/(components)/row"
import Button from "@/app/(components)/button"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "../components/Create_Update"
import Counter from "./components/Counter"
import Line from "@/app/(components)/line"
import Broadcast from "./components/Broadcast"
import Column from "@/app/(components)/column"

const LIMIT_PER_PAGE = 4

export interface IParams {
  [key: string]: string
  id: string
}

const Information = () => {
  const params = useParams<IParams>()
  const without = useWithout()
  const customer = useGet<CustomerResponse>(
    RouteMap.CUSTOMER + "/" + params.id
  )
  const invoice = useGet<RecordAndCounter<InvoiceResponse>>(
    concatPathName(
      RouteMap.CUSTOMER,
      RouteMap.CUSTOMER_RECENT_INVOICE,
      params.id
    ),
    { params: new QueryOptions({ page: 1, limit: LIMIT_PER_PAGE }) }
  )

  return (
    <Frame>
      <Row justifyBetween itemsCenter>
        <Container></Container>

        <Row size={0.1} gap={8}>
          <RenderIf
            reference={customer.response}
            render={(customer) => (
              <Button
                icon="icon/edit.svg"
                onClick={() =>
                  without.append(
                    <CreateUpdate
                      onExit={without.close}
                      customer={customer}
                    ></CreateUpdate>
                  )
                }
              >
                Chỉnh sửa
              </Button>
            )}
          ></RenderIf>
          <Button className="!bg-red-200 !text-red-500 " icon="icon/trash.svg">
            Chuyển vào thùng rác
          </Button>
        </Row>
      </Row>
      <Counter></Counter>
      <Line name="Thông tin & giao dịch"></Line>
      <Row gap={16}>
        <Row size={4}>
          <RenderIf
            reference={customer.response}
            render={(customer) => <Profile customer={customer}></Profile>}
          ></RenderIf>
        </Row>
        <Column size={8} gap={16}>
          <Invoice getInvoice={invoice}></Invoice>
          <Broadcast></Broadcast>
        </Column>
      </Row>
    </Frame>
  )
}

export default Information
