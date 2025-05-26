"use client"

import dynamic from "next/dynamic"
import System from "@/app/(layout)/system"
const Customer = dynamic(() => import("./Customer"))

const Page = () => {
  return <System render={<Customer />} />
}

export default Page
