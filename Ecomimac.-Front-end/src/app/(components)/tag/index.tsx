import Description from "../description"
import RenderIf from "../render-if"

export interface TagInformation {
  color: string
  name: string
}

const Tag = ({ items, wrap }: { items: TagInformation[]; wrap?: boolean }) => {
  return (
    <div
      className="flex gap-[4px] overflow-auto max-h-[44px]"
      style={{ flexWrap: wrap ? "wrap" : "nowrap" }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="py-[4px] px-[12px] text-nowrap text-[12px] border font-[Medium] border-gray-100 rounded-full"
          style={{ color: item.color, background: "#f7f7f7" }}
        >
          @ {item.name}
        </div>
      ))}

      <RenderIf
        reference={items.length === 0}
        render={() => <Description>@ Không có thẻ được gắn</Description>}
      ></RenderIf>
    </div>
  )
}

export default Tag
