import { ON, Status, convert } from "@/app/(components)/common"
import themes from "./index.module.scss"
import clsx from "clsx"
import { Fragment } from "react"
import Checkbox from "@/app/(components)/checkbox"
import Icon from "@/app/(components)/icon"
import RenderIf from "@/app/(components)/render-if"
import { ActionFunction } from "../action"
import Row from "@/app/(components)/row"

const PADDING = 12

const Column = function <T>({
  onCheck,
  fit,
  column,
  checked,
  action,
  multiple,
  silent,
  selected,
}: {
  onCheck: (status: boolean) => void
  fit: boolean | undefined
  column: string[]
  checked: Status

  action: ActionFunction<T> | undefined
  multiple: ActionFunction<T> | undefined

  silent: boolean | undefined
  selected: T[]
}) {
  return (
    <div
      className={clsx(themes.frame, {
        [themes.withSelect]: selected.length > 0,
      })}
    >
      <RenderIf
        reference={silent === undefined}
        render={() => (
          <div
            className={themes.checkbox}
            onClick={(event) => event.stopPropagation()}
          >
            <Checkbox checked={checked} onCheck={onCheck}></Checkbox>
          </div>
        )}
      ></RenderIf>

      <RenderIf
        reference={selected.length === 0}
        render={() => (
          <Fragment>
            <ul
              className={themes.column}
              style={{
                paddingLeft: silent ? 0 : PADDING,
                gridTemplateColumns: `repeat(${column.length}, minmax(0, 1fr))`,
              }}
            >
              {column.map((item, index) => (
                <li
                  key={index}
                  style={{ WebkitLineClamp: 1 }}
                  className={clsx(themes.underline, {
                    [themes.centerRight]: index === column.length - 1 && fit,
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
            {action === undefined || <div className={themes.action}></div>}
          </Fragment>
        )}
      ></RenderIf>

      <RenderIf
        reference={selected.length > 0}
        render={() => (
          <div className={themes.selected}>
            <div>{selected.length}&nbsp;Đã chọn</div>
            <Row size={0.1}>
              <RenderIf
                reference={multiple}
                render={(multiple) => multiple.map((item) => item(selected))}
              ></RenderIf>
            </Row>
          </div>
        )}
      ></RenderIf>
    </div>
  )
}

export default Column
