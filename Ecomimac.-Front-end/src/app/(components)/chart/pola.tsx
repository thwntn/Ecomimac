import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

var options: ApexOptions = {
  chart: {
    width: 380,
    type: "polarArea",
  },
  labels: ["Mua bán", "Nguồn thu", "Lợi nhuận", "Chi tiêu", "Đầu tư"],
  fill: {
    opacity: 1,
  },
  stroke: {
    width: 1,
    colors: undefined,
  },
  yaxis: {
    show: false,
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
      spokes: {
        strokeWidth: 0,
      },
    },
  },
}

const PolaChart = () => {
  return (
    <ReactApexChart
      series={[100, 200, 300, 496, 678]}
      options={options}
      type="polarArea"
      height={350}
    ></ReactApexChart>
  )
}

export default PolaChart
