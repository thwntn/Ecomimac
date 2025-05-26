import clsx from "clsx"
import themes from "./index.module.scss"

const Switch = () => {
  return (
    <label className={themes.switch}>
      <input type="checkbox" className={themes.input} />
      <span className={clsx(themes.slider, themes.round)}></span>
    </label>
  )
}

export default Switch
