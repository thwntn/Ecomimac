import { ReactNode, useState } from "react"
import themes from "./index.module.scss"
import Column from "@/app/(components)/column"
import Topbar from "../topbar"
import Row from "@/app/(components)/row"
import Navigation from "../navigation"
import { usePathname } from "next/navigation"
import RenderIf from "@/app/(components)/render-if"
import Skeleton from "@/app/(components)/skeleton"
import { refRouter } from "@/utils/functions"

const System = ({ render }: { render: ReactNode }) => {
  const pathname = usePathname()
  const [current, update] = useState(pathname)
  const router = refRouter()

  return (
    <Row>
      <Navigation
        current={current}
        onChange={(pathname) => update(pathname)}
        pathname={pathname}
      />
      <Column className={themes.frame}>
        <Topbar />
        <RenderIf
          reference={pathname === current && router.isChange === false}
          render={() => render}
          reverse={<Skeleton />}
        ></RenderIf>
      </Column>
    </Row>
  )
}

export default System
