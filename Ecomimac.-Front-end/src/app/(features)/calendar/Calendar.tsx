import { Dispatch, SetStateAction, useState } from "react"
import Image from "@/app/(components)/image"
import themes from "./index.module.scss"
import { CustomIconNames, ON } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Wrapper from "@/app/(components)/wrapper"
import Title from "@/app/(components)/title"

export interface CalendarState {
  update: Dispatch<SetStateAction<boolean>>
  onChange: (date: Date) => void
  previous: VoidFunction
  dateOfMonth: Date[]
  next: VoidFunction
  active: boolean
  current: Date
  month: number
  days: Date[]
  year: number
}

export const monthNames = Array.from({ length: 11 }).map(
  (_disable, index) => `Tháng ${index + 1}`
)

const Calendar = () => {
  const [active, update] = useState(false)
  const [current, updateCurrent] = useState<Date>(new Date())
  const month = current.getMonth()
  const year = current.getFullYear()

  const startDate = new Date(year, month, 1).getDate()
  const endDate = new Date(year, month + 1, 0).getDate() + 1

  const dateOfMonth = Array.from({ length: endDate - startDate }).map(
    (_item, index) => new Date(year, month, index + 1)
  )

  const next = function () {
    const date = new Date(current)

    date.setMonth(current.getMonth() + 1)
    updateCurrent(date)
  }

  const previous = function () {
    const date = new Date(current)

    date.setMonth(current.getMonth() - 1)
    updateCurrent(date)
  }

  const onChange = function (date: Date) {
    updateCurrent(date)
    update(false)
  }

  const days = Array.from(dateOfMonth)
  days.length = 6

  return (
    <Frame>
      <Row justifyBetween>
        <Container />
        <Button main icon="icon/create-light.svg">
          Thêm sự kiện
        </Button>
      </Row>
      <Row gap={24}>
        <Column size={8}>
          <div
            className={themes.frame}
            onClick={() => update((previous) => previous === false)}
          >
            <div className={themes.overlay}>
              <div
                className={themes.wrapper}
                onClick={(event) => event.stopPropagation()}
              >
                <div className={themes.action}>
                  <Image
                    onClick={previous}
                    width={18}
                    height={18}
                    className={themes.button}
                    dir={CustomIconNames.PREVIOUS}
                  />
                  <Content>
                    {monthNames[month]}, {year}
                  </Content>
                  <Image
                    onClick={next}
                    width={18}
                    height={18}
                    className={themes.button}
                    dir={CustomIconNames.NEXT}
                  />
                </div>
                <ul className={themes.element}>
                  {days.map((item, index) => (
                    <li key={index} className={themes.title}>
                      {item.toLocaleDateString("vi", { weekday: "long" })}
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
          </div>
        </Column>
        <Column size={4}>
          <Wrapper>
            <Title icon="icon/copy.svg">Sự kiện gần đây</Title>
          </Wrapper>
        </Column>
      </Row>
    </Frame>
  )
}

export default Calendar
