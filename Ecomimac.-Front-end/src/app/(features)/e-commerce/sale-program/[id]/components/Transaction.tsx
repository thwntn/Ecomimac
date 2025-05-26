import { RouteMap, concatPathName, Helper, Redirect } from "@/utils/common"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import List from "@/app/(components)/list"
import ListRender from "@/app/(components)/list/render"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { InvoiceResponse, InvoiceStatusResponse } from "@/utils/interface"
import { useRouter } from "@/utils/functions"
import { Fragment } from "react"

const Transaction = ({ saleProgramId }: { saleProgramId: string }) => {
  const router = useRouter()
  const statusInvoice = useGet<InvoiceStatusResponse[]>(
    RouteMap.INVOICE_STATUS
  )

  const fetch = useGet<RecordAndCounter<InvoiceResponse>>(
    RouteMap.SALE_PROGRAM + "/" + RouteMap.INVOICE + "/" + saleProgramId,
    {
      params: new QueryOptions(),
    }
  )
  return (
    <Column padding={16}>
      <RenderIf
        reverse={<ListRender column={5} />}
        reference={fetch.response}
        render={(invoice) => (
          <List
            silent
            items={invoice.data}
            page={{
              onChange: (page, limit) =>
                fetch.fetch({ params: new QueryOptions({ page, limit }) }),
              limit: invoice.page.limit,
              current: invoice.page.current,
              total: invoice.page.total,
            }}
            column={[
              "Thông tin",
              String(),
              "Ngày tạo",
              "Trạng thái",
              "Khách hàng",
              "Giá trị hoá đơn",
            ]}
            onClick={(item) =>
              router.push(
                concatPathName(Redirect.INVOICE, Redirect.LIST, item.id)
              )
            }
            each={(item) => (
              <Fragment>
                <Row className="col-span-2" gap={8} itemsCenter>
                  <Character text={item.code}></Character>
                  <Column>
                    <Content>{item.code}</Content>
                    <Description>{item.description}</Description>
                  </Column>
                </Row>
                <DateTime dateTime={new Date(item.created)}></DateTime>
                <RenderIf
                  reference={statusInvoice.response}
                  reverse={<Row />}
                  render={(statusInvoice) => {
                    const status = statusInvoice.find(
                      (statusInvoice) => item.status === statusInvoice.key
                    )

                    if (status === undefined) return <Row />
                    return (
                      <State
                        background={status.backgroundColor}
                        color={status.color}
                        name={Helper.Format.capitalize(status.title)}
                      ></State>
                    )
                  }}
                ></RenderIf>
                <RenderIf
                  reference={item.customer}
                  reverse={<Row />}
                  render={(customer) => (
                    <Column>
                      <Content>{customer.name}</Content>
                      <Content className="text-[12px] text-gray-400">
                        {customer.phone}
                      </Content>
                    </Column>
                  )}
                ></RenderIf>
                <div>
                  <Content className="text-[12px] text-gray-400">
                    {Helper.Currency.vietNamDong(item.discountPrice)}
                  </Content>
                  <Content className="text-green-800">
                    {Helper.Currency.vietNamDong(item.latestPrice)}
                  </Content>
                </div>
              </Fragment>
            )}
          ></List>
        )}
      ></RenderIf>
    </Column>
  )
}

export default Transaction
