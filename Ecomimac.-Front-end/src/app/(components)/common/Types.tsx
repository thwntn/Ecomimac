import { CSSProperties, MouseEventHandler, ReactNode } from "react"

export interface Properties {
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement> | undefined
  children?: ReactNode
  className?: string
  id?: string
}

export enum Status {
  OFF = 0,
  ON = 1,
}

export const ON = Status.ON
export const OFF = Status.OFF

export enum Position {
  TOP = 0,
  RIGHT = 1,
  BOTTOM = 2,
  LEFT = 3,
}

export const TOP = Position.TOP
export const RIGHT = Position.RIGHT
export const BOTTOM = Position.BOTTOM
export const LEFT = Position.LEFT

export const convert = (value: unknown) => (value ? Status.ON : Status.OFF)
