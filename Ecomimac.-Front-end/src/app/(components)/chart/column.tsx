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
    height: 80,
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

const ColumnChart = ({ color }: { color?: string }) => {
  return (
    <ReactApexChart
      series={[
        {
          data: [1, 5, 4, 7, 10],
        },
      ]}
      options={options(color)}
      type="bar"
      height={100}
      width={100}
    ></ReactApexChart>
  )
}

export default ColumnChart
