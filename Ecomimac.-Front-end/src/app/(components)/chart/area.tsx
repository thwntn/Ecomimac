import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const createOptions = (expand?: { color?: string }): ApexOptions => ({
  chart: {
    toolbar: { show: false },
  },
  tooltip: {
    enabled: true,
  },
  grid: {
    show: false,
  },

  markers: { size: 4 },
  colors: expand && expand.color ? [expand.color] : undefined,
  dataLabels: {
    enabled: false,
  },
  yaxis: { show: false },
  plotOptions: {
    bar: { borderRadius: 4, borderRadiusApplication: "end" },
  },
  stroke: {
    width: 1,
    curve: "smooth",
  },
})

export class Value {
  constructor(public x: string, public y: number) {}
}

export class Data {
  constructor(
    public data: Value[],
    public color: string,
    public name: string
  ) {}
}

interface IProps {
  series: Array<Data>
  color?: string
  height?: number
}

const AreaChart = (props: IProps) => {
  return (
    <ReactApexChart
      series={props.series}
      options={createOptions({ color: props.color })}
      type="area"
      height={props.height ?? 350}
    ></ReactApexChart>
  )
}

export default AreaChart
