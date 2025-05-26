import { useRouter } from "@/utils/functions"
import { useCallback } from "react"
import { RouteMap, Redirect, regexConstant } from "@/utils/common"
import Image from "@/app/(components)/image"
import { Message } from "@/utils/common"
import Content from "@/app/(components)/content"
import Wrapper from "@/app/(components)/wrapper"
import Title from "@/app/(components)/title"
import Input from "@/app/(components)/input"
import Calendar from "@/app/(components)/calendar"
import Button from "@/app/(components)/button"
import { AccountResponse } from "@/utils/interface"
import { Validate, useForm, usePost } from "@/utils/hooks"
import { OFF, ON } from "@/app/(components)/common"
import Column from "@/app/(components)/column"
import Row from "@/app/(components)/row"

export interface FormObject {
  email: string
  password: string
  name: string
  birthday: string
  description?: string
}

const validate: Validate<FormObject> = {
  email: (email: string) => regexConstant.EMAIL.test(email),
  password: (password: string) => password,
  name: (name: string) => name,
  birthday: (birthday: string) => birthday,
}

const Signup = () => {
  const [form, router] = [
    useForm<FormObject>({ description: String() }, validate),
    useRouter(),
  ]
  const signUp = usePost<AccountResponse>(RouteMap.SIGNUP)

  const action = useCallback(() => {
    const status = form.validate.run()
    if (status === OFF) return

    signUp.request(form.data).then((data) => {
      if (data === undefined) return

      window.localStorage.setItem(
        String(process.env.NEXT_PUBLIC_ACCOUNT_AUTH_NAME),
        JSON.stringify(data)
      )

      router.push(Redirect.CONFIRM + "/" + data.id)
    })
  }, [form])

  return (
    <div className=" relative justify-center items-center flex h-[100vh]">
      <div
        className=" absolute inset-0 z-[-1] opacity-[4%]"
        style={{
          backgroundImage:
            "url(https://cdn.dribbble.com/userupload/3589163/file/original-f0bcea9486d110c9bfdd4a2969852f37.png?resize=1024x768)",
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
        <Wrapper className="w-[456px]">
          <Column size={12} gap={24}>
            <Title>Tạo tài khoản</Title>
            <Row gap={12}>
              <Input
                {...form.create("email")}
                error={Message.FORMAT_EMAIL}
                autoFocus
                label="Email"
                placeholder="nttansv@gmail.com"
                type="text"
              />
              <Input
                {...form.create("name")}
                error={Message.CAN_NOT_EMPTY}
                label="Tên hiển thị"
                placeholder="Mr.Join"
                type="text"
              />
            </Row>
            <Row>
              <Input
                {...form.create("password")}
                error={Message.CAN_NOT_EMPTY}
                label="Mật khẩu"
                placeholder="********"
                type="password"
              />
            </Row>
            <Row>
              <Calendar
                label="Ngày sinh"
                onChange={(date) => form.append("birthday", date)}
              />
            </Row>
            <Button onClick={action} icon="icon/next.svg">
              Đăng ký
            </Button>
          </Column>
        </Wrapper>
        <div className="flex w-full justify-center gap-[4px] items-center">
          <Content>Bạn đã có tài khoản?</Content>
          <Content className="text-[#1a3eaa] cursor-pointer">Đăng nhập</Content>
        </div>
      </div>
    </div>
  )
}

export default Signup
