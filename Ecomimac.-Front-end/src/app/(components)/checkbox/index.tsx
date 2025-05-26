import { useEffect, useState } from "react"
import themes from "./index.module.scss"
import { Status, Properties, convert } from "../common/Types"
import clsx from "clsx"

interface IProps extends Properties {
  onCheck?: (status: boolean) => void
  checked?: Status
}

const Checkbox = (props: IProps) => {
  const [checked, updateChecked] = useState<boolean>(false)
  const customProps = Object.assign({}, props)

  delete customProps.checked
  delete customProps.onCheck

  customProps.className = clsx(props.className, themes.frame)

  const onCheck = function () {
    props.onCheck && props.onCheck(checked === false)
    updateChecked((previous) => previous === false)
  }

  useEffect(
    () => updateChecked(props.checked === convert(true)),
    [props.checked]
  )
  return (
    <div {...customProps} onClick={onCheck}>
      {checked && <div className={themes.checked}></div>}
    </div>
  )
}

export default Checkbox
