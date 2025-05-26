import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

var options: ApexOptions = {
  chart: {
    height: 280,
    type: "radialBar",
  },

  series: [67],
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      hollow: {
        size: "70%",
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          show: true,
          fontSize: "14px",
          formatter: function (val) {
            return val + "%"
          },
        },
        total: {
          show: true,
          label: "Total",
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"],
}

const Process = () => {
  return (
    <ReactApexChart
      width={350}
      series={[{ data: [30 as any] }]}
      type="radialBar"
      options={options}
    ></ReactApexChart>
  )
}

export default Process
