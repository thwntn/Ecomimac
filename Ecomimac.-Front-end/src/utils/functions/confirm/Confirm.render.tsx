"use client"

import themes from "./index.module.scss"
import { IStore } from "./Confirm"
import Button from "@/app/(components)/button"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Column from "@/app/(components)/column"
import RenderIf from "@/app/(components)/render-if"

const ConfirmUI = ({
  callback,
  close,
  store,
}: {
  store: IStore
  callback: Function | undefined
  close: VoidFunction
}) => {
  return (
    callback && (
      <div className={themes.frame} onClick={close}>
        <div
          className={themes.wrapper}
          onClick={(event) => event.stopPropagation()}
        >
          <Column className={themes.body}>
            <Column itemsCenter gap={8}>
              <Title className={themes.title}>{store.content.title}</Title>
              <Description className={themes.description}>
                {store.content.description}
              </Description>
            </Column>
          </Column>
          <RenderIf
            reference={store.extension}
            render={(extension) => (
              <Column className={themes.extension}>{extension}</Column>
            )}
          ></RenderIf>
          <Column gap={12} itemsCenter>
            <Button
              main
              className="!w-full"
              onClick={() => {
                callback && callback()
                close()
              }}
            >
              Xác nhận
            </Button>
            <a
              onClick={close}
              className="text-gray-500 text-center font-bold underline cursor-pointer"
            >
              Huỷ bỏ
            </a>
          </Column>
        </div>
      </div>
    )
  )
}

export default ConfirmUI
