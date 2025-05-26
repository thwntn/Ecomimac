import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Character from "@/app/(components)/character"
import List from "@/app/(components)/list"
import Popup from "@/app/(components)/popup"
import State from "@/app/(components)/state"
import { Helper } from "@/utils/common"
import { ExpenseTransactionResponse } from "@/utils/interface"
import { Fragment } from "react"

const More = ({
  name,
  items,
  onExit,
}: {
  name: string
  items: ExpenseTransactionResponse[]
  onExit: VoidFunction
}) => {
  return (
    <Popup onExit={onExit} width={564} name={name}>
      <List
        column={["Thông tin", "", "Trạng thái", "Giá tiền"]}
        silent
        fit
        items={items}
        each={(item) => (
          <Fragment>
            <div className="flex gap-[12px] items-center col-span-2">
              <Character text={item.name} />
              <div className="flex flex-col">
                <Content className="line-clamp-1">{item.name}</Content>
                <Description lineClamp={2}>{item.description}</Description>
              </div>
            </div>

            <State
              name="Kích hoạt"
              background="#2c6bff13"
              color="#359eff"
            ></State>

            <div className="flex flex-col items-end gap-[4px] overflow-hidden">
              <Content className="text-[#21673f]">
                {Helper.Currency.vietNamDong(Number(item.amount))}
              </Content>
            </div>
          </Fragment>
        )}
      ></List>
    </Popup>
  )
}

export default More
