import { RouteMap } from "@/utils/common"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { ActivityResponse } from "@/utils/interface/Activity"
import { ON, convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Pagination from "@/app/(components)/pagination"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { ActivityMessage, Helper } from "@/utils/common"
import Column from "@/app/(components)/column"

export const ITEM_PAGE = 5

const Activity = () => {
  const activity = useGet<RecordAndCounter<ActivityResponse>>(
    RouteMap.ACTIVITY,
    { params: new QueryOptions() }
  )
  const isLoad = convert(activity.isWait)
  return (
    <Wrapper isLoad={isLoad}>
      <Column gap={24}>
        <Title>Hoạt động gần đây</Title>
        <RenderIf
          reference={activity.response}
          render={(activity) => (
            <ul className="flex flex-col">
              {activity.data.map((item, index) => (
                <RenderIf
                  key={index}
                  reference={ActivityMessage[item.type]}
                  render={() => (
                    <li>
                      <Row className="border-t border-dashed py-[12px]">
                        <Row gap={24} className="w-full">
                          <div>
                            <Content>{item.profile.name}</Content>
                            <Content className="text-gray-400 text-[10px]">
                              Quản trị tối cao
                            </Content>
                          </div>
                          <div>
                            <Content>{ActivityMessage[item.type]}</Content>
                            <Content className="text-gray-400 text-[10px]">
                              Hoạt động của người dùng
                            </Content>
                          </div>
                        </Row>
                        <DateTime dateTime={new Date(item.created)}></DateTime>
                      </Row>
                    </li>
                  )}
                ></RenderIf>
              ))}
            </ul>
          )}
        ></RenderIf>
        <RenderIf
          reference={activity.response}
          render={(item) => {
            const withPagination = Helper.Data.withPagination(
              activity,
              (page) =>
                activity.fetch({
                  params: new QueryOptions({ page, limit: ITEM_PAGE }),
                })
            )
            return (
              <Pagination
                current={withPagination.current}
                total={withPagination.total}
                onChange={(page) => withPagination.onChange(page, ITEM_PAGE)}
              ></Pagination>
            )
          }}
        ></RenderIf>
      </Column>
    </Wrapper>
  )
}

export default Activity
