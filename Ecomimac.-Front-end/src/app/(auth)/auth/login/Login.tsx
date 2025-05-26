import { useRouter } from "@/utils/functions"
import { useCallback } from "react"
import {
  AccountStatus,
  RouteMap,
  Redirect,
  regexConstant,
} from "@/utils/common"
import { AccountResponse } from "@/utils/interface"
import { setup, Validate, useForm, usePost } from "@/utils/hooks"
import { Message } from "@/utils/common"
import Image from "@/app/(components)/image"
import Content from "@/app/(components)/content"
import Wrapper from "@/app/(components)/wrapper"
import Title from "@/app/(components)/title"
import Input from "@/app/(components)/input"
import Button from "@/app/(components)/button"
import { OFF } from "@/app/(components)/common"
import Row from "@/app/(components)/row"
import { useConnection } from "@/utils/functions"
import RenderIf from "@/app/(components)/render-if"
import Loading from "@/app/(components)/loading"

export interface FormObject {
  email: string
  password: string
}

const validate: Validate<FormObject> = {
  email: (email: string) => regexConstant.EMAIL.test(email),
  password: (password: string) => password,
}

const Login = () => {
  const connection = useConnection()
  const [form, router] = [useForm<FormObject>({}, validate), useRouter()]
  const postLogin = usePost<AccountResponse>(RouteMap.LOGIN)

  const action = useCallback(() => {
    const status = form.validate.run()
    if (status === OFF) return

    postLogin.request(form.data).then((data) => {
      if (data === undefined) return

      //  Summary:
      //      Confirm code page setup & resend email
      if (data.accountStatus === AccountStatus.Valid) {
        router.push(Redirect.CONFIRM + "/" + data.id)
        return
      }

      setup(data)
      connection.connect(data.profile.id).then(() => router.push(Redirect.HOME))
    })
  }, [form])

  const gotoSignup = () => router.push(Redirect.SIGN_UP)

  return (
    <RenderIf
      reference={postLogin.isWait === false}
      reverse={
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
          <Loading></Loading>
        </div>
      }
      render={() => (
        <Row itemsCenter justifyCenter className="h-[100vh]">
          <div
            className=" absolute inset-0 z-[-1] opacity-[4%]"
            style={{
              backgroundImage: "url(/asset/image/background-login.webp)",
            }}
          ></div>
          <div className="flex w-[446px] gap-12 flex-col justify-center items-center">
            <Image
              height={64}
              width={64}
              dir="icon/main.logo.svg"
              className="w-[64px] h-[64px] object-cover"
            />
            <Content className="text-2xl font-bold">Spendico</Content>
            <Wrapper className="w-full">
              <Title>Đăng nhập</Title>
              <Input
                {...form.create("email")}
                autoFocus
                error={Message.FORMAT_EMAIL}
                label="Email"
                placeholder="nttansv@gmail.com"
                type="text"
              />
              <Input
                {...form.create("password")}
                error={Message.CAN_NOT_EMPTY}
                label="Mật khẩu"
                placeholder="********"
                type="password"
              />
              <Content className="text-[#ff1515] text-right text-[12px] hover:underline cursor-pointer">
                Quên mật khẩu?
              </Content>
              <Button main onClick={action} className="!rounded-[12px]">
                Đăng nhập
              </Button>
            </Wrapper>
            <Row justifyCenter>
              <Button className="w-fit border-none" icon="icon/google.svg">
                Đăng nhập với Google
              </Button>
            </Row>
            <div className="flex w-full justify-center gap-[4px] items-center">
              <Content>Chưa có tài khoản?</Content>
              <Content
                onClick={gotoSignup}
                className="text-[#1a3eaa] cursor-pointer"
              >
                Tạo mới
              </Content>
            </div>
          </div>
        </Row>
      )}
    ></RenderIf>
  )
}

export default Login
