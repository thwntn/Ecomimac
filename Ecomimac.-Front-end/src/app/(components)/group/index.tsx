import { useState } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"
import Image from "../image"

interface IGroup {
  value: string | number
  label: string
  icon?: string
}

interface IProps {
  onChange?: (item: IGroup) => void
  items: IGroup[]
}

const Group = (props: IProps) => {
  const [active, update] = useState(0)

  const onChange = function (item: IGroup, index: number) {
    props.onChange && props.onChange(item)
    update(index)
  }

  return (
    <ul className={themes.frame}>
      {props.items.map((item, index) => (
        <li
          onClick={() => onChange(item, index)}
          className={clsx(themes.item, { [themes.active]: active === index })}
          key={index}
        >
          {item.icon && <Image dir={item.icon} width={16} height={16}></Image>}
          {item.label}
        </li>
      ))}
    </ul>
  )
}

export default Group
