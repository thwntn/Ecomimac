import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import DateTime from "@/app/(components)/date-time"
import Frame from "@/app/(components)/frame"
import Icon from "@/app/(components)/icon"
import { default as CustomList } from "@/app/(components)/list"
import State from "@/app/(components)/state"
import { mappingToPagination, Redirect } from "@/utils/common"
import { Helper } from "@/utils/common"
import { Fragment } from "react"
import { RouteMap } from "@/utils/common"
import {
  QueryOptions,
  RecordAndCounter,
  useDelete,
  useGet,
  useQuery,
} from "@/utils/hooks"
import { InvoiceResponse, InvoiceStatusResponse } from "@/utils/interface"
import { useRouter } from "@/utils/functions"
import Container from "@/app/(components)/container"
import Row from "@/app/(components)/row"
import RenderIf from "@/app/(components)/render-if"
import { useConfirm } from "@/utils/functions"
import Character from "@/app/(components)/character"
import Filter from "@/app/(components)/list/filter"
import ListRender from "@/app/(components)/list/render"

const List = () => {
  const router = useRouter()
  const confirm = useConfirm()
  const getInvoice = useGet<RecordAndCounter<InvoiceResponse>>(
    RouteMap.INVOICE,
    {
      params: new QueryOptions(),
    }
  )
  const query = useQuery(getInvoice)
  const remove = useDelete<InvoiceResponse>(RouteMap.INVOICE)
  const statusInvoice = useGet<InvoiceStatusResponse[]>(
    RouteMap.INVOICE_STATUS
  )

  const confirmRemove = (invoiceId: string) =>
    confirm(() =>
      remove
        .request({ pathname: invoiceId })
        .then(() => getInvoice.fetch({ silent: true }))
    )

  return (
    <Column gap={40}>
      <Row padding={8}>
        <RenderIf
          reference={getInvoice.response}
          reverse={<ListRender column={5} />}
          render={(invoice) => (
            <CustomList
              silent
              column={["Mã hoá đơn", "", "Ngày tạo", "Khách hàng", "Giá bán"]}
              fit
              items={invoice.data}
              onClick={(item) =>
                router.push(
                  Redirect.INVOICE + "/" + Redirect.LIST + "/" + item.id
                )
              }
              each={(invoice) => (
                <Fragment>
                  <Row itemsCenter gap={8} className="col-span-2">
                    <Character text={invoice.code}></Character>
                    <Column>
                      <Content>{invoice.code}</Content>
                      <Content className="text-[12px] text-gray-400 line-clamp-1">
                        {invoice.description}
                      </Content>
                    </Column>
                  </Row>
                  <DateTime dateTime={new Date(invoice.created)} />
                  <Column>
                    <Content>{invoice.customer?.name}</Content>
                    <Content className="text-[12px] text-gray-400">
                      {invoice.customer?.phone}
                    </Content>
                  </Column>
                  <div className="text-end">
                    <Content className="text-[12px] text-gray-400">
                      {Helper.Currency.vietNamDong(invoice.discountPrice)}
                    </Content>
                    <Content className="text-green-800">
                      {Helper.Currency.vietNamDong(invoice.latestPrice)}
                    </Content>
                  </div>
                </Fragment>
              )}
              page={mappingToPagination(getInvoice, query.updatePage)}
            ></CustomList>
          )}
        ></RenderIf>
      </Row>
    </Column>
  )
}

export default List
