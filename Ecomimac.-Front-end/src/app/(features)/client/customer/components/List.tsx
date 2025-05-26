import {
  Fetched,
  QueryOptions,
  RecordAndCounter,
  useDelete,
  useEffectOnce,
  useQuery,
} from "@/utils/hooks"
import { Fragment } from "react"
import { CustomerResponse } from "@/utils/interface"
import CustomList from "@/app/(components)/list"
import { convert, Position } from "@/app/(components)/common"
import { RouteMap, Helper, HubMethodName, mappingToPagination } from "@/utils/common"
import Content from "@/app/(components)/content"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import DateTime from "@/app/(components)/date-time"
import Icon from "@/app/(components)/icon"
import Context from "@/app/(components)/context"
import Row from "@/app/(components)/row"
import Character from "@/app/(components)/character"
import { useConfirm, useConnection, useRouter, useWithout } from "@/utils/functions"
import RenderIf from "@/app/(components)/render-if"
import Image from "@/app/(components)/image"
import Tag from "@/app/(components)/tag"
import State from "@/app/(components)/state"
import CreateUpdate from "./Create_Update"

interface IProps {
  getCustomer: Fetched<RecordAndCounter<CustomerResponse>>
}

const List = ({ getCustomer }: IProps) => {
  const router = useRouter()
  const remove = useDelete(RouteMap.CUSTOMER)
  const confirm = useConfirm()
  const without = useWithout()
  const connection = useConnection()
  const query = useQuery(getCustomer)

  const onRemove = (customer: CustomerResponse) =>
    confirm(() => remove.request({ pathname: customer.id }))

  const onUpdate = (customer: CustomerResponse) =>
    without.append(
      <CreateUpdate customer={customer} onExit={without.close}></CreateUpdate>
    )

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.CUSTOMER, () =>
      getCustomer.fetch({ params: query.options })
    )
  )
  return (
    <RenderIf
      reference={getCustomer.response}
      render={(customer) => (
        <CustomList
          page={mappingToPagination(getCustomer, (page) =>
            query.updatePage(page)
          )}
          column={[
            "Thông tin",
            "",
            "Số điện thoại",
            "Thẻ",
            "",
            "Ngày tạo",
            "Trạng thái",
            "Đơn hàng",
          ]}
          fit
          onClick={(item) => router.push(window.location + "/" + item.id)}
          action={[
            ([item]) => (
              <Icon
                onClick={() => onRemove(item)}
                style={{ filter: "grayscale(1)" }}
                dir="icon/trash.svg"
              ></Icon>
            ),
            ([item]) => (
              <Context
                position={Position.RIGHT}
                items={[
                  {
                    label: "Chỉnh sửa",
                    icon: "icon/edit.svg",
                    callback: () => onUpdate(item),
                  },
                ]}
              ></Context>
            ),
          ]}
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
              <Row className="col-span-2">
                <Tag
                  items={customer.customerTags.map((item) => ({
                    name: item.tag.name,
                    color: item.tag.color,
                  }))}
                ></Tag>
              </Row>
              <DateTime dateTime={new Date(customer.created)}></DateTime>
              <State
                color="#359eff"
                background="#2c6bff13"
                name="Kích hoạt"
              ></State>
              <Content className="text-right">
                {customer.invoices.length} Đơn hàng
              </Content>
            </Fragment>
          )}
        ></CustomList>
      )}
    ></RenderIf>
  )
}

export default List
