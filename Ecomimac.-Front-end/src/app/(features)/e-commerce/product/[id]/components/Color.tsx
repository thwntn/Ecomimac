import Title from "@/app/(components)/title"
import clsx from "clsx"
import { useState } from "react"

const data = [
  {
    label: "Lục",
    color: "#4287f5",
  },
  {
    label: "Đỏ",
    color: "#fc3841",
  },
  {
    label: "Xanh",
    color: "#5fd92b",
  },
  {
    label: "Tím",
    color: "#8b20e8",
  },
]

const Color = () => {
  const [selected, update] = useState<string>()
  console.log(selected)

  return (
    <div className="flex flex-col gap-[16px]">
      <Title>Màu sắc sản phẩm</Title>
      <ul className="flex gap-[8px]">
        {data.map((item, index) => (
          <li key={index} className="p-[1px] border rounded-full">
            <div
              onClick={() => update(item.color)}
              style={{
                background: item.color,
                opacity: item.color === selected ? 1 : 1 / 4,
              }}
              className="p-[8px] rounded-full border w-[32px] flex justify-center h-[32px] items-center text-[16px] cursor-pointer"
            ></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Color
