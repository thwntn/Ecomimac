"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Send = dynamic(() => import("./Send"))

const Page = () => {
  return <System render={<Send></Send>}></System>
}

export default Page
