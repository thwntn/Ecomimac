import {
  Fetched,
  RecordAndCounter,
  useDelete,
  useEffectOnce,
  useQuery,
} from "@/utils/hooks"
import { useConfirm, useConnection, useRouter, useWithout } from "@/utils/functions"
import { Fragment } from "react"
import { default as CustomList } from "@/app/(components)/list"
import {
  Helper,
  DiscountQuantityType,
  DiscountCode,
  RouteMap,
  DiscountTimeFrameType,
  HubMethodName,
  mappingToPagination,
} from "@/utils/common"
import Content from "@/app/(components)/content"
import { DiscountResponse } from "@/utils/interface"
import Icon from "@/app/(components)/icon"
import CreateUpdate from "./create-update"
import DateTime from "@/app/(components)/date-time"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Row from "@/app/(components)/row"
import { usePathname } from "next/navigation"
import RenderIf from "@/app/(components)/render-if"
import Context from "@/app/(components)/context"
import Character from "@/app/(components)/character"
import TimeRange from "@/app/(components)/time-range"
import Tag from "@/app/(components)/tag"
import { Position } from "@/app/(components)/common"

const List = ({
  getDiscount,
}: {
  getDiscount: Fetched<RecordAndCounter<DiscountResponse>>
}) => {
  const without = useWithout()
  const router = useRouter()
  const pathname = usePathname()
  const confirm = useConfirm()
  const connection = useConnection()
  const query = useQuery(getDiscount)
  const remove = useDelete(RouteMap.DISCOUNT)

  const onRemove = (discount: DiscountResponse) =>
    confirm(() => remove.request({ pathname: discount.id }))

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.DISCOUNT, () =>
      getDiscount.fetch({ params: query.options, silent: true })
    )
  )
  return (
    <Row padding={8}>
      <RenderIf
        reference={getDiscount.response}
        render={(discount) => (
          <CustomList
            page={mappingToPagination(getDiscount, (page) =>
              query.updatePage(page)
            )}
            column={[
              "Tên mã giảm giá",
              "",
              "Mã áp dụng",
              "Gắn thẻ",
              "",
              "Ngày tạo",
              "Thời gian",
              "",
              "Số lượng",
              "Số tiền giảm",
            ]}
            action={[
              ([item]) => (
                <Icon
                  style={{ filter: "grayscale(1)" }}
                  dir="icon/trash.svg"
                  onClick={() => onRemove(item)}
                ></Icon>
              ),
              ([item]) => (
                <Context
                  position={Position.RIGHT}
                  items={[
                    {
                      label: "Chỉnh sửa",
                      icon: "icon/edit.svg",
                      callback: () =>
                        without.append(
                          <CreateUpdate
                            onExit={without.close}
                            discount={item}
                          ></CreateUpdate>
                        ),
                    },
                  ]}
                ></Context>
              ),
            ]}
            items={discount.data}
            onClick={(item) => router.push(pathname + "/" + item.id)}
            fit
            each={(ticket) => (
              <Fragment>
                <Row className="col-span-2" itemsCenter gap={16}>
                  <Character text={ticket.code}></Character>
                  <Column>
                    <Content>{ticket.name}</Content>
                    <Description lineClamp={1}>
                      {ticket.description}
                    </Description>
                  </Column>
                </Row>

                <Content className="font-bold">{ticket.code}</Content>

                <Row className="col-span-2">
                  <Tag
                    items={ticket.discountTags.map(
                      (discountTag) => discountTag.tag
                    )}
                  ></Tag>
                </Row>

                <DateTime dateTime={new Date(ticket.created)}></DateTime>

                <Row className="col-span-2">
                  <RenderIf
                    reference={
                      ticket.discountTimeFrameType ===
                      DiscountTimeFrameType.TIME_FRAME
                    }
                    render={() => (
                      <TimeRange
                        fromDate={new Date(ticket.fromDate)}
                        toDate={new Date(ticket.toDate)}
                      ></TimeRange>
                    )}
                  ></RenderIf>

                  <RenderIf
                    reference={
                      ticket.discountTimeFrameType ===
                      DiscountTimeFrameType.NORMAL
                    }
                    render={() => (
                      <Description>Không giới hạn thời gian</Description>
                    )}
                  ></RenderIf>
                </Row>

                <Column>
                  <RenderIf
                    reference={
                      ticket.discountQuantityType === DiscountQuantityType.NONE
                    }
                    render={() => (
                      <Column>
                        <Description>Không giới hạn</Description>
                        <Description>
                          Đã dùng: &nbsp;
                          <span className="text-red-500">{ticket.used}</span>
                        </Description>
                      </Column>
                    )}
                  ></RenderIf>
                  <RenderIf
                    reference={
                      ticket.discountQuantityType ===
                      DiscountQuantityType.WITH_QUANTITY
                    }
                    render={() => (
                      <Column>
                        <Description>
                          Tổng cộng: &nbsp;
                          <span className="text-green-500">
                            {ticket.quantity}
                          </span>
                        </Description>
                        <Description>
                          Đã dùng: &nbsp;
                          <span className="text-red-500">{ticket.used}</span>
                        </Description>
                      </Column>
                    )}
                  ></RenderIf>
                </Column>

                <Row justifyEnd>
                  <RenderIf
                    reference={ticket.discountCode === DiscountCode.AMOUNT}
                    render={() => (
                      <Content>
                        {Helper.Currency.vietNamDong(ticket.amount)}
                      </Content>
                    )}
                  ></RenderIf>

                  <RenderIf
                    reference={ticket.discountCode === DiscountCode.PERCENT}
                    render={() => (
                      <Column itemsEnd>
                        <Content>{ticket.percent}%</Content>
                        <Description>
                          Giảm tối đa: &nbsp;
                          {Helper.Currency.vietNamDong(ticket.maxAmount)}
                        </Description>
                      </Column>
                    )}
                  ></RenderIf>
                </Row>
              </Fragment>
            )}
          ></CustomList>
        )}
      ></RenderIf>
    </Row>
  )
}

export default List
