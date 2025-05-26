import { RouteMap } from "@/utils/common"
import { RecordAndCounter, useGet } from "@/utils/hooks"
import { TagResponse } from "@/utils/interface/Tag"
import Many from "@/app/(components)/many"
import RenderIf from "@/app/(components)/render-if"

export class TagName {
  id: string
  name: string
  color: string
}

const OptionTag = ({ onChange }: { onChange: (tags: TagName[]) => void }) => {
  const getTag = useGet<RecordAndCounter<TagResponse>>(RouteMap.TAGS)

  return (
    <div className="w-full">
      <RenderIf
        reference={getTag.response}
        render={(tags) => (
          <div>
            <Many
              items={tags.data}
              each={(item) => (
                <span style={{ color: item.color }}>{item.name}</span>
              )}
              onChange={onChange}
            ></Many>
          </div>
        )}
      ></RenderIf>
    </div>
  )
}

export default OptionTag
