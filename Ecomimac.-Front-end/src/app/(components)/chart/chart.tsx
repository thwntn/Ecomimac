"use client"

import Content from "../content"

export interface IImport {
  name: string
  value: string | number
  contentValue?: string
}

interface IRender extends IImport {
  percent: number
}

interface IPorps {
  data: IImport[]
}

const Chart = (props: IPorps) => {
  const height = 356
  const totalSum = props.data.reduce(
    (sum, current) => sum + Number(current.value),
    0
  )
  const mapped: IRender[] = props.data.map((item) => ({
    ...item,
    percent: (Number(item.value) / totalSum) * 100,
  }))
  return (
    <div className="p-[8px]">
      <div
        className="flex flex-col gap-8 p-4 overflow-auto pb-[24px]"
        style={{ height: height }}
      >
        <ul className="flex relative w-full gap-8 items-end h-full">
          <ul className="absolute bottom-0 left-0 right-0 h-full">
            {Array.from({ length: 10 }).map((_item, index) => (
              <li
                key={index}
                style={{ height: `10%` }}
                className="w-full border-b border-dashed"
              ></li>
            ))}
          </ul>
          {mapped.map((item, index) => (
            <li
              key={index}
              className="flex relative items-center flex-col gap-2 z-10"
            >
              <div className="text text-sm">
                {item.contentValue ?? item.value}
              </div>
              <Content>{Math.floor(item.percent)}%</Content>
              <div
                className="bg-[#28a99c]"
                style={{
                  height: (item.percent / 100) * height,
                  width: 24,
                }}
              ></div>
              {/* <Content className="text-sm top-[calc(100%+4px)] absolute text-center w-[48px] whitespace-nowrap">
                {item.name}
              </Content> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center w-full">Analyst cost (group by created) tháng 5/2024</div>
    </div>
  )
}

export default Chart
