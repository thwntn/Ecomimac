import { RouteMap, Helper } from "@/utils/common"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { useGet } from "@/utils/hooks"
import { CounterSaleProgramResponse } from "@/utils/interface"
import { Fragment } from "react"

const Counter = () => {
  const getCounter = useGet<CounterSaleProgramResponse>(
    RouteMap.SALE_PROGRAM + "/" + RouteMap.COUNTER
  )
  const isLoad = convert(!getCounter.response)
  return (
    <Row gap={16}>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={getCounter.response}
          render={(counter) => (
            <Fragment>
              <Description>Tổng số chương trình bán hàng</Description>
              <Row itemsCenter gap={16}>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/promotional-program-program.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Row itemsCenter gap={8} className="text-[#1ca7ec]">
                  <Content size={24} className="font-bold">
                    {counter.quantity}
                  </Content>
                  chương trình
                </Row>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Row itemsCenter gap={4}>
                Có <span className="text-green-500">12</span> chương trình đang
                hoạt động
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={getCounter.response}
          render={(counter) => (
            <Fragment>
              <Description>Doanh thu từ chương trình bán hàng</Description>
              <Row gap={16} itemsCenter>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/promotional-program-currency.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Column className="text-[#FFA500]">
                  <Content size={24} className="font-bold">
                    {Helper.Currency.vietNamDong(counter.totalCost)}
                  </Content>
                  <Content>tổng doanh thu</Content>
                </Column>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Row itemsCenter gap={4}>
                Thu thập từ <span className="text-green-500">12</span> chương
                trình.
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={getCounter.response}
          render={(counter) => (
            <Fragment>
              <Description>Doanh thu từ chương trình bán hàng</Description>
              <Row itemsCenter gap={16}>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/promotional-program-product.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Row itemsCenter gap={8} className="text-[#32cd32]">
                  <Content size={24} className="font-bold">
                    {counter.quantityProduct}
                  </Content>
                  sản phẩm đã bán
                </Row>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Row itemsCenter gap={4}>
                Trên tồng số <span className="text-green-500">4342</span> sản
                phẩm đang chạy
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
    </Row>
  )
}

export default Counter
