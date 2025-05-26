import { RouteMap, Helper } from "@/utils/common"
import { useGet } from "@/utils/hooks"
import { convert } from "@/app/(components)/common"
import Wrapper from "@/app/(components)/wrapper"
import Row from "@/app/(components)/row"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import RenderIf from "@/app/(components)/render-if"
import { BannerResponse, ExpenseCategoryResponse } from "@/utils/interface"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Title from "@/app/(components)/title"

const Banner = ({ categoryId }: { categoryId: string }) => {
  const banner = useGet<BannerResponse>(
    RouteMap.EXPENSE + "/" + RouteMap.BANNER + "/" + categoryId
  )
  const expenseCategory = useGet<ExpenseCategoryResponse>(
    RouteMap.EXPENSE_CATEGORY + "/" + categoryId
  )
  return (
    <Row>
      <Wrapper
        isLoad={convert(!banner.response)}
        className="h-[256px]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "url(/asset/image/banner.jpg)",
        }}
      >
        <RenderIf
          reference={banner.response}
          render={(banner) => (
            <div className="h-fit rounded-[12px] flex gap-[16px] flex-col">
              <Row justifyBetween>
                <Row size={7}>
                  <RenderIf
                    reference={expenseCategory.response}
                    render={(expenseCategory) => (
                      <Column>
                        <Title className="text-[16px]">
                          {expenseCategory.name}
                        </Title>
                        <Description lineClamp={2}>
                          {expenseCategory.description}
                        </Description>
                      </Column>
                    )}
                  ></RenderIf>
                </Row>
                <Row size={1} gap={12} itemsCenter>
                  <Content className="whitespace-nowrap">
                    Hôm nay {Helper.Time.format(Helper.Time.now())}
                  </Content>
                  <Context icon="custom/setting.svg" items={[]}></Context>
                </Row>
              </Row>
              <div className="flex justify-between">
                <Column gap={8}>
                  <div className="flex flex-col">
                    <span>Chi phí đã dùng:</span>
                    <Row itemsCenter gap={8}>
                      <span className="text-[24px] font-bold">
                        {Helper.Currency.vietNamDong(banner.used)}
                      </span>
                      <Column>
                        <Description>Ngân sách:</Description>
                        <Description className="text-[24px] font-bold">
                          ({Helper.Currency.vietNamDong(banner.budget)})
                        </Description>
                      </Column>
                    </Row>
                  </div>
                </Column>
              </div>
            </div>
          )}
        />
      </Wrapper>
    </Row>
  )
}

export default Banner
