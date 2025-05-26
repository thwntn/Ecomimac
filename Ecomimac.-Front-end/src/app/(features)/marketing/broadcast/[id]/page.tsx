"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Setup = dynamic(() => import("./Setup"))

const Page = () => {
  return <System render={<Setup />}></System>
}

export default Page
