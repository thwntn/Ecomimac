import Column from "@/app/(components)/column"
import Icon from "@/app/(components)/icon"
import Row from "@/app/(components)/row"
import CustomList from "@/app/(components)/list"
import { Fragment } from "react"
import {
  Fetched,
  QueryOptions,
  RecordAndCounter,
  useDelete,
  useEffectOnce,
  useQuery,
} from "@/utils/hooks"
import { PromotionResponse } from "@/utils/interface"
import {
  RouteMap,
  concatPathName,
  HubMethodName,
  mappingToPagination,
} from "@/utils/common"
import RenderIf from "@/app/(components)/render-if"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Profile from "@/app/(components)/profile"
import Description from "@/app/(components)/description"
import {
  FILTER_LIST,
  promotionOptions,
  PromotionType,
  SEARCH_COLUMN,
} from "../_Meta"
import State from "@/app/(components)/state"
import TimeRange from "@/app/(components)/time-range"
import Character from "@/app/(components)/character"
import Filter from "@/app/(components)/list/filter"
import ListRender from "@/app/(components)/list/render"
import { useConfirm, useConnection, useRouter, useWithout } from "@/utils/functions"
import Tag from "@/app/(components)/tag"
import Context from "@/app/(components)/context"
import { Position } from "@/app/(components)/common"
import CreateUpdate from "./create-update"

const List = ({
  getPromotion,
}: {
  getPromotion: Fetched<RecordAndCounter<PromotionResponse>>
}) => {
  const router = useRouter()
  const without = useWithout()
  const connection = useConnection()
  const query = useQuery(getPromotion)
  const removePromotion = useDelete(RouteMap.PROMOTION)
  const confirm = useConfirm()
  /**
   *
   * Summary:
   *      Map list information convert
   *
   * Returns:
   *
   */
  const getNameTypePromotion = (promotionType: PromotionType) =>
    promotionOptions.find(
      (promotionOption) => promotionOption.enum === promotionType
    )

  const onRemove = (promotion: PromotionResponse) =>
    confirm(() => removePromotion.request({ pathname: promotion.id }))

  const onUpdate = (promotion: PromotionResponse) =>
    without.append(
      <CreateUpdate onExit={without.close} promotion={promotion} />
    )
  useEffectOnce(() =>
    connection.effectOn(HubMethodName.PROMOTION, () =>
      getPromotion.fetch({ params: query.options, silent: true })
    )
  )
  return (
    <Column gap={24}>
      <Filter
        filters={FILTER_LIST}
        onFilter={(item) => query.updateSortColumn(item.data)}
        onSearch={(searchText) => query.updateSearch(searchText, SEARCH_COLUMN)}
        onReset={query.reset}
      ></Filter>

      <Row padding={8}>
        <RenderIf
          reference={getPromotion.response}
          reverse={<ListRender column={6} />}
          render={(promotions) => (
            <CustomList
              action={[
                ([item]) => (
                  <Row itemsCenter gap={8}>
                    <Icon
                      style={{ filter: "grayscale(1)" }}
                      dir="icon/trash.svg"
                      onClick={() => onRemove(item)}
                    ></Icon>
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
                  </Row>
                ),
              ]}
              items={promotions.data}
              column={[
                "Thông tin",
                "",
                "Gắn thẻ",
                "",
                "Thời gian",
                "",
                "Loại",
                "Trạng thái",
                "Ngày tạo",
              ]}
              onClick={(promotion) =>
                router.push(
                  concatPathName(window.location.pathname, promotion.id)
                )
              }
              page={mappingToPagination(getPromotion, query.updatePage)}
              each={(item) => (
                <Fragment>
                  <Row className="col-span-2" itemsCenter gap={8}>
                    <Character text={item.name}></Character>
                    <Column>
                      <Content>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  </Row>

                  <Row className="col-span-2">
                    <Tag
                      items={item.promotionTags.map((item) => item.tag)}
                    ></Tag>
                  </Row>

                  <Row className="col-span-2">
                    <TimeRange
                      fromDate={new Date(item.fromDate)}
                      toDate={new Date(item.toDate)}
                    ></TimeRange>
                  </Row>

                  <Content>
                    <RenderIf
                      reference={getNameTypePromotion(item.promotionType)}
                      render={(type) => type.name}
                    ></RenderIf>
                  </Content>

                  <State
                    name="Kích hoạt"
                    background="#2c6bff13"
                    color="#359eff"
                  ></State>

                  <DateTime dateTime={new Date(item.created)}></DateTime>
                </Fragment>
              )}
            ></CustomList>
          )}
        ></RenderIf>
      </Row>
    </Column>
  )
}

export default List
