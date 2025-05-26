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
} from "@/utils/hooks"
import RenderIf from "@/app/(components)/render-if"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import State from "@/app/(components)/state"
import TimeRange from "@/app/(components)/time-range"
import { ExpenseCategoryResponse } from "@/utils/interface"
import { RouteMap, concatPathName, Redirect } from "@/utils/common"
import { useConfirm, useRouter, useWithout } from "@/utils/functions"
import ListRender from "@/app/(components)/list/render"
import Character from "@/app/(components)/character"
import Filter from "@/app/(components)/list/filter"
import Tag from "@/app/(components)/tag"
import CreateUpdate from "./Create_Update"
import Context from "@/app/(components)/context"
import { Position } from "@/app/(components)/common"

const List = ({
  expenseCategory,
}: {
  expenseCategory: Fetched<RecordAndCounter<ExpenseCategoryResponse>>
}) => {
  const router = useRouter()
  const confirm = useConfirm()
  const without = useWithout()
  const remove = useDelete(concatPathName(RouteMap.EXPENSE_CATEGORY))

  const gotoExpenseCategory = (expense: ExpenseCategoryResponse) => {
    router.push(Redirect.EXPENSE + "/" + expense.id)
  }

  const onRemove = (expense: ExpenseCategoryResponse) =>
    confirm(() => remove.request({ pathname: expense.id }))

  const onUpdate = (expenseCategory: ExpenseCategoryResponse) =>
    without.append(
      <CreateUpdate
        expenseCategory={expenseCategory}
        onExit={without.close}
      ></CreateUpdate>
    )
  return (
    <Column gap={24}>
      <Row justifyBetween>
        <Filter
          onReset={() => void undefined}
          onFilter={() => void undefined}
          filters={[]}
          onSearch={(searchText) =>
            expenseCategory.fetch({
              params: new QueryOptions({
                searchText,
                searchColumns: "Name",
              }),
            })
          }
        />
        <Row size={0.1}>
          <Icon dir="icon/setting.svg" content="Cài đặt"></Icon>
        </Row>
      </Row>
      <Row padding={8}>
        <RenderIf
          trigger={expenseCategory.isWait === false}
          reverse={<ListRender column={5} />}
          reference={expenseCategory.response}
          render={(expense) => (
            <CustomList
              onClick={gotoExpenseCategory}
              action={[
                ([item]) => (
                  <Row gap={4}>
                    <Icon
                      dir="icon/trash.svg"
                      style={{ filter: "grayscale(1)" }}
                      onClick={() => onRemove(item)}
                    ></Icon>
                    <Context
                      position={Position.RIGHT}
                      items={[
                        {
                          icon: "icon/edit.svg",
                          label: "Chỉnh sửa",
                          callback: () => onUpdate(item),
                        },
                      ]}
                    ></Context>
                  </Row>
                ),
              ]}
              items={expense.data}
              column={[
                "Thông tin",
                "",
                "Gắn thẻ",
                "",
                "Thời gian",
                "",
                "Trạng thái",
                "Ngày tạo",
              ]}
              page={{
                onChange(page, limit) {
                  expenseCategory.fetch({
                    params: new QueryOptions({ page, limit }),
                  })
                },
                current: expense.page.current,
                total: expense.page.total,
                limit: expense.page.limit,
              }}
              each={(item) => (
                <Fragment>
                  <Row itemsCenter className="col-span-2" gap={8}>
                    <Character text={item.name}></Character>
                    <Column>
                      <Content lineClamp={1}>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  </Row>

                  <Row className="col-span-2">
                    <Tag
                      items={item.expenseCategoryTags.map((item) => ({
                        name: item.tag.name,
                        color: item.tag.color,
                      }))}
                    ></Tag>
                  </Row>

                  <Row className="col-span-2">
                    <TimeRange
                      fromDate={new Date(item.fromDate)}
                      toDate={new Date(item.toDate)}
                    ></TimeRange>
                  </Row>

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
