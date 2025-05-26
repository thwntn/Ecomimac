import Title from "@/app/(components)/title"
import clsx from "clsx"
import { useState } from "react"

const data = ["M", "L", "XL", "XXL"]

const Size = () => {
  const [selected, update] = useState<string>()
  return (
    <div className="flex flex-col gap-[16px]">
      <Title>Kích thước sản phẩm</Title>
      <ul className="flex gap-[8px]">
        {data.map((item, index) => (
          <li
            onClick={() => update(item)}
            className={clsx(
              "p-[8px] rounded-[8px] border w-[48px] flex justify-center h-[40px] items-center text-[16px] cursor-pointer",
              { "text-white bg-blue-400": item === selected }
            )}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Size
