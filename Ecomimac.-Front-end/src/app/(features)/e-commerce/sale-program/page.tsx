"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const SaleProgram = dynamic(() => import("./SaleProgram"))

const Page = () => {
  return <System render={<SaleProgram></SaleProgram>}></System>
}

export default Page
