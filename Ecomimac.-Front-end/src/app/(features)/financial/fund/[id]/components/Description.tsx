import { create } from "zustand"
import { ChangeEvent } from "react"
import { useConfirm } from "@/utils/functions"
import { useDelete, useFormat, usePost } from "@/utils/hooks"
import { CashResponse } from "@/utils/interface"
import { RouteMap, CashType } from "@/utils/common"
import { IProcess } from "@/app/(components)/process"
import Image from "@/app/(components)/image"
import Content from "@/app/(components)/content"
import Process from "@/app/(components)/process"
import Button from "@/app/(components)/button"
import Input from "@/app/(components)/input"
import Dropdown from "@/app/(components)/dropdown"
import Popup from "@/app/(components)/popup"

class Setting {
  constructor(public color?: string) {}
}

export const CashSetting: { [key: string]: Setting } = {
  [CashType.None]: new Setting(),
  [CashType.Abstract]: new Setting("#17d123"),
  [CashType.Subtract]: new Setting("#d52e2e"),
}

export class ICashItem {
  constructor(public name: string, public value: CashType) {}
}

const cashSelect: ICashItem[] = [
  new ICashItem("Không thay đổi", CashType.None),
  new ICashItem("Khoản thu", CashType.Abstract),
  new ICashItem("Khoản chi", CashType.Subtract),
]

export interface IStore {
  createSubCash: CreateSubCash
  update: (event: ChangeEvent<HTMLInputElement>) => void
  setType: (type: number) => void
}

class CreateSubCash {
  constructor(
    public cashType: number,
    public name: string = String(),
    public quantity: string = String()
  ) {}
}

const useStore = create<IStore>((set) => ({
  createSubCash: new CreateSubCash(CashType.None),
  update: (event) =>
    set((state) => ({
      createSubCash: {
        ...state.createSubCash,
        [event.target.name]: event.target.value,
      },
    })),
  setType: (type) =>
    set((state) => ({
      createSubCash: { ...state.createSubCash, cashType: type },
    })),
}))

const Description = ({
  fundId,
  cash,
}: {
  fundId: string
  cash: CashResponse
}) => {
  const [store, format, confirm] = [useStore(), useFormat(), useConfirm()]
  const removeFundRequest = useDelete(
    RouteMap.FUND + "/" + RouteMap.CASH + "/" + fundId + "/" + cash.id
  )
  const createSubCashRequest = usePost(
    RouteMap.CASH_DESCRIPTIONS + "/" + cash.id
  )
  const remove = function (cash: CashResponse) {
    confirm(() => removeFundRequest.request({}))
  }

  const createSubCash = function () {
    createSubCashRequest.request(store.createSubCash)
  }

  const trackings: IProcess[] = cash.cashDescriptions.map((item) => ({
    name: item.name,
    time: format.dateTime(item.created),
    description: format.vnd(item.quantity),
    color: CashSetting[item.cashType].color,
  }))
  return (
    <div className="hidden gap-6 items-center z-10 px-12 bg-gradient-to-r from-gray-100 to-slate-200 group-hover:flex absolute right-0 top-0 bottom-0 bg-slate-800">
      <Popup
        name="THÊM GIAO DỊCH CON"
        className="w-[645px]"
        trigger={
          <div>
            <Button onClick={createSubCash}>Lưu giao dịch</Button>
          </div>
        }
        width={645}
      >
        <Input
          name="name"
          onChange={store.update}
          label="Thông tin giao dịch"
          placeholder="Mua sắm"
        ></Input>
        <Input
          name="quantity"
          onChange={store.update}
          label="Cost"
          placeholder="1.000.000 vnđ"
        ></Input>
        {/* <Dropdown
          show={(item) => item.name}
          label="Loại giao dịch"
          items={cashSelect}
          each={(item: ICashItem) => <div className="p-[8px]">{item.name}</div>}
          onChange={(item: ICashItem) => store.setType(item.value)}
        ></Dropdown> */}
      </Popup>
      <Image dir="icon/cash.description.svg" width={18} height={18} />
      <Image
        dir="icon/remove.svg"
        onClick={() => remove(cash)}
        width={18}
        height={18}
      />
    </div>
  )
}

export default Description
