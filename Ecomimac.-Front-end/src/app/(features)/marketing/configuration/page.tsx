"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Configuration = dynamic(() => import("./Configuration"))

const Page = () => {
  return <System render={<Configuration />}></System>
}

export default Page
