import { Fragment, useEffect, useState } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"
import { CustomIconNames, Status, convert } from "../common"
import Image from "../image"

enum Setting {
  DEFAULT_SPACE = -1,
  DEFAULT_LEFT = 3,
  DEFAULT_CURRENT = 4,
  DEFAULT_RIGHT = 5,
  AUTO_LAYOUT_MIN_COUNT = 7,
}

const abstract = (value: number) => value + 1
const subtract = (value: number) => value - 1

interface IProps {
  onChange?: (page: number) => void
  current?: number
  total?: number
}

const Pagination = (props: IProps) => {
  const total = props.total ?? 10
  const [view, updateView] = useState(Setting.DEFAULT_CURRENT)
  const [current, updateCurrent] = useState(1)
  const [first, ...render] = Array.from({ length: total }).map(
    (_p, index) => index + 1
  )
  const last = render.pop() ?? total

  let [moreLeft, previous, active, next, moreRight] = [
    Setting.DEFAULT_SPACE,
    Setting.DEFAULT_LEFT,
    Setting.DEFAULT_CURRENT,
    Setting.DEFAULT_RIGHT,
    Setting.DEFAULT_SPACE,
  ]

  moreLeft =
    view - first > Setting.DEFAULT_LEFT ? Setting.DEFAULT_SPACE : first + 1
  moreRight =
    last - view > Setting.DEFAULT_LEFT ? Setting.DEFAULT_SPACE : last - 1
  active = view
  previous = subtract(view)
  next = abstract(view)

  const specialMode = last > Setting.AUTO_LAYOUT_MIN_COUNT

  const firstClick = function () {
    updateValue(1)
    updateView(Setting.DEFAULT_CURRENT)
  }

  const lastClick = function () {
    updateValue(last)
    updateView(last - Setting.DEFAULT_LEFT)
  }

  const currentClick = function () {
    updateValue(view)
  }

  const leftClick = function () {
    if (view > Setting.DEFAULT_CURRENT) updateView(subtract(view))
    updateValue(subtract(view))
  }

  const rightClick = function () {
    if (view < last - Setting.DEFAULT_LEFT) updateView(abstract(view))
    updateValue(abstract(view))
  }

  const nextClick = () => {
    if (specialMode == false && current < last) {
      updateValue(abstract(current))
      return
    }

    current > Setting.DEFAULT_LEFT &&
      last - 2 > next &&
      updateView((previous) => abstract(previous))
    current < last && updateValue(abstract(current))
  }

  const previousClick = () => {
    if (specialMode == false && current > first) {
      updateValue(subtract(current))
      return
    }

    current < abstract(view) &&
      view - first > Setting.DEFAULT_LEFT &&
      updateView((previous) => subtract(previous))
    current > first && updateValue(subtract(current))
  }

  const moreLeftClick = () => {
    updateValue(abstract(first))
  }

  const moreRightClick = () => {
    updateValue(subtract(last))
  }

  const updateValue = function (page: number) {
    props.onChange && props.onChange(page)
    updateCurrent(page)
  }

  const effect = function () {
    const current = props.current ? props.current : 1
    updateCurrent(current)

    const view =
      current < Setting.DEFAULT_CURRENT
        ? Setting.DEFAULT_CURRENT
        : current > last - Setting.DEFAULT_LEFT
        ? last - Setting.DEFAULT_LEFT
        : current
    updateView(view)
  }

  useEffect(effect, [last, props, current, total])
  return (
    <div>
      <ul className={themes.frame}>
        <li
          className={clsx(themes.item, themes.navigation, {
            [themes.disable]: current == first,
          })}
          onClick={previousClick}
        >
          <Image width={10} height={10} dir={CustomIconNames.PREVIOUS} />
        </li>
        {specialMode ? (
          <Fragment>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == first,
              })}
              onClick={firstClick}
            >
              {first}
            </li>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == subtract(Setting.DEFAULT_LEFT),
              })}
              onClick={() =>
                moreLeft === Setting.DEFAULT_SPACE || moreLeftClick()
              }
            >
              {moreLeft === Setting.DEFAULT_SPACE ? (
                <Image width={10} height={10} dir={CustomIconNames.MORE} />
              ) : (
                moreLeft
              )}
            </li>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == subtract(view),
              })}
              onClick={leftClick}
            >
              {previous}
            </li>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == view,
              })}
              onClick={currentClick}
            >
              {active}
            </li>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == abstract(view),
              })}
              onClick={rightClick}
            >
              {next}
            </li>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == subtract(last),
              })}
              onClick={() =>
                moreRight === Setting.DEFAULT_SPACE || moreRightClick()
              }
            >
              {moreRight === Setting.DEFAULT_SPACE ? (
                <Image width={10} height={10} dir={CustomIconNames.MORE} />
              ) : (
                moreRight
              )}
            </li>
            <li
              className={clsx(themes.item, {
                [themes.active]: current == last,
              })}
              onClick={lastClick}
            >
              {last}
            </li>
          </Fragment>
        ) : (
          <Fragment>
            {Array.from({ length: last }).map((item, index) => (
              <li
                className={clsx(themes.item, {
                  [themes.active]: current == index + 1,
                })}
                key={index}
                onClick={() => updateValue(abstract(index))}
              >
                {abstract(index)}
              </li>
            ))}
          </Fragment>
        )}
        <li
          className={clsx(themes.item, themes.navigation, {
            [themes.disable]: current == last,
          })}
          onClick={nextClick}
        >
          <Image width={10} height={10} dir={CustomIconNames.NEXT} />
        </li>
      </ul>
    </div>
  )
}

export default Pagination
