"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"

const Information = dynamic(() => import("./Information"))

const Page = () => {
  return <System render={<Information></Information>}></System>
}

export default Page
