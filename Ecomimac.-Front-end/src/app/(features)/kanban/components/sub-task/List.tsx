"use client"

import { RouteMap } from "@/utils/common"
import { Fetched, useDelete, usePatch } from "@/utils/hooks"
import { KabanCategoryResponse, KabanResponse } from "@/utils/interface"
import Column from "@/app/(components)/column"
import { ON } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { useConfirm, useWithout } from "@/utils/functions"
import CreateUpdate from "./CreateUpdate"

const List = ({
  kabanCategory,
}: {
  kabanCategory: Fetched<KabanCategoryResponse[]>
}) => {
  const confirm = useConfirm()
  const remove = useDelete(RouteMap.KABANS)
  const transform = usePatch(RouteMap.KABANS + "/" + RouteMap.MOVE)
  const without = useWithout()

  const move = (kabanId: string, kabanCategoryId: string) =>
    void transform.request({
      kabanId,
      destinationKabanCategoryId: kabanCategoryId,
    })

  const onRemove = (kaban: KabanResponse) =>
    confirm(() =>
      remove
        .request({ pathname: kaban.id })
        .then(() => void kabanCategory.fetch())
    )

  return (
    <Row padding={16} size={10} className="overflow-auto h-[calc(100vh-58px)]">
      <Row size={12} gap={24}>
        <RenderIf
          reference={kabanCategory.response}
          render={(kabanCategory) =>
            kabanCategory.map((item, index) => (
              <Column
                className="h-fit justify-start min-w-[356px] bg-slate-50 rounded-[16px]"
                padding={16}
                key={index}
                gap={16}
                id={item.id}
              >
                <Row className="justify-between">
                  <Row gap={8} itemsCenter>
                    <div className=" bg-white w-[24px] h-[24px] rounded-full flex justify-center items-center font-bold">
                      {item.kabans.length}
                    </div>
                    <Title>{item.name}</Title>
                  </Row>
                  <Row size={1} gap={6} itemsCenter>
                    <div
                      className="bg-[#303030] p-[3px] rounded-full cursor-pointer"
                      onClick={() =>
                        without.append(
                          <CreateUpdate
                            onExit={without.close}
                            kabanCategoryId={item.id}
                          />
                        )
                      }
                    >
                      <Image width={12} height={12} dir="icon/add.svg"></Image>
                    </div>
                    <Context
                      items={[
                        {
                          icon: "icon/edit.svg",
                          label: "Đổi tên",
                          callback: () => {},
                        },
                        {
                          icon: "icon/trash.svg",
                          label: "Xoá",
                          callback: () => {},
                        },
                      ]}
                    />
                  </Row>
                </Row>
                {item.kabans.map((kaban, index) => (
                  <Column
                    className="p-[12px] bg-white rounded-[8px] relative cursor-pointer group"
                    gap={16}
                    onClick={() =>
                      without.append(
                        <CreateUpdate
                          kabanCategoryId={item.id}
                          kaban={kaban}
                          onExit={without.close}
                        />
                      )
                    }
                    key={index}
                  >
                    <Row
                      className="justify-end absolute top-[6px] right-[8px] group-hover:flex hidden w-fit py-[4px] rounded-[8px]"
                      onClick={(event) => event.stopPropagation()}
                      gap={8}
                    >
                      <Context
                        icon="icon/stack.svg"
                        items={kabanCategory.map((kabanCategory) => ({
                          label: kabanCategory.name,
                          icon: "icon/dot.svg",
                          callback: () => void move(kaban.id, kabanCategory.id),
                        }))}
                      ></Context>
                      <Context
                        icon="icon/more-horizontal.svg"
                        items={[
                          {
                            label: "Xóa",
                            icon: "icon/trash.svg",
                            callback: () => onRemove(kaban),
                          },
                        ]}
                      ></Context>
                    </Row>
                    <Content>{kaban.title}</Content>
                    <RenderIf
                      reference={kaban.image}
                      render={(image) => (
                        <Image
                          width="100%"
                          height="auto"
                          className=" aspect-[2/1.5] rounded-[4px]"
                          src={image}
                        ></Image>
                      )}
                    />
                    <Row gap={8}>
                      <Row size={1} gap={4}>
                        <Icon dir="icon/comment.svg"></Icon>
                        <Content>{Math.floor(Math.random() * 100)}</Content>
                      </Row>
                      <Row size={1} gap={4}>
                        <Icon dir="icon/link.svg"></Icon>
                        <Content>{Math.floor(Math.random() * 10)}</Content>
                      </Row>
                    </Row>
                  </Column>
                ))}
              </Column>
            ))
          }
        ></RenderIf>
      </Row>
    </Row>
  )
}

export default List
