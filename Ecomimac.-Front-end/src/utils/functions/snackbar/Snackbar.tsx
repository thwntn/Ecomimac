import { create } from "zustand"
import Success from "./asset/success.svg"
import Primary from "./asset/primary.svg"
import Warning from "./asset/warning.svg"
import Error from "./asset/error.svg"
import { Helper } from "@/utils/common"
import themes from "./index.module.scss"
import clsx from "clsx"
import Description from "@/app/(components)/description"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Image from "@/app/(components)/image"

export enum Constant {
  SUCCESS_MESSAGE = "Hoàn tẩt thao tác",
  SUCCESS_COLOR = "#40B549",
  PRIMARY_MESSAGE = "Thông báo hệ thống",
  PRIMARY_COLOR = "#4272B8",
  WARNING_MESSAGE = "Lưu ý sự thay đổi",
  WARNING_COLOR = "#D5AE29",
  ERROR_MESSAGE = "Đã xảy ra lỗi",
  ERROR_COLOR = "#D53C3E",
  DESCRIPTION_DEFAULT = "Thông tin của bạn đã được cập nhật.",
  TIMEOUT_MESSAGE = 4000,
}

export enum SnackbarMode {
  primary,
  error,
  success,
  fail,
  tip,
  warning,
}

interface ISettingContent {
  [key: string]: Setting
}

class Setting {
  constructor(
    public messageDefault: string,
    public descriptionDefault: string,
    public icon: string,
    public textColor: string
  ) {}
}

export const SettingContent: ISettingContent = {
  [SnackbarMode.primary]: new Setting(
    Constant.PRIMARY_MESSAGE,
    Constant.DESCRIPTION_DEFAULT,
    Primary.src,
    Constant.PRIMARY_COLOR
  ),
  [SnackbarMode.error]: new Setting(
    Constant.ERROR_MESSAGE,
    Constant.DESCRIPTION_DEFAULT,

    Error.src,
    Constant.ERROR_COLOR
  ),
  [SnackbarMode.success]: new Setting(
    Constant.SUCCESS_MESSAGE,
    Constant.DESCRIPTION_DEFAULT,

    Success.src,
    Constant.SUCCESS_COLOR
  ),
  [SnackbarMode.warning]: new Setting(
    Constant.WARNING_MESSAGE,
    Constant.DESCRIPTION_DEFAULT,
    Warning.src,
    Constant.WARNING_COLOR
  ),
}

export class Content {
  title: string
  description: string
}

export class Element {
  constructor(
    public snackbarMode: SnackbarMode,
    public content: Content,
    public id: string = Helper.Random.string()
  ) {}
}

interface IStore {
  elements: Element[]
  add: (element: Element) => void
  remove: (id: string) => void
}

const referenceStore = create<IStore>((set) => ({
  elements: [],

  add: (element: Element) =>
    set((state) => ({ elements: [...state.elements, element] })),

  remove: (id: string) =>
    set((state) => ({
      elements: state.elements.filter((item) => item.id !== id),
    })),
}))

export const useSnackbar = function () {
  const store = referenceStore()

  const insert = function (
    mode: SnackbarMode,
    content: Content = {
      title: SettingContent[mode].messageDefault,
      description: SettingContent[mode].descriptionDefault,
    }
  ) {
    const element = new Element(mode, content)

    store.add(element)
    setTimeout(() => store.remove(element.id), Constant.TIMEOUT_MESSAGE)
  }

  return insert
}

const Snackbar = () => {
  const store = referenceStore()
  return (
    <ul className={themes.frame}>
      {store.elements.map((snackbar, index) => (
        <li key={index}>
          <div className={clsx(themes.item, themes.primary)}>
            <Image
              width={24}
              height={24}
              className={themes.icon}
              src={SettingContent[snackbar.snackbarMode].icon}
            />
            <Column gap={2}>
              <Title lineClamp={1}>{snackbar.content.title}</Title>
              <Description lineClamp={1}>
                {snackbar.content.description}
              </Description>
            </Column>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Snackbar
