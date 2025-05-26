"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Content = dynamic(() => import("./Content"))

const Page = () => {
  return <System render={<Content />}></System>
}

export default Page
