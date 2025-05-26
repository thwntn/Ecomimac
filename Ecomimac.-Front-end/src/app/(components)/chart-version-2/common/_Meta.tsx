import { Helper } from "@/utils/common"
import { ApexOptions } from "apexcharts"

export const createAreaOptions = (): ApexOptions => ({
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
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    show: false,
    labels: {
      formatter: (value: number) => Helper.Currency.vietNamDong(value),
    },
  },
  xaxis: {
    labels: {
      show: true,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  plotOptions: {
    bar: { borderRadius: 4, borderRadiusApplication: "end" },
  },
  stroke: {
    width: 1,
    curve: "smooth",
  },
})
