import Wrapper from "@/app/(components)/wrapper"
import themes from "./index.module.scss"
import { FundResponse } from "@/utils/interface"
import { Cards } from "../list"
import Image from "@/app/(components)/image"
import Content from "@/app/(components)/content"
import { Helper } from "@/utils/common"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"

const Card = ({ fund }: { fund: FundResponse }) => {
  return (
    <div className={themes.item}>
      <Wrapper
        style={{ backgroundImage: "url(" + fund.backgroundUrl + ")" }}
        className="bg-cover bg-center"
      >
        <div
          className={themes.content}
          style={{
            ...Cards[fund.type].style,
            backgroundImage: `url(${Cards[fund.type].background})`,
          }}
        >
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <Image dir={Cards[fund.type].icon} width={36} height={36} />
              <Content className="font-bold text-[12px]">{fund.name}</Content>
            </div>
            <Content>{Helper.Currency.vietNamDong(fund.total)}</Content>
          </div>
          <Column justifyCenter>
            <div className="flex gap-[8px]">
              <a className="underline" href="#cash">
                Chi tiết thẻ
              </a>
            </div>
            <Description>{fund.description}</Description>
          </Column>
          <div className="flex flex-col gap-2">
            <Content className="text-3xl font-bold">{fund.number}</Content>
            <Content>{fund.author}</Content>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Card
