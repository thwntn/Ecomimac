import { RouteMap, Helper } from "@/utils/common"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Reference from "@/app/(components)/reference"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched } from "@/utils/hooks"
import { RevenueResponse } from "@/utils/interface"
import { Fragment } from "react"

const COLORS = ["#c084fc", "#7bd5f5", "#fb923c"]

const Counter = ({ getRevenue }: { getRevenue: Fetched<RevenueResponse> }) => {
  const isLoad = convert(!getRevenue.response)
  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={getRevenue.response}
        render={(revenue) => (
          <Fragment>
            <Row gap={16} justifyBetween>
              <Title>Doanh thu chương trình</Title>
              <Reference content="Thay đổi"></Reference>
            </Row>
            <Column>
              <Content className="text-[24px] font-bold">
                {Helper.Currency.vietNamDong(revenue.totalCost)}
              </Content>
              <Description>
                Doanh thu từ chương trình bán hàng là tổng số tiền thu được từ
                việc bán sản phẩm hoặc dịch vụ trong một khoảng thời gian cụ thể
              </Description>
            </Column>
            <Row gap={16}>
              {revenue.sumRevenues.map((item, index) => (
                <Column
                  key={index}
                  className="rounded-[4px] bg-gray-50 border border-slate-100 p-4"
                  gap={8}
                >
                  <Column>
                    <Title>{Helper.Currency.vietNamDong(item.total)}</Title>
                    <Description>{item.product.name}</Description>
                  </Column>
                  <Column gap={8}>
                    <Row itemsCenter justifyBetween gap={8}>
                      <Description className="text-nowrap">
                        {Helper.Currency.vietNamDong(item.total)}
                      </Description>
                      <Description className="text-nowrap">
                        {Helper.Currency.vietNamDong(revenue.totalCost)}
                      </Description>
                    </Row>
                    <div className="bg-white relative min-h-[20px] w-full rounded-[4px] overflow-hidden">
                      <div
                        style={{
                          backgroundColor: COLORS[index],
                          width: item.percent * 100 + "%",
                        }}
                        className="text-[10px] text-white flex px-4 items-center absolute left-0 bottom-0 top-0"
                      >
                        {Math.ceil(item.percent * 100)}%
                      </div>
                    </div>
                  </Column>
                </Column>
              ))}
            </Row>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Counter
