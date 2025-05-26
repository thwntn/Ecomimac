import { RouteMap } from "@/utils/common"
import { concatPathName } from "@/utils/common/Helper"
import AreaChart from "@/app/(components)/chart-version-2/area"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import TimeRange from "@/app/(components)/time-range"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched, useGet } from "@/utils/hooks"
import { SaleProgramReportResponse, SaleProgramResponse } from "@/utils/interface"
import moment from "moment"

const LABEL = "Doanh thu từ chương trình bán hàng"
const COLOR = "#4e8bed"

const ESTIMATE_LABEL = "Ước lượng doanh thu"
const ESTIMATE_COLOR = "#77d991"

const Report = ({
  id,
  saleProgram,
}: {
  id: string
  saleProgram: Fetched<SaleProgramResponse>
}) => {
  const getReport = useGet<SaleProgramReportResponse[]>(
    concatPathName(RouteMap.SALE_PROGRAM, RouteMap.REPORTS, id)
  )

  const mapData = (reports: SaleProgramReportResponse[]) => {
    const charts = reports.map((report) => ({
      x: moment(report.dateTime).format("DD/MM"),
      y: report.amount,
    }))

    const rounded = charts.map((chart) => ({
      ...chart,
      y: Math.ceil(Math.random() * 2000000),
    }))
    return [charts, rounded]
  }

  const isLoad = convert(!getReport.response || !saleProgram.response)
  return (
    <Wrapper isLoad={isLoad}>
      <Row gap={48}>
        <Column size={6}>
          <Title>Báo cáo thống kê</Title>
          <Description>
            Tổng hợp kết quả kinh doanh của một chương trình bán hàng trong một
            khoảng thời gian
          </Description>
        </Column>
        <RenderIf
          reference={saleProgram.response}
          render={(saleProgram) => (
            <Row size={6} justifyEnd>
              <TimeRange
                fromDate={new Date(saleProgram.fromDate)}
                toDate={new Date(saleProgram.toDate)}
              ></TimeRange>
            </Row>
          )}
        ></RenderIf>
      </Row>
      <RenderIf
        reference={getReport.response}
        render={(reports) => {
          const [render, rounded] = mapData(reports)

          const configure = [
            {
              name: LABEL,
              color: COLOR,
              data: render,
            },
            {
              name: ESTIMATE_LABEL,
              color: ESTIMATE_COLOR,
              data: rounded,
            },
          ]

          return <AreaChart height={360} series={configure}></AreaChart>
        }}
      ></RenderIf>
    </Wrapper>
  )
}

export default Report
