import { ReactNode } from "react"
import themes from "./index.module.scss"
import Row from "@/app/(components)/row"
import Image from "@/app/(components)/image"
import Content from "@/app/(components)/content"

const Root = ({ render }: { render: ReactNode }) => {
  return (
    <div className={themes.frame}>
      <Row padding={12} className="absolute bg-[#ffffff86] top-0 z-10 w-full">
        <Row itemsCenter gap={8}>
          <Image dir="icon/main.logo.svg" width={48} height={48}></Image>
          <Content>Titan.co</Content>
        </Row>
      </Row>
      {render}
    </div>
  )
}

export default Root
