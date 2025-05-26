import Column from "@/app/(components)/column"
import { ON } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { Fragment, useState } from "react"
import { list } from "./List"
import RenderIf from "@/app/(components)/render-if"
import { Helper } from "@/utils/common"

const data = [
  {
    avatar:
      "https://nld.mediacdn.vn/zoom/700_438/291774122806476800/2023/12/19/tra05910-17029486311741086656045-0-0-1250-2000-crop-1702948645758527041798.jpg",
    profileId: 1,
    name: "Hoàng Hải",
    message: "Guyss tahun depan librance Jepund!",
    created: new Date(),
  },
  {
    avatar:
      "http://localhost:6501/media/files/dbeafda8-a531-417f-b637-aaf82b669faa.jpg",
    profileId: 0,
    name: "Thiên Tân",
    message:
      "Use Google Messages for web to send SMS, MMS, and RCS messages from your computer. Open the Messages app on your Android phone to get started.",
    created: new Date(),
  },
]

const Message = () => {
  const [message, update] = useState(data)

  const onSend = () => {
    update((previous) => [
      ...previous,
      {
        avatar:
          "http://localhost:6501/media/files/dbeafda8-a531-417f-b637-aaf82b669faa.jpg",
        profileId: 0,
        name: "Thiên Tân",
        message:
          "Use Google Messages for web to send SMS, MMS, and RCS messages from your computer. Open the Messages app on your Android phone to get started.",
        created: new Date(),
      },
    ])
  }

  return (
    <Column size={12} className="h-full">
      <Column size={0.1}>
        <Row padding={16} justifyBetween size={12}>
          <Row gap={8} size={12}>
            <Image
              className="rounded-full"
              src={list[0].avatar}
              width={40}
              height={40}
            ></Image>
            <Row gap={24}>
              <Column>
                <Title>{list[0].name}</Title>
                <Description lineClamp={1}>Đang soạn tin nhắn...</Description>
              </Column>
            </Row>
          </Row>
          <Row size={1} gap={8}>
            <Icon dir="icon/chat-phone.svg"></Icon>
            <Icon dir="icon/chat-camera.svg"></Icon>
            <Icon dir="icon/chat-menu.svg"></Icon>
          </Row>
        </Row>
      </Column>
      <Column
        className="h-full bg-slate-50 max-h-[calc(100vh-206px)] overflow-auto"
        padding={16}
        size={12}
      >
        <Row size={12}></Row>
        <Column size={1} gap={24}>
          {message.map((item, index) => (
            <Fragment>
              <RenderIf
                reference={item.profileId === 1}
                render={() => (
                  <Row key={index} gap={8}>
                    <Image
                      src={item.avatar}
                      width={40}
                      height={40}
                      className="rounded-full"
                    ></Image>
                    <Column gap={8}>
                      <Row gap={24}>
                        <Title>{item.name}</Title>
                        <Description>
                          {Helper.Time.format(item.created)}
                        </Description>
                      </Row>
                      <div className="p-[12px] bg-white w-fit rounded-[16px] rounded-tl-none max-w-[60%]">
                        {item.message}
                      </div>
                    </Column>
                  </Row>
                )}
              ></RenderIf>
              <RenderIf
                reference={item.profileId !== 1}
                render={() => (
                  <Row gap={8}>
                    <Column gap={8} className="items-end">
                      <Row gap={24} className="justify-end">
                        <Description className="text-right">
                          {Helper.Time.format(item.created)}
                        </Description>
                        <Title>Bạn</Title>
                      </Row>
                      <div className="p-[12px] bg-white w-fit rounded-[16px] rounded-tr-none max-w-[60%]">
                        {item.message}
                      </div>
                    </Column>
                    <Image
                      src={item.avatar}
                      width={40}
                      height={40}
                      className="rounded-full"
                    ></Image>
                  </Row>
                )}
              ></RenderIf>
            </Fragment>
          ))}
        </Column>
      </Column>
      <Row className="p-[16px]" size={0.1} gap={8}>
        <input
          className="w-full bg-slate-100 py-[12px] px-[16px] rounded-full outline-none"
          placeholder="Hãy soạn gì đó..."
        ></input>
        <div className="bg-[#3185de] rounded-full p-[8px]" onClick={onSend}>
          <Image dir="icon/chat-send.svg" width={24} height={24}></Image>
        </div>
      </Row>
    </Column>
  )
}

export default Message
