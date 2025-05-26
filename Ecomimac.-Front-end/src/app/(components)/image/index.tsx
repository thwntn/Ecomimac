import clsx from "clsx"
import { Properties } from "../common/Types"
import themes from "./index.module.scss"
const PATH = "/asset/"
const URL = "url(__HOST__)"
const MAP = "__HOST__"

const createHost = ({
  src,
  dir,
}: {
  src: string | undefined
  dir: string | undefined
}) => {
  switch (true) {
    case src === undefined && dir !== undefined:
      return URL.replace(MAP, process.env.NEXT_PUBLIC_HOST + PATH + dir)

    case src !== undefined && dir === undefined:
      return URL.replace(MAP, src)
  }
  return
}

interface IProps extends Properties {
  onClick?: VoidFunction
  height: number | string
  width: number | string
  src?: string
  dir?: string
}

const Image = (props: IProps) => {
  const imageProps = {
    ...props,
    className: clsx(props.className, themes.frame),
    style: {
      backgroundImage: createHost({ src: props.src, dir: props.dir }),
      minWidth: props.width,
      minHeight: props.height,
    },
  }
  delete imageProps.src
  return <div {...imageProps}></div>
}

export default Image
