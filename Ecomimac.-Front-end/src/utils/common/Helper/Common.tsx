import { Fetched, RecordAndCounter } from "@/utils/hooks"
import { ProductImagesResponse } from "@/utils/interface"
import moment from "moment"
import momentTimezone from "moment-timezone"
import randomstring from "randomstring"

export const FORMAT_TIME = "HH:mm:ss, YYYY/MM/DD"
export const FORMAT_TIME_DATE = "YYYY-MM-DD"
export const FORMAT_DATE_AND_MONTH = "DD-MM"

const INIT = 1

class Time {
  timeZone = {
    VIETNAM: "Asia/Ho_Chi_Minh",
  }

  range = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    //
    return [new Date(year, month, 2), new Date(year, month + 1, 0)]
  }

  now = (timezone: string | undefined = undefined): Date => {
    if (timezone === undefined)
      //
      return moment(new Date()).toDate()
    return momentTimezone(new Date()).tz(timezone).toDate()
  }

  format = (date: string | Date, format?: string): string => {
    const define = format ? format : FORMAT_TIME
    //
    if (date instanceof Date) return moment(date).format(define)
    return moment(new Date(date)).format(define)
  }

  toISOString = (date: string | Date): string => {
    if (date instanceof Date) return moment.utc(date + "Z").format()
    return moment.utc(new Date(date + "Z")).format()
  }
}

class Currency {
  vietNamDong = (number: number | string): string => {
    const value = Number(number)
      .toFixed(1)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

    return value.slice(0, value.length - 2) + " đ"
  }

  middlewareNext = (value: string): string =>
    new Intl.NumberFormat().format(Number(value))

  middlewareReverse = (value: string): string => value.replaceAll(",", String())
}

class Random {
  string(length?: number) {
    const str = randomstring.generate(length ?? 10)
    return str
  }
}

class Pagination {
  constructor(
    limit: number,
    total: number,
    current: number,
    onChange: (page: number, limit: number) => void
  ) {
    this.onChange = onChange
    this.limit = limit
    this.total = total
    this.current = current
  }

  limit: number
  total: number
  current: number
  onChange: (page: number, limit: number) => void
}

class Data {
  withPagination(
    fetched: Fetched<RecordAndCounter<unknown>>,
    callback: (page: number, limit: number) => void
  ) {
    const response = fetched.response
    if (!response || !response.page)
      return new Pagination(INIT, INIT, INIT, callback)

    return new Pagination(
      response.page.limit,
      response.page.total,
      response.page.current,
      callback
    )
  }
  getAvatarProduct(images: ProductImagesResponse[]): ProductImagesResponse {
    const avatar = images.find((image) => image.isMain)

    if (avatar === undefined)
      return { isMain: true, url: String(), id: String(), productId: String() }

    return avatar
  }

  getDiscountFromPercent(
    amount: number,
    discountPercent: number,
    maxDiscountAmount: number
  ) {
    if (discountPercent === undefined || discountPercent === 0) return 0

    const discountAmount = amount * (discountPercent / 100)
    if (maxDiscountAmount === undefined || maxDiscountAmount === 0)
      return discountAmount

    return discountAmount > maxDiscountAmount
      ? maxDiscountAmount
      : discountAmount
  }
}

class Format {
  capitalize(content: string) {
    if (
      content === undefined ||
      content[0] === undefined ||
      content.length === 0
    )
      return content
    //
    content =
      content[0].toUpperCase() +
      content.slice(1, content.length).toLocaleLowerCase()
    return content
  }
}

export const Helper = {
  Currency: new Currency(),
  Format: new Format(),
  Random: new Random(),
  Time: new Time(),
  Data: new Data(),
}

export enum Platform {
  WINDOWS = "Windows",
  MACOS = "Mac",
  UNKNOW = "Unknow",
}

export const detectPlatform = () => {
  if (window.navigator.userAgent.includes(Platform.MACOS)) return Platform.MACOS

  if (window.navigator.userAgent.includes(Platform.WINDOWS))
    return Platform.WINDOWS

  return Platform.UNKNOW
}
