import moment from "moment"

export interface MonthInformation {
  startDate: Date
  endDate: Date
}

export const useFormat = function () {
  return {
    vnd: (num: number | string) => {
      const value = Number(num)
        .toFixed(1)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      return value.slice(0, value.length - 2) + " đ"
    },

    getDateWithoutTime: (input: string | Date) => {
      const date = new Date(input)
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      )
    },

    dateTime: (date: string | Date) => moment(date).format("HH:mm, DD-MM-YYYY"),
    date: (date: string | Date) => moment(date).format("DD/MM"),
    monthInformation: (month: number): MonthInformation => {
      return {
        startDate: new Date(2024, month - 1, 1),
        endDate: new Date(2024, month, 0),
      }
    },
  }
}
