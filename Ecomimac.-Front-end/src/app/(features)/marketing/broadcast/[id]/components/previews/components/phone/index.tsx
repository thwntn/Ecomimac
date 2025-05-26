import Popup from "@/app/(components)/popup"
import themes from "./index.module.scss"
import { ReactNode } from "react"

interface IProps {
  onExit: VoidFunction
  children: ReactNode
}

const Phone = (props: IProps) => {
  return (
    <Popup width={412} onExit={props.onExit} className={themes.frame}>
      <div className={themes.phone}>
        <div className={themes.dynamic}></div>
        <div className={themes.bar}></div>
        <div className={themes.content}> {props.children}</div>
      </div>
    </Popup>
  )
}

export default Phone
