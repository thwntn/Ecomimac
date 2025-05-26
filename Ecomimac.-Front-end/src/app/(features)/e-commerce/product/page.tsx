"use client"

import dynamic from "next/dynamic"
import System from "@/app/(layout)/system"
const Product = dynamic(() => import("./Product"))

const Page = () => {
  return <System render={<Product></Product>} />
}

export default Page
