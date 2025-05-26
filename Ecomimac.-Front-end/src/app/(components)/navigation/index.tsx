import Column from "@/app/(components)/column"
import { ReactNode } from "react"

const Navigation = ({ children }: { children: ReactNode }) => {
  return (
    <Column
      gap={16}
      justifyStart
      className="max-w-[286px] sticky top-[0px] h-[calc(100vh-58px)] overflow-auto p-[12px] border-l border-l-slate-100"
    >
      {children}
    </Column>
  )
}

export default Navigation
