"use client"

import System from "@/app/(layout)/system"
const Editor = dynamic(() => import("./Editor"))
import dynamic from "next/dynamic"

const Page = () => {
  return <System render={<Editor></Editor>}></System>
}

export default Page
