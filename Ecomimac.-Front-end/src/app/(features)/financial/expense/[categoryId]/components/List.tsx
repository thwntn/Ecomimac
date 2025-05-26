import {
  RecordAndCounter,
  useGet,
  useDelete,
  useEffectOnce,
  QueryOptions,
} from "@/utils/hooks"
import { RouteMap, Helper, Redirect } from "@/utils/common"
import { HubMethodName } from "@/utils/common/Constant"
import { ExpenseResponse } from "@/utils/interface"
import { useConfirm, useConnection, useWithout } from "@/utils/functions"
import { Fragment, useEffect, useState } from "react"
import { default as CustomList } from "@/app/(components)/list"
import { RIGHT, convert } from "@/app/(components)/common"
import Icon from "@/app/(components)/icon"
import Context from "@/app/(components)/context"
import Row from "@/app/(components)/row"
import Image from "@/app/(components)/image"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import CreateUpdate from "./Create_Update"
import { useRouter } from "@/utils/functions"
import Description from "@/app/(components)/description"
import Column from "@/app/(components)/column"
import RenderIf from "@/app/(components)/render-if"
import ListRender from "@/app/(components)/list/render"
import State from "@/app/(components)/state"
import Filter from "@/app/(components)/list/filter"
import Character from "@/app/(components)/character"

const List = ({ categoryId }: { categoryId: string }) => {
  const [connection, without, confirm] = [
    useConnection(),
    useWithout(),
    useConfirm(),
  ]

  const remove = useDelete(RouteMap.EXPENSE)
  const router = useRouter()
  const getCategory = useGet<RecordAndCounter<ExpenseResponse>>(
    RouteMap.EXPENSE_CATEGORY + "/" + RouteMap.EXPENSE + "/" + categoryId,
    { params: new QueryOptions() }
  )

  const onMount = (category?: ExpenseResponse) => {
    without.append(
      <CreateUpdate
        expenseCategoryId={categoryId}
        category={category}
        onExit={without.close}
      />
    )
  }

  const onRemove = (categories: ExpenseResponse[]) =>
    confirm(() =>
      remove.request({ data: { ids: categories.map((item) => item.id) } })
    )

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.EXPENSE, () =>
      getCategory.fetch({ silent: true })
    )
  )
  return (
    <Column gap={24}>
      <Filter
        filters={[]}
        onSearch={() => void undefined}
        onFilter={() => void undefined}
        onReset={() => void undefined}
      ></Filter>
      <Row padding={8}>
        <RenderIf
          reverse={<ListRender column={7} />}
          reference={getCategory.response}
          render={(category) => (
            <CustomList
              fit
              column={[
                "Tên danh mục",
                String(),
                "Ngày tạo",
                "Số lượng",
                "Trạng thái",
                "Ngân sách",
                "Chi tiêu",
              ]}
              items={category.data}
              page={Helper.Data.withPagination(getCategory, (page, limit) =>
                getCategory.fetch({ params: new QueryOptions({ page, limit }) })
              )}
              action={[
                ([item]) => (
                  <Icon
                    dir="icon/trash.svg"
                    style={{ filter: "grayscale(1)" }}
                    onClick={() => onRemove([item])}
                  />
                ),
                ([item]) => (
                  <Context
                    position={RIGHT}
                    items={[
                      {
                        callback: () => onMount(item),
                        icon: "icon/edit.svg",
                        label: "Chỉnh sửa",
                      },
                      {
                        callback: () => onRemove([item]),
                        icon: "icon/trash.svg",
                        label: <div style={{ color: "#FF0000" }}>Xóa</div>,
                      },
                    ]}
                  />
                ),
              ]}
              onClick={(item) => router.push(categoryId + "/" + item.id)}
              each={(item) => {
                const totalUsed = item.expenseTransactions.reduce(
                  (sum, item) => sum + Number(item.amount),
                  0
                )
                return (
                  <Fragment>
                    <Row gap={16} className="col-span-2">
                      <Character text={item.name}></Character>
                      <div className="flex flex-col">
                        <Content className="line-clamp-1">{item.name}</Content>
                        <Description lineClamp={1}>
                          {item.description}
                        </Description>
                      </div>
                    </Row>
                    <DateTime dateTime={new Date(item.created)}></DateTime>
                    <Content>
                      {item.expenseTransactions.length} giao dịch
                    </Content>

                    <State
                      background="#2c6bff13"
                      color="#359eff"
                      name="Hoạt động"
                    ></State>

                    <Row gap={4}>
                      <Image
                        dir="icon/cash-budget.svg"
                        width={16}
                        height={16}
                      ></Image>
                      <Content className="text-[#169c50]">
                        {Helper.Currency.vietNamDong(item.budget)}
                      </Content>
                    </Row>
                    <Column itemsEnd>
                      <div className="w-fit">
                        <Row itemsCenter justifyEnd>
                          <Image
                            dir="icon/cash-used.svg"
                            width={16}
                            height={16}
                          ></Image>
                          <Content className="text-[#e65b31] text-nowrap">
                            {Helper.Currency.vietNamDong(totalUsed)}
                          </Content>
                        </Row>
                        <Description className="text-right">
                          (
                          {Helper.Currency.vietNamDong(item.budget - totalUsed)}
                          )
                        </Description>
                      </div>
                    </Column>
                  </Fragment>
                )
              }}
            ></CustomList>
          )}
        ></RenderIf>
      </Row>
    </Column>
  )
}

export default List
