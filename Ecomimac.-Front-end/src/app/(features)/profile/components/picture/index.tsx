import { Fetched } from "@/utils/hooks"
import { AccountResponse } from "@/utils/interface"
import { OFF, ON, Status } from "@/app/(components)/common"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"
import Cover from "./modify/Cover"
import Avatar from "./modify/Avatar"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Content from "@/app/(components)/content"
import { useWithout } from "@/utils/functions"
import Row from "@/app/(components)/row"

const Picture = ({
  account,
  silent,
}: {
  account: Fetched<AccountResponse>
  silent?: Status
}) => {
  const without = useWithout()

  return (
    <RenderIf
      reference={account.response}
      render={(item) => (
        <Wrapper className="!p-0 relative overflow-hidden" gap={0}>
          <div className="relative">
            <Image
              className="rounded-t-[12px] bg-white"
              src={item.profile.coverPicture}
              width="100%"
              height={200}
            ></Image>
            <RenderIf
              reference={silent === OFF || silent === undefined}
              render={() => (
                <Icon
                  dir="icon/camera.svg"
                  size={24}
                  className="!absolute top-[16px] right-[16px]"
                  onClick={() =>
                    without.append(
                      <Cover account={account} onExit={without.close} />
                    )
                  }
                />
              )}
            ></RenderIf>
          </div>
          <Row
            className="bottom-[16px] left-[16px] absolute"
            gap={16}
            itemsCenter
          >
            <div className="relative border-[2px] border-white rounded-full">
              <Image
                className="rounded-full bg-white"
                src={item.profile.avatar}
                width={120}
                height={120}
              ></Image>

              <RenderIf
                reference={silent === OFF || silent === undefined}
                render={() => (
                  <Icon
                    dir="icon/camera.svg"
                    size={24}
                    className="!absolute left-[calc(50%-12px)] bottom-[4px]"
                    onClick={() =>
                      without.append(
                        <Avatar account={account} onExit={without.close} />
                      )
                    }
                  />
                )}
              ></RenderIf>
            </div>
            <Column className="drop-shadow-sm">
              <Title size={20} className="text-white">
                {item.profile.name}
              </Title>
              <Content className="text-white">Quản trị tối cao</Content>
            </Column>
          </Row>

          <Row
            className=" bg-white justify-end px-[16px] min-h-[46px]"
            gap={16}
          >
            <RenderIf
              reference={silent === OFF}
              render={() => (
                <Fragment>
                  <div className="p-[12px] border-b-[2px] border-slate-400">
                    <Row gap={6}>
                      <Image
                        dir="icon/information.svg"
                        width={16}
                        height={16}
                      ></Image>
                      <Content className="font-bold">Information</Content>
                    </Row>
                  </div>
                  <div className="p-[12px]">
                    <Row gap={6}>
                      <Image
                        dir="icon/other.svg"
                        width={16}
                        height={16}
                      ></Image>
                      <Content>Khác</Content>
                    </Row>
                  </div>
                </Fragment>
              )}
            ></RenderIf>
          </Row>
        </Wrapper>
      )}
    ></RenderIf>
  )
}

export default Picture
