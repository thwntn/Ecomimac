"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Promotional = dynamic(() => import("./Promotional"))

const Page = () => {
  return <System render={<Promotional></Promotional>}></System>
}

export default Page
