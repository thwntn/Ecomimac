import { Fetched, useDelete, useEffectOnce, useGet } from "@/utils/hooks"
import { CashResponse, FundResponse } from "@/utils/interface"
import { RouteMap } from "@/utils/common"
import { useConfirm, useWithout } from "@/utils/functions"
import { Fragment } from "react"
import { Helper } from "@/utils/common"
import { ON, RIGHT, convert } from "@/app/(components)/common"
import List from "@/app/(components)/list"
import Icon from "@/app/(components)/icon"
import Context, { ContextElement } from "@/app/(components)/context"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Datetime from "@/app/(components)/date-time"
import State from "@/app/(components)/state"
import CreateUpdate from "./CreateUpdate"
import Wrapper from "@/app/(components)/wrapper"

const ListCash = ({ fund }: { fund: Fetched<FundResponse> }) => {
  const remove = useDelete(RouteMap.CASH)
  const confirm = useConfirm()
  const without = useWithout()

  const onRemove = (cash: CashResponse) =>
    confirm(() => remove.request({ pathname: cash.id }))

  const openCreateUpdate = (item: CashResponse) => {
    if (!fund.response) return

    without.append(
      <CreateUpdate onExit={without.close} fund={fund.response} cash={item} />
    )
  }

  return (
    <Wrapper>
      <List
        action={[
          ([item]) => (
            <Icon
              onClick={() => onRemove(item)}
              style={{ filter: "grayscale(1)" }}
              dir="icon/trash.svg"
            />
          ),
          ([item]) => (
            <Context
              position={RIGHT}
              items={[
                new ContextElement("icon/edit.svg", "Edit", () =>
                  openCreateUpdate(item)
                ),
                new ContextElement("icon/trash.svg", "Delete", () =>
                  onRemove(item)
                ),
              ]}
            />
          ),
        ]}
        column={["Thông tin", "Ngày tạo", "Trạng thái", "Chi phí"]}
        fit
        items={fund.response ? fund.response.cashes : []}
        each={(cash) => (
          <Fragment>
            <Column>
              <Content>{cash.name}</Content>
              <Description>{cash.name}</Description>
            </Column>
            <Datetime dateTime={new Date(cash.created)} />
            <State name="Hoạt động" color="#3b7fff" background="#ebf2ff" />
            <div className="text-right flex-col flex">
              <Content>
                {Helper.Currency.vietNamDong(
                  Number(cash.quantity) +
                    cash.totalAbstract -
                    cash.totalSubtract
                )}
              </Content>
              <Content className="text-[12px] text-blue-400">
                {Helper.Currency.vietNamDong(cash.quantity)}
              </Content>
            </div>
          </Fragment>
        )}
      ></List>
    </Wrapper>
  )
}

export default ListCash
