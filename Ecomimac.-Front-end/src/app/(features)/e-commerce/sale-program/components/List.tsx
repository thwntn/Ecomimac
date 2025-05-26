import Column from "@/app/(components)/column"
import Icon from "@/app/(components)/icon"
import Row from "@/app/(components)/row"
import CustomList from "@/app/(components)/list"
import { Fragment } from "react"
import {
  Fetched,
  RecordAndCounter,
  useDelete,
  useEffectOnce,
  useGet,
  useQuery,
} from "@/utils/hooks"
import { SaleProgramResponse, SaleProgramStatusResponse } from "@/utils/interface"
import RenderIf from "@/app/(components)/render-if"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Profile from "@/app/(components)/profile"
import Description from "@/app/(components)/description"
import State from "@/app/(components)/state"
import TimeRange from "@/app/(components)/time-range"
import { useConfirm, useConnection, useRouter } from "@/utils/functions"
import {
  RouteMap,
  concatPathName,
  HubMethodName,
  mappingToPagination,
  Redirect,
} from "@/utils/common"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./Create_Update"
import ListRender from "@/app/(components)/list/render"
import Character from "@/app/(components)/character"
import Filter from "@/app/(components)/list/filter"
import { FILTER_LIST, SEARCH_COLUMN } from "../_Meta"
import Context from "@/app/(components)/context"
import { Position } from "@/app/(components)/common"

const List = ({
  salePrograms,
}: {
  salePrograms: Fetched<RecordAndCounter<SaleProgramResponse>>
}) => {
  const router = useRouter()
  const without = useWithout()
  const connection = useConnection()
  const confirm = useConfirm()

  /**
   *
   * Summary:
   *      Api fetch with backend server
   *
   * Returns:
   *
   */
  const getStatus = useGet<SaleProgramStatusResponse[]>(
    concatPathName(RouteMap.SALE_PROGRAM, RouteMap.STATUS)
  )
  const query = useQuery(salePrograms)
  const remove = useDelete(RouteMap.SALE_PROGRAM)

  /**
   *
   * Summary:
   *      Action remove sale programs
   *
   * Returns:
   *
   */
  const onRemove = (saleProgram: SaleProgramResponse) =>
    confirm(() => remove.request({ pathname: saleProgram.id }))

  /**
   *
   * Summary:
   *      Listen event update record
   *
   * Returns:
   *
   */
  useEffectOnce(() =>
    connection.effectOn(HubMethodName.SALE_PROGRAM, () =>
      salePrograms.fetch({ silent: true })
    )
  )
  return (
    <Column gap={24}>
      <Filter
        filters={FILTER_LIST}
        onFilter={(item) => query.updateSortColumn(item.data)}
        onReset={query.reset}
        onSearch={(searchText) => query.updateSearch(searchText, SEARCH_COLUMN)}
      />
      <Row padding={8}>
        <RenderIf
          reverse={<ListRender column={7} />}
          reference={salePrograms.response}
          render={(promotions) => (
            <CustomList
              onClick={(saleProgram) =>
                router.push(Redirect.SALE_PROGRAM + "/" + saleProgram.id)
              }
              action={[
                ([item]) => (
                  <Row gap={8}>
                    <Icon
                      onClick={() => onRemove(item)}
                      style={{ filter: "grayscale(1)" }}
                      dir="icon/trash.svg"
                    ></Icon>
                    <Context
                      position={Position.RIGHT}
                      items={[
                        {
                          label: "Chỉnh sửa",
                          icon: "icon/edit.svg",
                          callback: () =>
                            without.append(
                              <CreateUpdate
                                salePrograms={item}
                                onExit={without.close}
                              ></CreateUpdate>
                            ),
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
                "Thời gian",
                "",
                "Ngày tạo",
                "Trạng thái",
                "Người tạo",
              ]}
              page={mappingToPagination(salePrograms, query.updatePage)}
              each={(item) => (
                <Fragment>
                  <Row className="col-span-2" itemsCenter gap={8}>
                    <Column>
                      <Content>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  </Row>
                  <Row className="col-span-2">
                    <TimeRange
                      fromDate={new Date(item.fromDate)}
                      toDate={new Date(item.toDate)}
                    ></TimeRange>
                  </Row>
                  <DateTime dateTime={new Date(item.created)}></DateTime>
                  <Row>
                    <RenderIf
                      reference={getStatus.response}
                      render={(status) => {
                        const information = status.find(
                          (status) => status.key == item.status
                        )
                        if (information === undefined) return

                        return (
                          <State
                            name={information.title}
                            background={information.backgroundColor}
                            color={information.color}
                          ></State>
                        )
                      }}
                    ></RenderIf>
                  </Row>
                  <Profile
                    name={item.profile.name}
                    email={item.profile.email}
                    avatar={item.profile.avatar}
                  ></Profile>
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
