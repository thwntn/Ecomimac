import {
  useAccount,
  QueryOptions,
  RecordAndCounter,
  setup,
  useGet,
  usePost,
} from "@/utils/hooks"
import { Fragment } from "react"
import { AccountStatus } from "@/utils/common"
import Wrapper from "@/app/(components)/wrapper"
import Row from "@/app/(components)/row"
import { ON, convert } from "@/app/(components)/common"
import Title from "@/app/(components)/title"
import Button from "@/app/(components)/button"
import CreateUpdate from "./CreateUpdate"
import RenderIf from "@/app/(components)/render-if"
import Column from "@/app/(components)/column"
import Image from "@/app/(components)/image"
import State from "@/app/(components)/state"
import Context, { ContextElement } from "@/app/(components)/context"
import Content from "@/app/(components)/content"
import Pagination from "@/app/(components)/pagination"
import Icon from "@/app/(components)/icon"
import { RouteMap } from "@/utils/common"
import { AccountResponse } from "@/utils/interface"
import { useWithout } from "@/utils/functions"

const ACCOUNT_SETUP = {
  [AccountStatus.Open]: {
    color: "#3b7fff",
    background: "#ebf2ff",
    name: "Active",
  },
  [AccountStatus.Lock]: {
    color: "#ff3b73",
    background: "#ffedf2",
    name: "Tạm dừng",
  },
  [AccountStatus.Valid]: {
    color: "#ff3b73",
    background: "#ffedf2",
    name: "Bị khóa",
  },
}

const Iam = () => {
  const without = useWithout()
  const account = useAccount()
  const switchAccount = usePost<AccountResponse>(
    RouteMap.EXTRA + "/" + RouteMap.SWITCH_ACCOUNT
  )
  const lockOrOpen = usePost<AccountResponse>(
    RouteMap.EXTRA + "/" + RouteMap.UPDATE_LOC_OPEN
  )
  const subAccount = useGet<RecordAndCounter<AccountResponse>>(RouteMap.EXTRA, {
    params: new QueryOptions(),
  })

  const onSwitchAccount = (account: AccountResponse) => {
    switchAccount
      .request({
        userName: account.userName,
      })
      .then((account) => setup(account))
      .finally(() => window.location.reload())
  }

  const onLockOrOpen = (account: AccountResponse) =>
    lockOrOpen
      .request({
        accountId: account.id,
      })
      .then(() =>
        subAccount.fetch({ params: new QueryOptions(), silent: true })
      )

  return (
    <Wrapper isLoad={convert(!subAccount.response)}>
      <Row className="justify-between pb-[16px]">
        <Title>Tài khoản IAM</Title>
        <Button
          main
          icon="icon/add.svg"
          onClick={() =>
            without.append(<CreateUpdate onExit={without.close} />)
          }
        >
          Tạo tài khoản
        </Button>
      </Row>
      <RenderIf
        reference={subAccount.response}
        render={(item) => (
          <Fragment>
            <ul className="grid grid-cols-3 gap-[16px]">
              {item.data.map((account, index) => (
                <li
                  className="border border-dashed p-[16px] rounded-[8px]"
                  key={index}
                >
                  <Column gap={16}>
                    <Row className="justify-between">
                      <Image
                        className="rounded-[12px]"
                        src={account.profile.avatar}
                        width={48}
                        height={48}
                      ></Image>
                      <div className="flex items-start gap-[8px]">
                        <State
                          name={ACCOUNT_SETUP[account.accountStatus].name}
                          color={ACCOUNT_SETUP[account.accountStatus].color}
                          background={
                            ACCOUNT_SETUP[account.accountStatus].background
                          }
                        />
                        <Context
                          items={[
                            new ContextElement(
                              "icon/profile.svg",
                              "Cập nhật",
                              () => onSwitchAccount(account)
                            ),
                            new ContextElement("icon/key.svg", "Truy cập", () =>
                              onSwitchAccount(account)
                            ),
                            new ContextElement("icon/lock.svg", "Khoá/Mở", () =>
                              onLockOrOpen(account)
                            ),
                            new ContextElement(
                              "icon/permission.svg",
                              "Phân quyền",
                              () => onSwitchAccount(account)
                            ),
                            new ContextElement(
                              "icon/trash.svg",
                              (
                                <Content className="text-red-500">
                                  Delete
                                </Content>
                              ),
                              () => onSwitchAccount(account)
                            ),
                          ]}
                        ></Context>
                      </div>
                    </Row>
                    <Column>
                      <Content>{account.profile.name}</Content>
                      <Content className="text-[10px] text-gray-400 line-clamp-2">
                        {account.profile.description}
                      </Content>
                    </Column>
                  </Column>
                  <Row gap={16}>
                    <Row className="pt-[12px]">
                      <Row gap={4} itemsCenter>
                        <Icon dir="icon/calendar.svg"></Icon>
                        <Content className="text-[10px] text-gray-400 text-nowrap">
                          {new Date(account.created).toDateString()}
                        </Content>
                      </Row>
                    </Row>
                    <Row className="pt-[12px]">
                      <Row gap={4} itemsCenter>
                        <Icon dir="icon/chief.svg"></Icon>
                        <Content className="text-[10px] text-gray-400">
                          Giám đốc
                        </Content>
                      </Row>
                    </Row>
                  </Row>
                </li>
              ))}
            </ul>
            <Pagination
              current={item.page.current}
              total={item.page.total}
              onChange={(page) =>
                subAccount.fetch({ params: new QueryOptions({ page }) })
              }
            />
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Iam
