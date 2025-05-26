import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const options = (color: string | undefined): ApexOptions => ({
  grid: {
    show: false,
  },
  fill: {
    colors: [color ?? "#f54b42"],
  },
  yaxis: { show: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  chart: {
    height: 456,
    type: "bar",
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
})

const ColumnChart2 = ({ color, data }: { color?: string; data: number[] }) => {
  return (
    <ReactApexChart
      series={[
        {
          data,
        },
      ]}
      options={options(color)}
      type="bar"
      height={100}
      width={100}
    ></ReactApexChart>
  )
}

export default ColumnChart2
