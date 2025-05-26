import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import { detectPlatform, Redirect, Platform, Message } from "@/utils/common"
import { logout, useAccount, useEffectOnce } from "@/utils/hooks"
import { usePathname } from "next/navigation"
import Icon from "@/app/(components)/icon"
import { useConfirm, useRouter, useWithout } from "@/utils/functions"
import Search from "./search"
import Notification from "./notification"

export interface Children {
  href?: string
  name: string
  icon?: string
  description?: string
  items?: Children[]
}

const Topbar = () => {
  const platform = detectPlatform()

  const pathname = usePathname()
  const confirm = useConfirm()
  const [account, router, without] = [useAccount(), useRouter(), useWithout()]

  const onLogout = () =>
    confirm(() => logout(account.id), {
      title: Message.LOGOUT_TITLE,
      description: Message.LOGOUT_DESCRIPTION,
    })

  const openSearch = () => without.append(<Search onExit={without.close} />)

  const getStatus = (href: string) =>
    pathname.toLocaleLowerCase().includes(href.toLocaleLowerCase())

  const addShortcut = () => {
    const EVENT = "keydown"
    const KEY = "KeyK"

    const action = (event: KeyboardEvent) =>
      event.metaKey && event.code === KEY && openSearch()

    if (platform === Platform.MACOS) window.addEventListener(EVENT, action)
    return () => window.removeEventListener(EVENT, action)
  }

  useEffectOnce(addShortcut)
  return (
    <Row
      justifyBetween
      itemsCenter
      className="max-h-[58px] sticky top-0 h-[58px] left-0 right-0 z-10 text-black bg-[#ffffff] border-b border-slate-100 backdrop-blur-sm flex px-[24px]"
    >
      <div
        className="px-[8px] w-[256px] flex py-[6px] items-center bg-slate-100 rounded-[8px] justify-between cursor-pointer gap-[8px]"
        onClick={openSearch}
      >
        <Row gap={4} itemsCenter>
          <Image width={16} height={16} dir="custom/search.svg"></Image>
          <span>Tìm kiếm</span>
        </Row>
        <div className=" bg-white py-[4px] px-[8px] text-[12px] tracking-[2px] rounded-md">
          ⌘K
        </div>
      </div>
      <Row gap={24} size={0.1}>
        <Row size={12} itemsCenter gap={24} className="justify-end">
          <Image
            dir="icon/vietnam.svg"
            height={32}
            width={32}
            className="hover:bg-none"
          ></Image>
          <Row itemsCenter gap={8}>
            <Icon
              indicator={9}
              dir="icon/notification.svg"
              size={24}
              onClick={() =>
                without.append(<Notification onExit={without.close} />)
              }
            ></Icon>
            <Icon dir="icon/contact.svg" size={22}></Icon>
            <Image
              dir="custom/setting.svg"
              width={24}
              height={24}
              className="animate-spin"
            ></Image>
          </Row>
          <Context
            trigger={
              <div className="flex items-center gap-[12px] p-[10px] rounded-[8px]">
                <Image
                  width={36}
                  height={36}
                  className="w-[32px] h-[32px] rounded-full object-cover"
                  src={account.profile.avatar}
                />
                <div className="flex flex-col">
                  <Content className="font-bold text-nowrap">
                    {account.profile.name}
                  </Content>
                  <Content className="text-[10px] text-gray-400">
                    {account.profile.email}
                  </Content>
                </div>
              </div>
            }
            items={[
              {
                label: "Trang cá nhân",
                icon: "icon/profile.svg",
                callback: () => router.push(Redirect.PROFILE),
              },
              {
                label: "Cài đặt",
                icon: "icon/setting.svg",
              },
              {
                label: "Tài khoản",
                icon: "icon/topbar-account.svg",
                callback: () => router.push("/" + Redirect.ACCOUNT),
              },
              {
                label: <Content className="text-red-500">Đăng xuất</Content>,
                icon: "icon/logout.svg",
                callback: onLogout,
              },
            ]}
          ></Context>
        </Row>
      </Row>
    </Row>
  )
}

export default Topbar
