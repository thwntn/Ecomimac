import { ReactNode, useState } from "react"
import themes from "./index.module.scss"
import Image from "../image"
import { CustomIconNames } from "../common"

interface IProps<T> {
  items: T[]
  each: (item: T, index: number) => ReactNode
}

const Carousel = function <T>(props: IProps<T>) {
  const [active, update] = useState<number>(0)

  const last = props.items.length - 1

  const previous = () =>
    update((previous) => (previous > 0 ? previous - 1 : last))

  const next = () => update((previous) => (previous < last ? previous + 1 : 0))

  return (
    <div className={themes.frame}>
      <div className={themes.navigation}>
        <div className={themes.action} onClick={previous}>
          <Image dir={CustomIconNames.PREVIOUS_LIGHT} width={16} height={16} />
        </div>
        <div className={themes.action} onClick={next}>
          <Image dir={CustomIconNames.NEXT_LIGHT} width={16} height={16} />
        </div>
      </div>

      {props.items.map(props.each).map(
        (item, index) =>
          active === index && (
            <div className={themes.wrapper} key={index}>
              {item}
            </div>
          )
      )}
    </div>
  )
}

export default Carousel
