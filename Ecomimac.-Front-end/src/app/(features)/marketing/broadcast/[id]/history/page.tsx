"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const History = dynamic(() => import("./History"))

const Page = () => {
  return <System render={<History></History>}></System>
}

export default Page
