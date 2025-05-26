import { useCallback, useState } from "react"
import Content from "../content"
import themes from "./index.module.scss"
import RenderIf from "../render-if"
import Description from "../description"
import clsx from "clsx"

const DEFAULT_COLOR = "#60a5fa"
const ELEMENT = 4

const createBorder = (color: string) => `1px solid ${color}`

export interface IOptions {
  color?: string
}

export interface IProcess extends IOptions {
  description?: string
  animation?: boolean
  name: string
  time: string
}

interface IProps {
  items: IProcess[]
}

const Process = (props: IProps) => {
  const [page, updatePage] = useState<number>(1)

  const getElements = useCallback(() => {
    const clone = Array.from(props.items)

    clone.length = page * ELEMENT
    return clone
  }, [props.items, page])

  return (
    <ul className={themes.frame}>
      {getElements().map((item, index) => (
        <li className={themes.list} key={index}>
          <div className={themes.wrapper}>
            <div
              className={themes.dot}
              style={{ backgroundColor: item.color || DEFAULT_COLOR }}
            >
              <div
                className={clsx(themes.circle, {
                  [themes.animation]: item.animation,
                })}
                style={{ border: createBorder(item.color || DEFAULT_COLOR) }}
              ></div>
            </div>
            {index != props.items.length - 1 && (
              <div
                className={themes.line}
                style={{
                  borderColor: item.color || DEFAULT_COLOR,
                  borderLeft: 2,
                  borderWidth: 2,
                }}
              ></div>
            )}
          </div>
          <div className={themes.content}>
            <Content>{item.name}</Content>
            <Description className={themes.text}>{item.time}</Description>
            <RenderIf
              reference={item.description}
              render={() => (
                <Content className={themes.text}>{item.description}</Content>
              )}
            />
          </div>
        </li>
      ))}
      {/* <li className={themes.more}>
        <div
          onClick={() => updatePage((previous) => previous + 1)}
          className={themes.moreButton}
        >
          Xem thêm
        </div>
      </li> */}
    </ul>
  )
}

export default Process
