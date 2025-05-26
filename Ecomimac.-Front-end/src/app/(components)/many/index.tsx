import { ReactNode, useState } from "react"
import Input from "../input"
import RenderIf from "../render-if"
import Column from "../column"
import Content from "../content"
import Description from "../description"
import Image from "../image"
import themes from "./index.module.scss"
import { OFF, Status } from "../common"

interface ExtendId {
  id: string
}

interface IProps<T> {
  error?: string
  validated?: Status
  items: T[]
  each?: (item: T, index: number) => ReactNode
  onChange: (item: T[]) => void
  values?: Array<T & ExtendId>
}

const Many = function <T>({
  error,
  items,
  each,
  validated,
  onChange,
  values,
}: IProps<T & ExtendId>) {
  const [selected, set] = useState<Array<T & ExtendId>>(values || [])

  const onSelect = (item: T & ExtendId) => {
    set((previous) => previous.concat(item))
    onChange(selected.concat(item))
  }

  const onRemove = (item: T & ExtendId) => {
    const without = selected.filter(
      (element) => (element.id === item.id) === false
    )
    set(without)
    onChange(without)
  }

  const getList = () =>
    items.filter(
      (item) => selected.find((select) => select.id === item.id) === undefined
    )

  const render = getList()
  return (
    <div className="relative flex flex-1 flex-col gap-[16px] bg-[#6688980e] p-[8px] rounded-[8px]">
      <Column gap={8}>
        <div className="flex flex-wrap gap-[8px]">
          <RenderIf
            reference={selected.length === 0}
            render={() => (
              <Column>
                <Content>Chưa chọn phần tử nào</Content>
                <Description>Vui lòng chọn từ danh sách phía dưới</Description>
              </Column>
            )}
          ></RenderIf>

          <RenderIf
            reference={each}
            render={(each) =>
              selected.map(each).map((element, index) => (
                <div
                  key={index}
                  className="flex relative bg-white p-[12px] min-w-[86px] justify-center rounded-[8px] border border-slate-300"
                >
                  <div
                    onClick={() => onRemove(selected[index])}
                    className="absolute cursor-pointer p-[4px] top-[-6px] right-[-6px] flex justify-center items-center bg-white shadow-sm w-[20px] h-[20px] rounded-full"
                  >
                    <Image
                      dir="custom/close.svg"
                      width={12}
                      height={12}
                    ></Image>
                  </div>
                  {element}
                </div>
              ))
            }
          ></RenderIf>
        </div>
      </Column>
      <div className="w-full border-b"></div>
      <div className="flex-col flex gap-[16px]">
        <Input label="Tìm kiếm" placeholder="Thông tin, phần tử"></Input>
        <RenderIf
          reference={(items.length === selected.length) === false}
          render={() => (
            <div className="flex flex-wrap gap-[8px]">
              <RenderIf
                reference={each}
                render={(each) =>
                  render.map(each).map((element, index) => (
                    <div
                      key={index}
                      onClick={() => onSelect(render[index])}
                      className="flex relative min-w-[86px] justify-center bg-white hover:bg-slate-200 p-[12px] rounded-[8px] cursor-pointer"
                    >
                      {element}
                    </div>
                  ))
                }
              ></RenderIf>
            </div>
          )}
        ></RenderIf>
        <RenderIf
          reference={selected.length === items.length}
          render={() => (
            <div className="text-center">Đã chọn hết danh sách</div>
          )}
        ></RenderIf>
      </div>

      <RenderIf
        reference={validated === OFF && error}
        render={() => <span className={themes.message}>{error}</span>}
      ></RenderIf>
    </div>
  )
}

export default Many
