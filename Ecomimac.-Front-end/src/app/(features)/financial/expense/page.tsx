"use client"

import System from "@/app/(layout)/system"
import dynamic from "next/dynamic"
const Expense = dynamic(() => import("./Expense"))

const Page = () => {
  return <System render={<Expense />} />
}

export default Page
