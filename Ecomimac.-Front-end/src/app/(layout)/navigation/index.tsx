import Column from "@/app/(components)/column"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import { NAVIGATE } from "./meta/Data"
import RenderIf from "@/app/(components)/render-if"
import { useConfirm } from "@/utils/functions"
import clsx from "clsx"
import themes from "./index.module.scss"
import { logout, useAccount } from "@/utils/hooks"
import { useState } from "react"
import { useRouter } from "@/utils/functions/router"

const Navigation = ({
  current,
  pathname,
  onChange,
}: {
  current: string
  pathname: string
  onChange: (pathname: string) => void
}) => {
  const account = useAccount()
  const roles = account.roleAccounts.map((roleAccount) => roleAccount.role)
  const [main, update] = useState(pathname)
  const confirm = useConfirm()
  const router = useRouter()

  const onLogout = () => confirm(() => logout(account.id))

  const status = (href: string) =>
    current.toLocaleLowerCase().includes(href.toLocaleLowerCase())

  const redirect = (pathname: string | undefined) => {
    const href = pathname as string

    onChange(href)
    router.push(href)
  }

  return (
    <div className={themes.frame}>
      <Row itemsCenter gap={8}>
        <span className={themes.name}>Titan Co.</span>
      </Row>
      <Column gap={4} className={themes.element}>
        {NAVIGATE.map((navigate, index) => {
          const access = roles.find((role) => role.code === navigate.role)
          if (access === undefined) return
          return (
            <Column gap={4} key={index}>
              <Column>
                <Column>
                  <Row
                    key={index}
                    className={clsx(themes.main, {
                      [themes.mainActive]: main.includes(navigate.href),
                    })}
                    itemsCenter
                    onClick={() => update(navigate.href)}
                  >
                    <Row gap={8}>
                      <Image dir={navigate.icon} width={16} height={16}></Image>
                      <span className={themes.mainText}>{navigate.name}</span>
                    </Row>
                    <RenderIf
                      reference={index === 1 || index === 4}
                      render={() => (
                        <div className="px-[8px] rounded-[2px] bg-slate-300">
                          {Math.ceil(Math.random() * 10)}
                        </div>
                      )}
                    ></RenderIf>
                  </Row>
                  <RenderIf
                    reference={main.includes(navigate.href)}
                    render={() => (
                      <Column className={themes.children}>
                        {navigate.items &&
                          navigate.items.map((item, index) => (
                            <Row
                              className={clsx(themes.elementChildren, {
                                [themes.active]: status(item.href),
                              })}
                              key={index}
                            >
                              <Row
                                onClick={() => redirect(item.href)}
                                itemsCenter
                                gap={8}
                                className={themes.childrenText}
                              >
                                {item.name}
                              </Row>
                            </Row>
                          ))}
                      </Column>
                    )}
                  ></RenderIf>
                </Column>
              </Column>
            </Column>
          )
        })}
      </Column>
      <div className={themes.bottomBar} onClick={onLogout}>
        <div className={clsx(themes.wrapper, themes.link)}>
          <Image dir="icon/navigation-link.svg" width={16} height={16}></Image>
          <span>Trang sản phẩm</span>
        </div>
        <div className={themes.wrapper}>
          <Image dir="icon/navigation-power.svg" width={16} height={16}></Image>
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  )
}

export default Navigation
