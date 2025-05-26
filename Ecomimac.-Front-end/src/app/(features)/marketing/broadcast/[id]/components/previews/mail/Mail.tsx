import Column from "@/app/(components)/column"
import IFrame from "@/app/(components)/iframe"
import { useEffectOnce } from "@/utils/hooks"
import { useEffect, useRef, useState } from "react"
const EVENT_LOAD = "load"

interface IProps {
  htmlText: string
}

const MailPreview = (props: IProps) => {
  return (
    <Column gap={24} justifyCenter itemsCenter>
      <div className="w-full overflow-hidden rounded-[12px] border border-gray-200 border-dashed">
        <IFrame html={props.htmlText} />
      </div>
    </Column>
  )
}

export default MailPreview
