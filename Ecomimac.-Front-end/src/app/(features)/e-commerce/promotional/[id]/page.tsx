"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Promotion = dynamic(() => import("./Promotion"))

const Page = () => {
  return <System render={<Promotion />}></System>
}

export default Page
