"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Overview = dynamic(() => import("./Overview"))

const Page = () => {
  return <System render={<Overview />} />
}

export default Page
