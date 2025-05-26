import { RouteMap } from "@/utils/common"
import { Value } from "@/app/(components)/chart/area"
import ColumnChart2 from "@/app/(components)/chart/column-2"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { useGet } from "@/utils/hooks"
import { ChartResponse, CustomerResponse, DiscountResponse } from "@/utils/interface"

const COLORS = [
  "#46a8ff",
  "#FFAB00",
  "#00A76F",
  "#4832a8",
  "#de4552",
  "#e8813c",
]

const Analyst = ({ discount }: { discount: DiscountResponse }) => {
  const recent = useGet<DiscountResponse[]>(
    RouteMap.DISCOUNT + "/" + RouteMap.RECENT
  )
  const chart = useGet<ChartResponse[]>(
    RouteMap.DISCOUNT + "/" + RouteMap.CHART + "/" + discount.id
  )

  const dataChart = (charts: ChartResponse[]): Array<number> => {
    if (!charts || charts.length === 1) return []
    return charts.map((item) => item.amount)
  }

  return (
    <Column gap={24}>
      <Wrapper>
        <RenderIf
          reference={recent.response}
          render={(recent) => (
            <Column gap={16}>
              <Row size={0.1}>
                <Column justifyStart className="h-fit" gap={16}>
                  <Row itemsCenter gap={8} className="px-2">
                    <div className="w-[20px] h-[20px] bg-[#46a8ff] rounded-md flex justify-center items-center text-white">
                      #
                    </div>
                    <Content className="font-bold">Mã giảm gần đây</Content>
                  </Row>
                  <Column gap={16}>
                    {recent.map((discount, index) => (
                      <Row itemsCenter gap={8} key={index}>
                        <div
                          style={{ background: COLORS[index] }}
                          className="w-[32px] h-[32px] flex justify-center items-center font-bold text-white text-[16px] rounded-full"
                        >
                          {discount.code[0]}
                        </div>
                        <Column>
                          <div>{discount.code}</div>
                          <Description lineClamp={1}>
                            {discount.description}
                          </Description>
                        </Column>
                      </Row>
                    ))}
                  </Column>
                </Column>
              </Row>
            </Column>
          )}
        ></RenderIf>
      </Wrapper>

      <Wrapper>
        <Title>Tần suất sử dụng</Title>
        <RenderIf
          reference={chart.response}
          render={(chart) => {
            const data = dataChart(chart)
            console.log(data)

            if (chart.length === 0)
              return <Content>Không có dữ liệu gần đây</Content>
            ///
            return (
              <ColumnChart2 color="#52a8ff" data={[...data]}></ColumnChart2>
            )
          }}
        ></RenderIf>
      </Wrapper>
    </Column>
  )
}

export default Analyst
