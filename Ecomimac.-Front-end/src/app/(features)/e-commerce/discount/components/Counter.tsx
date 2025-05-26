import { RouteMap } from "@/utils/common"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { useGet } from "@/utils/hooks"
import { DiscountResponse } from "@/utils/interface"
import Tag from "@/app/(components)/tag"
const COLOR = ["#34e34b", "#ff6c47", "#4080ff"]

const Counter = () => {
  const counter = useGet<DiscountResponse[]>(
    RouteMap.DISCOUNT + "/" + RouteMap.COUNTER
  )
  return (
    <RenderIf
      reference={counter.response}
      render={(counter) => (
        <Row gap={16}>
          {counter.map((item, index) => (
            <Wrapper padding={0} key={index}>
              <div className="relative p-[16px] bg-white flex-1 gap-[24px] flex flex-col rounded-[12px]">
                <Column gap={16}>
                  <Column>
                    <Description>{item.name}</Description>
                    <div className="flex items-center gap-[8px]">
                      <span
                        className="text-[24px] font-bold uppercase"
                        style={{ color: COLOR[index] }}
                      >
                        {item.code}
                      </span>
                    </div>
                    <Description>Đã có {item.applied} lượt dùng</Description>
                  </Column>

                  <Tag
                    items={item.discountTags.map(
                      (discountTag) => discountTag.tag
                    )}
                  ></Tag>
                </Column>
                <Row
                  itemsCenter
                  gap={8}
                  className="text-[12px] border-t border-dashed border-gray-100 pt-[12px]"
                >
                  <Image
                    dir="icon/ecommerce-up.svg"
                    width={16}
                    height={16}
                  ></Image>
                  <span>
                    Tăng thêm <span className="text-green-500">5%</span> so với
                    tháng trước
                  </span>
                </Row>
              </div>
            </Wrapper>
          ))}
        </Row>
      )}
    ></RenderIf>
  )
}

export default Counter
