"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Create = dynamic(() => import("./Create"))

const Page = () => {
  return <System render={<Create />}></System>
}

export default Page
