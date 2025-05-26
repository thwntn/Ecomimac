import { useCallback, useRef } from "react"
import themes from "./index.module.scss"
import "./index.scss"
import Icon from "@/app/(components)/icon"
import { CustomIconNames, ON, Status } from "@/app/(components)/common"
import Row from "@/app/(components)/row"
import RenderIf from "@/app/(components)/render-if"
import clsx from "clsx"
import { useEffectOnce } from "@/utils/hooks"

const EMPTY = "Nội dung mới"
const SPACE = " "

const CLASS = {
  EDITOR_TABLE: "editor__table",
  ITEM_TABLE: "table__item",
  EDITOR_TITLE: "editor__title",
  EDITOR_LIST: "editor__list",
  ITEM_LIST: "list__item",
}

const ELEMENT = {
  DIV: "div",
  UL: "ul",
  LI: "li",
}

const Editable = ({
  onChange,
  staticMode,
  htmlContent,
}: {
  staticMode: undefined | Status
  onChange?: (contentHTML: string) => void
  htmlContent?: string
}) => {
  const reference = useRef<HTMLDivElement>(null)
  const staticActive = staticMode === ON

  const onKeyUp = useCallback(() => {
    if (!reference.current) return
    const target = reference.current as EventTarget & HTMLDivElement
    if (onChange) onChange(target.innerHTML)
    target.focus()
  }, [])

  const addTable = () => {
    const column = Array.from({ length: 2 })
    if (!reference.current) return

    const element = window.document.createElement(ELEMENT.DIV)
    element.className = CLASS.EDITOR_TABLE
    element.style.gridTemplateColumns = column
      .map(() => 100 / column.length + "%")
      .join(SPACE)

    // Add children
    column.forEach((item) => {
      const child = document.createElement(ELEMENT.DIV)
      child.className = CLASS.ITEM_TABLE
      child.innerText = EMPTY
      element.appendChild(child)
    })

    reference.current.appendChild(element)
  }

  const addTitle = () => {
    if (!reference.current) return

    const element = window.document.createElement(ELEMENT.DIV)
    element.className = CLASS.EDITOR_TITLE
    element.innerHTML = EMPTY

    reference.current.appendChild(element)
  }

  const addList = () => {
    if (!reference.current) return

    const element = window.document.createElement(ELEMENT.UL)
    element.className = CLASS.EDITOR_LIST

    const child = document.createElement(ELEMENT.LI)
    child.className = CLASS.ITEM_LIST
    child.innerText = EMPTY
    element.appendChild(child)

    reference.current.appendChild(element)
  }

  const addContent = () => {
    if (!reference.current) return
    const element = window.document.createElement(ELEMENT.UL)
    element.innerText = EMPTY
    reference.current.appendChild(element)
  }

  useEffectOnce(() => {
    // Initial html content
    if (!reference.current) return
    reference.current.innerHTML = htmlContent ? String(htmlContent) : String()
  })

  return (
    <div className={clsx(themes.frame, { [themes.staticMode]: staticActive })}>
      <RenderIf
        reference={staticActive === false}
        render={() => (
          <Row gap={16} onClick={onKeyUp}>
            <Icon dir={CustomIconNames.CONTENT} onClick={addContent}></Icon>
            <Icon dir={CustomIconNames.GRID} onClick={addTable}></Icon>
            <Icon dir={CustomIconNames.TITLE} onClick={addTitle}></Icon>
            <Icon dir={CustomIconNames.LIST} onClick={addList}></Icon>
          </Row>
        )}
      ></RenderIf>
      <div
        ref={reference}
        onMouseUp={getSelection}
        className={themes.editor}
        contentEditable={staticActive === false}
        onKeyUp={onKeyUp}
      ></div>
    </div>
  )
}

export default Editable
