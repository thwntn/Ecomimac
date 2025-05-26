import { MutableRefObject, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

export type ReferencePrint = HTMLDivElement | null

export interface IPrintElement {
  reference: MutableRefObject<ReferencePrint>
  print: VoidFunction
}

export const usePrintElement = (): IPrintElement => {
  const reference = useRef<ReferencePrint>(null)

  const print = useReactToPrint({
    content: () => reference.current,
  })

  return { print, reference }
}
