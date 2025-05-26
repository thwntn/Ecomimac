import { Fragment, ReactNode, useEffect, useState } from "react"
import Pagination from "../pagination"
import themes from "./index.module.scss"
import Checkbox from "../checkbox"
import Column from "./column"
import Actions, { ActionFunction } from "./action"
import { CustomIconNames, OFF, ON, Status, convert } from "../common"
import RenderIf from "../render-if"
import Image from "../image"
import clsx from "clsx"

const PADDING = 12
const getLayout = (columns: unknown[] | undefined) =>
  `repeat(${columns ? columns.length : 1}, minmax(0, 1fr))`

export interface IPage {
  onChange: (page: number, limit: number) => void
  current: number
  total: number
  limit: number
}

export interface List<T> {
  total: number
  items: T[]
  selected: T[]
  search: (content: string) => void
  status: (item: T) => boolean
}

const List = function <T>({
  multiple,
  column,
  each,
  items,
  action,
  page,
  fit,
  onClick,
  silent,
}: {
  each: (item: T) => ReactNode
  onClick?: (item: T) => void
  items: T[]

  action?: ActionFunction<T>
  multiple?: ActionFunction<T>

  column?: string[]
  page?: IPage

  fit?: boolean
  silent?: boolean
}) {
  const [selected, setSelect] = useState<Array<T>>([])

  const onSelect = function (select: T, status: boolean) {
    if (status === false) {
      setSelect(selected.filter((item) => item !== select))
      return
    }
    const exist = selected.find((item) => item === select)
    if (exist) return

    setSelect((previous) => [previous, select].flatMap((item) => item))
  }

  const tick = (select: boolean) => setSelect(select === true ? items : [])
  const status = (item: T) =>
    selected.find((element) => element === item) ? true : false

  const itemClick = (item: T) => onClick && onClick(item)
  useEffect(() => setSelect([]), [items])

  return (
    <div className={themes.frame}>
      <RenderIf
        reference={column}
        render={(column) => (
          <Column
            silent={silent}
            selected={selected}
            checked={convert(items.length === selected.length)}
            onCheck={tick}
            column={column}
            fit={fit}
            multiple={multiple}
            action={action}
          ></Column>
        )}
      ></RenderIf>

      <div className={themes.table}>
        <ul className={themes.items}>
          {items.length === 0 && (
            <li className={themes.empty}>
              <Image width={100} height={100} dir={CustomIconNames.EMPTY} />
              <span className={themes.text}>Không có dữ liệu</span>
            </li>
          )}
          {items.map(each).map((item, index) => {
            const current = items[index]
            return (
              <li
                onClick={() => itemClick(items[index])}
                className={clsx(themes.recordFrame, {
                  [themes.noColumn]: column === undefined,
                })}
                key={index}
              >
                <RenderIf
                  reference={
                    silent === undefined && (column === undefined) === false
                  }
                  render={() => (
                    <div
                      className={themes.checkbox}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Checkbox
                        checked={convert(status(current))}
                        onCheck={(status) => onSelect(current, status)}
                      ></Checkbox>
                    </div>
                  )}
                ></RenderIf>
                <div
                  className={clsx(themes.record, {
                    [themes.noColumn]: column === undefined,
                  })}
                  style={{
                    paddingLeft: silent || column === undefined ? 0 : PADDING,
                    gridTemplateColumns: getLayout(column),
                  }}
                >
                  {item}
                </div>
                {action && (
                  <Actions current={current} action={action}></Actions>
                )}
              </li>
            )
          })}
        </ul>

        <RenderIf
          reference={page}
          render={(data) => {
            if (data.total === 0) return
            return (
              <div className={themes.pagination}>
                <Pagination
                  onChange={(event) => data.onChange(event, data.limit)}
                  current={data.current}
                  total={data.total}
                ></Pagination>
              </div>
            )
          }}
        ></RenderIf>
      </div>
    </div>
  )
}

export default List
