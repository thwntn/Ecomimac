import { RouteMap, Helper, SettingNames } from "@/utils/common"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import { ON } from "@/app/(components)/common"
import Container from "@/app/(components)/container"
import Content from "@/app/(components)/content"
import Frame from "@/app/(components)/frame"
import Image from "@/app/(components)/image"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { useGet } from "@/utils/hooks"
import { PackageDictionary } from "@/utils/interface"
import { Fragment } from "react"

const Package = () => {
  const packages = useGet<PackageDictionary>(
    RouteMap.TRANSACTION + "/" + RouteMap.PACKAGE
  )
  const uriUpgrade = useGet<string>(
    RouteMap.TRANSACTION + "/" + RouteMap.PAYMENTS,
    {
      initial: false,
    }
  )

  const upgradePage = (name: string) =>
    uriUpgrade
      .fetch({ pathname: name })
      .then((response) => response && window.open(response))

  return (
    <Frame>
      <RenderIf
        reference={packages.response}
        render={(pkg) => (
          <Fragment>
            <Row justifyBetween>
              <Container />
              <div className=" bg-slate-100 px-[16px] py-[8px] flex gap-[8px] rounded-[12px]">
                <Content>Gói hiện tại:</Content>
                <Title className="text-green-600">Free</Title>
              </div>
            </Row>
            <Row gap={24}>
              <Wrapper>
                <Row>
                  <Column>
                    <Title>{pkg[SettingNames.PACKAGE_FREE].name}</Title>
                    <Content>
                      Tối đa {pkg[SettingNames.PACKAGE_FREE].limit} thành viên
                    </Content>
                  </Column>
                </Row>
                <Column gap={8}>
                  <Row gap={8}>
                    <Title className="text-[24px]">
                      {Helper.Currency.vietNamDong(
                        pkg[SettingNames.PACKAGE_FREE].pricing
                      )}
                    </Title>
                    <Content>mỗi tháng</Content>
                  </Row>
                  <Row>
                    <Button
                      className="w-full"
                      main
                      onClick={() => upgradePage(SettingNames.PACKAGE_FREE)}
                    >
                      Nâng cấp
                    </Button>
                  </Row>
                </Column>
              </Wrapper>
              <Wrapper>
                <Row>
                  <Column>
                    <Title>{pkg[SettingNames.PACKAGE_PERSONAL].name}</Title>
                    <Content>
                      Tối đa {pkg[SettingNames.PACKAGE_PERSONAL].limit} thành
                      viên
                    </Content>
                  </Column>
                </Row>
                <Column gap={8}>
                  <Row gap={8}>
                    <Title className="text-[24px]">
                      {Helper.Currency.vietNamDong(
                        pkg[SettingNames.PACKAGE_PERSONAL].pricing
                      )}
                    </Title>
                    <Content>mỗi tháng</Content>
                  </Row>
                  <Row>
                    <Button
                      className="w-full"
                      main
                      onClick={() => upgradePage(SettingNames.PACKAGE_PERSONAL)}
                    >
                      Nâng cấp
                    </Button>
                  </Row>
                </Column>
              </Wrapper>
              <Wrapper>
                <Row>
                  <Column>
                    <Title>{pkg[SettingNames.PACKAGE_BUSINESS].name}</Title>
                    <Content>Không giới hạn</Content>
                  </Column>
                </Row>
                <Column gap={8}>
                  <Row gap={8}>
                    <Title className="text-[24px]">
                      ~{" "}
                      {Helper.Currency.vietNamDong(
                        pkg[SettingNames.PACKAGE_BUSINESS].pricing
                      )}
                    </Title>
                    <Content>mỗi tháng</Content>
                  </Row>
                  <Row>
                    <Button className="w-full">Liên hệ</Button>
                  </Row>
                </Column>
              </Wrapper>
            </Row>

            <Row>
              <List
                column={[
                  "Phạm vi hỗ trợ",
                  "Free (0$)",
                  "Cá nhân ($40)",
                  "Doanh nghiệp ($140)",
                ]}
                silent
                items={[
                  {
                    name: "Hỗ trợ qua email",
                    free: true,
                    personal: true,
                    business: true,
                  },
                  {
                    name: "Chat trực tiếp",
                    free: false,
                    personal: true,
                    business: true,
                  },
                  {
                    name: "Sao lưu dữ liệu",
                    free: true,
                    personal: true,
                    business: true,
                  },
                  {
                    name: "Mã hoá dữ liệu",
                    free: false,
                    personal: false,
                    business: true,
                  },
                  {
                    name: "Vận hành hệ thống riêng",
                    free: false,
                    personal: false,
                    business: true,
                  },
                ]}
                each={(item) => (
                  <Fragment>
                    <Content>{item.name}</Content>
                    <Row>
                      <RenderIf
                        reference={item.free}
                        render={() => (
                          <Image
                            dir="custom/tick-all.svg"
                            width={16}
                            height={16}
                          />
                        )}
                      />
                    </Row>
                    <Row>
                      <RenderIf
                        reference={item.personal}
                        render={() => (
                          <Image
                            dir="custom/tick-all.svg"
                            width={16}
                            height={16}
                          />
                        )}
                      />
                    </Row>
                    <Row>
                      <RenderIf
                        reference={item.business}
                        render={() => (
                          <Image
                            dir="custom/tick-all.svg"
                            width={16}
                            height={16}
                          />
                        )}
                      />
                    </Row>
                  </Fragment>
                )}
              />
            </Row>
          </Fragment>
        )}
      ></RenderIf>
    </Frame>
  )
}

export default Package
