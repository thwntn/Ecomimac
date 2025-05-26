import { RouteMap, mappingToPagination } from "@/utils/common"
import { RecordAndCounter, useGet, useQuery } from "@/utils/hooks"
import { CustomerResponse } from "@/utils/interface"
import { useRouter } from "@/utils/functions"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"

const Customer = () => {
  const fetchCustomer = useGet<RecordAndCounter<CustomerResponse>>(
    RouteMap.CUSTOMER
  )
  const query = useQuery(fetchCustomer)
  const router = useRouter()

  return (
    <Wrapper>
      <RenderIf
        reference={fetchCustomer.response}
        render={(customer) => (
          <List
            page={mappingToPagination(fetchCustomer, (page) =>
              query.updatePage(page)
            )}
            column={["Thông tin", "", "Số điện thoại", "Ngày tạo"]}
            fit
            onClick={(item) => router.push(window.location + "/" + item.id)}
            silent
            items={customer.data}
            each={(customer: CustomerResponse) => (
              <Fragment>
                <Row itemsCenter gap={16} className="col-span-2">
                  <RenderIf
                    reference={!customer.image}
                    render={() => (
                      <Character size={40} text={customer.name}></Character>
                    )}
                  ></RenderIf>

                  <RenderIf
                    reference={customer.image}
                    render={(image) => (
                      <Image
                        width={40}
                        height={40}
                        src={image}
                        className="rounded-full"
                      ></Image>
                    )}
                  ></RenderIf>
                  <Column justifyCenter>
                    <Content>{customer.name}</Content>
                    <Description lineClamp={1}>{customer.address}</Description>
                  </Column>
                </Row>

                <Column>
                  <Content>{customer.phone}</Content>
                  <Description>{customer.emailAddress}</Description>
                </Column>

                <Row justifyEnd>
                  <DateTime dateTime={new Date(customer.created)}></DateTime>
                </Row>
              </Fragment>
            )}
          ></List>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Customer
