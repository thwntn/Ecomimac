import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { Helper, Redirect } from "@/utils/common"
import { getAccounts, getActive, switchAccount } from "@/utils/hooks"
import clsx from "clsx"
import Link from "next/link"
import themes from "./index.module.scss"

const Account = () => {
  const accounts = getAccounts()
  const active = getActive()

  return (
    <div className={themes.frame}>
      <Content className={themes.title}>Tài khoản</Content>
      <div className={themes.list}>
        {accounts.map((account, index) => (
          <Column
            itemsCenter
            gap={16}
            key={index}
            onClick={() => switchAccount(index)}
            className={clsx(themes.item, {
              [themes.active]: index === active,
            })}
          >
            <RenderIf
              reference={index === active}
              render={() => (
                <div className={themes.session}>Phiên hoạt động</div>
              )}
            ></RenderIf>
            <Row itemsCenter gap={16}>
              <Image
                className="rounded-full"
                src={account.profile.avatar}
                width={64}
                height={64}
              ></Image>
              <Column>
                <Title className="text-center">{account.profile.name}</Title>
                <Description>{account.profile.email}</Description>
                <Description>
                  {Helper.Time.format(new Date())}
                  Gần nhất: {Helper.Time.format(account.profile.lastLogin)}
                </Description>
              </Column>
            </Row>
          </Column>
        ))}
      </div>
      <div className="grid gap-[12px]">
        <Button main icon="icon/account-logout.svg">
          Đăng xuất toàn bộ tài khoản
        </Button>
        <Link
          href={Redirect.AUTH + "/" + Redirect.LOGIN}
          className="underline text-blue-500 text-center"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}

export default Account
