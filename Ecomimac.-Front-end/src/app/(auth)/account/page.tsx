"use client"

import Root from "@/app/(layout)/root"
import dynamic from "next/dynamic"
const Account = dynamic(() => import("./Account"))

const Page = () => {
  return <Root render={<Account></Account>}></Root>
}

export default Page
