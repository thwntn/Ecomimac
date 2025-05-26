import { ReactNode } from "react"

type Main<T> = T | null | undefined

//
//  Summary:
//    Define props component
//
//  Returns:
//
interface IProps<T> {
  //
  //  Summary:
  //    Main function render with justifiable data
  //
  //  Returns:
  //      ReactNode
  //f
  render: (data: T) => ReactNode
  //
  //
  //
  //
  trigger?: boolean
  //
  //
  //
  //
  reference: Main<T>
  //
  //
  //
  //
  reverse?: ReactNode
}

//
//
//
//
//
//
const RenderIf = function <T>({ trigger = true, ...props }: IProps<T>) {
  if (props.reference && trigger) return props.render(props.reference)
  return props.reverse
}

export default RenderIf
