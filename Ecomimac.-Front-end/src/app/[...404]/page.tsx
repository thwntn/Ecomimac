"use client"

import Root from "@/app/(layout)/root"
import NotFound from "./404.render"

const Page = () => {
  return <Root render={<NotFound />} />
}

export default Page
