"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Data = dynamic(() => import("./Data"))

const Page = () => {
  return <System render={<Data></Data>}></System>
}

export default Page
