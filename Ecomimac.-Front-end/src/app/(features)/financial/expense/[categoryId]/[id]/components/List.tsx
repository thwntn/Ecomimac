import { RouteMap } from "@/utils/common"
import { HubMethodName } from "@/utils/common/Constant"
import {
  QueryOptions,
  RecordAndCounter,
  useGet,
  useDelete,
  useEffectOnce,
} from "@/utils/hooks"
import { useParams } from "next/navigation"
import CreateUpdate from "./Create_Update"
import { RIGHT } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import DateTime from "@/app/(components)/date-time"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import { default as CustomList } from "@/app/(components)/list"
import { Helper } from "@/utils/common"
import { Fragment } from "react"
import { ExpenseTransactionResponse } from "@/utils/interface"
import { useConfirm, useConnection, useWithout } from "@/utils/functions"
import Description from "@/app/(components)/description"
import Row from "@/app/(components)/row"
import RenderIf from "@/app/(components)/render-if"
import ListRender from "@/app/(components)/list/render"
import State from "@/app/(components)/state"
import Character from "@/app/(components)/character"

interface IParams {
  [key: string]: string
  id: string
}

const List = () => {
  const [connection, confirm, without] = [
    useConnection(),
    useConfirm(),
    useWithout(),
  ]
  const params = useParams<IParams>()
  const remove = useDelete(RouteMap.EXPENSE_TRANSACTIONS)
  const getExpenseTransaction = useGet<
    RecordAndCounter<ExpenseTransactionResponse>
  >(RouteMap.EXPENSE_TRANSACTIONS + "/" + params.id, {
    params: new QueryOptions(),
  })

  const onRemove = function (
    expenseTransactions: ExpenseTransactionResponse[]
  ) {
    const ids = expenseTransactions.map((item) => item.id)
    confirm(() =>
      remove.request({
        data: { ids },
      })
    )
  }

  const onMount = (expenseTransaction?: ExpenseTransactionResponse) =>
    without.append(
      <CreateUpdate
        onExit={without.close}
        expenseTransaction={expenseTransaction}
      />
    )

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.EXPENSE_TRANSACTION, () =>
      getExpenseTransaction.fetch({
        params: new QueryOptions(),
        silent: true,
      })
    )
  )

  return (
    <RenderIf
      trigger={getExpenseTransaction.isWait === false}
      reverse={<ListRender column={6} />}
      reference={getExpenseTransaction.response}
      render={(expenseTransaction) => (
        <CustomList
          column={[
            "Tên giao dịch",
            String(),
            "Ngày tạo",
            "Ngày giao dịch",
            "Trạng thái",
            "Chi phí",
          ]}
          action={[
            ([item]) => (
              <Icon
                dir="icon/trash.svg"
                onClick={() => onRemove([item])}
                style={{ filter: "grayscale(1)" }}
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
                    callback: () => {},
                    icon: "icon/trash.svg",
                    label: <div style={{ color: "#FF0000" }}>Xoá</div>,
                  },
                ]}
              />
            ),
          ]}
          items={expenseTransaction.data}
          page={Helper.Data.withPagination(
            getExpenseTransaction,
            (page, limit) =>
              getExpenseTransaction.fetch({
                params: new QueryOptions({ page, limit }),
              })
          )}
          each={(item) => (
            <Fragment>
              <div className="flex gap-[12px] items-center col-span-2">
                <Character text={item.name}></Character>
                <div className="flex flex-col">
                  <Content className="line-clamp-1">{item.name}</Content>
                  <Description>{item.description}</Description>
                </div>
              </div>
              <DateTime dateTime={new Date(item.created)}></DateTime>
              <DateTime dateTime={new Date(item.dateTime)}></DateTime>

              <State
                background="#2c6bff13"
                color="#359eff"
                name="Hoạt động"
              ></State>

              <div className="flex flex-col items-end gap-[4px] overflow-hidden">
                <Row itemsCenter>
                  <Image
                    dir="icon/cash-used.svg"
                    width={16}
                    height={16}
                  ></Image>
                  <Content className="text-[#e65b31] text-nowrap">
                    {Helper.Currency.vietNamDong(item.amount)}
                  </Content>
                </Row>
              </div>
            </Fragment>
          )}
        ></CustomList>
      )}
    ></RenderIf>
  )
}

export default List
