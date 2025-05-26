"use client"

import { Fragment, ReactNode, useState } from "react"
import animations from "./index.module.scss"
import { useAccount, useEffectOnce } from "@/utils/hooks"
import "./globals.css"
import { useConnection } from "@/utils/functions"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Confirm from "@/utils/functions/confirm"
import Snackbar from "@/utils/functions/snackbar"
import Without from "@/utils/functions/without"
import Wait from "@/app/(components)/wait"
import { withStore } from "@/utils/functions/without/Without"

const getAnimation = (status: boolean) => {
  if (status) return animations.zoomIn + " ease 180ms forwards"
  return animations.zoomOut + " ease 180ms forwards"
}

const App = ({ children }: { children: ReactNode }) => {
  const without = withStore()
  const connection = useConnection()
  const [state, update] = useState<boolean>(false)

  // Summary:
  //      Create connection signalr to server
  useEffectOnce(() => {
    const account = useAccount(false)
    connection.start().then(() => connection.connect(account.profile.id))
    setTimeout(() => update(true), 820)
  })

  return (
    <Fragment>
      <RenderIf
        reference={state === false}
        render={() => <Wait></Wait>}
        reverse={
          <Row style={{ animation: getAnimation(without.beside) }}>
            {children}
          </Row>
        }
      ></RenderIf>

      <Confirm />
      <Snackbar />
      <Without />
    </Fragment>
  )
}

export default App
