import { HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLParagraphElement> {}

const Paragraph = (props: IProps) => {
  const customProps = Object.assign({}, props)
  return <p {...customProps}>{props.children}</p>
}

export default Paragraph
