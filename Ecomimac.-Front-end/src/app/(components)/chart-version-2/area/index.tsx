import dynamic from "next/dynamic"
import { createAreaOptions } from "../common/_Meta"
import { IAreaSeries } from "../common/Interface"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })
const TYPE = "area"

const AreaChart = ({
  height,
  series,
}: {
  height: number
  series: IAreaSeries[]
}) => {
  return (
    <ReactApexChart
      series={series}
      options={createAreaOptions()}
      type={TYPE}
      height={height}
    ></ReactApexChart>
  )
}

export default AreaChart
