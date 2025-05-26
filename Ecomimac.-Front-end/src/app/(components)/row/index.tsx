import clsx from "clsx"
import themes from "./index.module.scss"
import { ON, Properties } from "../common"

const ROW_SIZE = 12
const getColumn = (weigh: number | undefined) => {
  if (weigh === undefined) return weigh
  return `span ${weigh} / span ${weigh}`
}

interface IProps extends Properties {
  itemsCenter?: boolean
  itemsStart?: boolean
  itemsEnd?: boolean
  ///
  justifyBetween?: boolean
  justifyCenter?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  ///
  weigh?: number
  padding?: number
  fitContent?: boolean
  size?: number
  gap?: number
}

const Row = (props: IProps) => {
  const customProps = Object.assign({}, props)

  customProps.className = clsx(props.className, themes.frame, {
    [themes.itemsStart]: props.itemsStart,
    [themes.itemsCenter]: props.itemsCenter,
    [themes.itemsEnd]: props.itemsEnd,
    ///
    [themes.justifyBetween]: props.justifyBetween,
    [themes.justifyCenter]: props.justifyCenter,
    [themes.justifyStart]: props.justifyStart,
    [themes.justifyEnd]: props.justifyEnd,
    ///
    [themes.fitContent]: props.fitContent,
  })

  customProps.style = {
    ...props.style,
    padding: props.padding,
    gap: props.gap,
    flex: props.size ? props.size / ROW_SIZE : 1,
    gridColumn: getColumn(props.weigh),
  }

  delete customProps.justifyBetween
  delete customProps.justifyStart
  delete customProps.justifyCenter
  delete customProps.justifyEnd
  delete customProps.itemsCenter
  delete customProps.itemsStart
  delete customProps.itemsEnd
  delete customProps.weigh

  return <div {...customProps}>{props.children}</div>
}

export default Row
