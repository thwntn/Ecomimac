"use client"

import { CSSProperties, Fragment, useEffect, useState } from "react"
import { RouteMap, CardType, Helper, HubMethodName, Redirect } from "@/utils/common"
import { FundResponse } from "@/utils/interface"
import { useGet } from "@/utils/hooks"
import { useConnection } from "@/utils/functions"
import themes from "./index.module.scss"
import { useRouter } from "@/utils/functions"
import RenderIf from "@/app/(components)/render-if"
import Card from "../card"

const FONT_COLOR = "#000000"

class Setting {
  constructor(
    public icon: string,
    public background: string,
    public style: CSSProperties
  ) {}
}

export const Cards: { [key: string]: Setting } = {
  [CardType.MASTERCARD]: new Setting(
    "icon/fund.mastercard.svg",
    "image/fund.jcb.png",
    {
      color: FONT_COLOR,
    }
  ),
  [CardType.VISA]: new Setting("icon/fund.visa.svg", "image/fund.visa.png", {
    color: FONT_COLOR,
  }),
  [CardType.JCB]: new Setting(
    "icon/fund.mastercard.svg",
    "image/fund.jcb.png",
    {
      color: FONT_COLOR,
    }
  ),
}

const List = () => {
  const fund = useGet<Array<FundResponse>>(RouteMap.FUND)
  const connection = useConnection()
  const router = useRouter()

  const gotoFund = (fund: FundResponse) =>
    router.push(Redirect.FUND_INFORMATION + "/" + fund.id)

  useEffect(
    () => connection.effectOn(HubMethodName.FUND, fund.fetch),
    [connection, fund.fetch]
  )

  return (
    <Fragment>
      <RenderIf
        reference={fund.response}
        render={(item) => (
          <ul className={themes.frame}>
            {item.map((fund, index) => (
              <li key={index} onClick={() => gotoFund(fund)}>
                <Card fund={fund}></Card>
              </li>
            ))}
          </ul>
        )}
      ></RenderIf>
    </Fragment>
  )
}
export default List
