import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import themes from "./index.module.scss"
import { OFF, Properties, Status } from "../common/Types"
import clsx from "clsx"
import Image from "../image"
import RenderIf from "../render-if"
import Input from "../input"
const HINT = "Mặc định"
const INPUT = "Tìm kiếm..."
const ELEMENT = 50

interface IProps<T> extends Properties {
  each: (item: T, index?: number) => ReactNode
  onChange?: (item: T) => void
  show?: (item: T) => string
  validated?: Status
  label: string
  error?: string
  reference?: T
  items: T[]
}

const Dropdown = function <T>(props: IProps<T>) {
  const reference = useRef<HTMLButtonElement>(null)
  const [page, updatePage] = useState<number>(1)
  const [current, updateCurrent] = useState<T>(Object(props.reference))
  const [search, updateSearch] = useState<string | null>(null)
  const render = props.show ? props.show : props.each

  const customProps = {
    ...props,
    onChange: undefined,
    reference: undefined,
    each: undefined,
    show: undefined,
  }
  customProps.className = clsx(props.className, themes.view)

  const onSelect = function (item: T) {
    props.onChange && props.onChange(item)
    updateCurrent(item)
    // Turn off
    if (reference.current) reference.current.blur()
  }

  const getElements = useCallback(() => {
    const clone = Array.from(props.items)
    const elements = search
      ? clone.filter(
          (item) =>
            props.show &&
            props.show(item).toLowerCase().includes(`${search}`.toLowerCase())
        )
      : clone

    elements.length = page * ELEMENT
    return elements
  }, [props.items, page, search])

  const elements = getElements()

  //
  //  Summary:
  //      Update state data reference
  //
  //  Returns:
  //
  useEffect(() => updateCurrent(Object(props.reference)), [props.reference])
  return (
    <button className={themes.frame} ref={reference}>
      <div {...customProps}>
        {props.label && <div className={themes.label}>{props.label}</div>}
        <div className={themes.trigger} onChange={undefined}>
          {render(current) || HINT}
        </div>
        <Image
          width={16}
          height={16}
          dir="custom/up-down.svg"
          className={themes.upDown}
        ></Image>
      </div>
      <div className={themes.wrapper}>
        <input
          onChange={(event) => updateSearch(event.target.value)}
          className={themes.input}
          placeholder={INPUT}
        />
        <ul className={themes.list}>
          {elements.map(props.each).map((item, index) => (
            <li
              key={index}
              className={themes.item}
              onClick={() => onSelect(elements[index])}
            >
              {item}
            </li>
          ))}
          {props.items.length > page * ELEMENT && (
            <li className={themes.more}>
              <span
                onClick={() => updatePage((previous) => previous + 1)}
                className={themes.moreButton}
              >
                More
              </span>
            </li>
          )}
        </ul>
      </div>
      {props.validated === OFF && props.error && (
        <span className={themes.message}>{props.error}</span>
      )}
    </button>
  )
}

export default Dropdown
