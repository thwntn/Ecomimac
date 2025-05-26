import { useEffect, useRef, useState } from "react"
import { Properties } from "../common"
import themes from "./index.module.scss"
import clsx from "clsx"
const EVENT_LOAD = "load"
const NO_SCROLL = "no"

interface IProps extends Properties {
  html: string
}

const IFrame = (props: IProps) => {
  const reference = useRef<HTMLIFrameElement>(null)
  const [height, set] = useState(0)

  const customProps = Object.assign({}, props)
  customProps.className = clsx(props.className, themes.frame)

  const render = (iframe: HTMLIFrameElement) => {
    const iframeDoc = iframe.contentDocument
    if (iframeDoc === null) return
    set(iframeDoc.body.scrollHeight)
  }

  useEffect(() => {
    const iframe = reference.current
    if (iframe === null) return
    iframe.addEventListener(EVENT_LOAD, () => render(iframe))
    return () => iframe.removeEventListener(EVENT_LOAD, () => render(iframe))
  }, [props.html])

  return (
    <div {...customProps}>
      <iframe
        scrolling={NO_SCROLL}
        style={{ height, margin: 0 }}
        srcDoc={props.html}
        className={themes.iframe}
        ref={reference}
      ></iframe>
    </div>
  )
}

export default IFrame
