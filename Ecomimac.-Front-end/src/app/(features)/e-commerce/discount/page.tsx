"use client"

import dynamic from "next/dynamic"
import System from "@/app/(layout)/system"
const Discount = dynamic(() => import("./Discount"))

const Page = () => {
  return <System render={<Discount />} />
}

export default Page
