import { Dispatch, SetStateAction, useState } from "react"
import { OFF, Properties, Status } from "../common/Types"
import Content from "../content"
import Image from "../image"
import { CustomIconNames } from "../common"
import themes from "./index.module.scss"
import clsx from "clsx"
import RenderIf from "../render-if"
import { useEffectOnce } from "@/utils/hooks"
import moment from "moment"
const FORMAT_VIETNAM = "vi"
const FORMAT_WEEKDAY = "long"
const EMPTY = "--/--/----"
const INITIAL = new Date(1900, 1, 1)

export interface IProps extends Properties {
  onChange?: (date: Date) => void
  label: string
  value?: Date
  error?: string
  validated?: Status
}

export const monthNames = Array.from({ length: 11 }).map(
  (_disable, index) => `Tháng ${index + 1}`
)

const Calendar = (props: IProps) => {
  const customProps = Object.assign({}, props)
  customProps.className = clsx(props.className, themes.trigger, {
    [themes.active]: props.onChange,
  })

  const [active, update] = useState(false)
  const [current, updateCurrent] = useState<Date>(INITIAL)
  const month = current.getMonth()
  const year = current.getFullYear()

  const startDate = new Date(year, month, 1).getDate()
  const endDate = new Date(year, month + 1, 0).getDate() + 1

  const dateOfMonth = Array.from({ length: endDate - startDate }).map(
    (_item, index) => new Date(year, month, index + 1)
  )

  const onOpen = () => {
    const datetime = new Date()
    update((previous) => previous === false)
    updateCurrent(datetime)
  }

  const next = function () {
    const date = new Date(current)

    date.setMonth(current.getMonth() + 1)
    props.onChange && props.onChange(date)

    updateCurrent(date)
  }

  const previous = function () {
    const date = new Date(current)

    date.setMonth(current.getMonth() - 1)
    props.onChange && props.onChange(date)

    updateCurrent(date)
  }

  const onChange = function (date: Date) {
    props.onChange && props.onChange(date)
    updateCurrent(date)
    update(false)
  }

  const days = Array.from(dateOfMonth)
  days.length = 6

  useEffectOnce(
    () => void (props.value === undefined || updateCurrent(props.value))
  )
  return (
    <div className={themes.frame} onClick={onOpen}>
      <div className={themes.view}>
        {props.label && <div className={themes.label}>{props.label}</div>}
        <div {...customProps} onChange={undefined}>
          <Image
            dir={CustomIconNames.CALENDAR}
            width={22}
            height={22}
            className={themes.icon}
          />
          <div>
            <RenderIf
              reference={INITIAL === current}
              render={() => EMPTY}
              reverse={current.toLocaleDateString(FORMAT_VIETNAM)}
            ></RenderIf>
          </div>
        </div>
      </div>

      <RenderIf
        reference={active}
        render={() => (
          <div className={themes.overlay}>
            <div
              className={themes.wrapper}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={themes.action}>
                <div className={themes.button} onClick={previous}>
                  <Image
                    width={12}
                    height={12}
                    dir={CustomIconNames.PREVIOUS}
                  />
                </div>
                <Content>
                  {monthNames[month]}, {year}
                </Content>
                <div onClick={next} className={themes.button}>
                  <Image width={12} height={12} dir={CustomIconNames.NEXT} />
                </div>
              </div>
              <ul className={themes.element}>
                {days.map((item, index) => (
                  <li key={index} className={themes.title}>
                    {item.toLocaleDateString(FORMAT_VIETNAM, {
                      weekday: FORMAT_WEEKDAY,
                    })}
                  </li>
                ))}
              </ul>
              <ul className={themes.element}>
                {dateOfMonth.map((item, index) => (
                  <li className={themes.item} key={index}>
                    <div
                      onClick={() => onChange(item)}
                      className={themes.content}
                    >
                      {item.getDate()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      />

      <RenderIf
        reference={props.validated === OFF && props.error}
        render={() => <span className={themes.message}>{props.error}</span>}
      ></RenderIf>
    </div>
  )
}

export default Calendar
