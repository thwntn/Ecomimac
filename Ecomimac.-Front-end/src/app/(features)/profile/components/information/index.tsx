import { Fetched, useEffectOnce, useForm } from "@/utils/hooks"
import { Helper } from "@/utils/common"
import { Fragment } from "react"
import Modify from "./Modify"
import Wrapper from "@/app/(components)/wrapper"
import { ON, convert } from "@/app/(components)/common"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Icon from "@/app/(components)/icon"
import Input from "@/app/(components)/input"
import { AccountResponse } from "@/utils/interface"
import { useWithout } from "@/utils/functions"
import Column from "@/app/(components)/column"

const Information = ({ account }: { account: Fetched<AccountResponse> }) => {
  const without = useWithout()
  return (
    <Wrapper isLoad={convert(!account.response)} gap={8}>
      <Column>
        <RenderIf
          reference={account.response}
          render={(item) => (
            <Fragment>
              <Row className="justify-between">
                <Title>Thông tin cơ bản</Title>
                <Icon
                  onClick={() =>
                    without.append(
                      <Modify onExit={without.close} account={account} />
                    )
                  }
                  dir="icon/edit.svg"
                ></Icon>
              </Row>
              <Input value={item.profile.name} silent label="Tên"></Input>
              <Input
                value={Helper.Time.format(item.created)}
                silent
                label="Ngày sinh"
              ></Input>
              <Input
                label="Mô tả"
                silent
                value={item.profile.description}
              ></Input>
              <Input
                label="Địa chỉ"
                silent
                value={item.profile.address}
              ></Input>
              <Input
                label="Số điện thoại"
                silent
                value={item.profile.phone}
              ></Input>
            </Fragment>
          )}
        ></RenderIf>
      </Column>
    </Wrapper>
  )
}

export default Information
