"use client"

import { useRouter } from "@/utils/functions"
import { useCallback } from "react"
import { RouteMap, Redirect, regexConstant } from "@/utils/common"
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

export interface FormObject {
  rootEmail: string
  userName: string
  password: string
}

const validate: Validate<FormObject> = {
  rootEmail: (rootEmail: string) => regexConstant.EMAIL.test(rootEmail),
  userName: (userName: string) => userName,
  password: (password: string) => password,
}

const Iam = () => {
  const [form, router] = [useForm<FormObject>({}, validate), useRouter()]
  const login = usePost<AccountResponse>(
    RouteMap.EXTRA + "/" + RouteMap.SIGNIN
  )

  const action = useCallback(() => {
    const status = form.validate.run()
    if (status === OFF) return

    login.request(form.data).then((data) => {
      if (data === undefined) return
      setup(data)

      router.push(Redirect.HOME)
    })
  }, [form])

  return (
    <div className="relative justify-center items-center flex h-[100vh]">
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
        <Wrapper>
          <Title>Đăng nhập</Title>
          <Input
            {...form.create("rootEmail")}
            autoFocus
            error={Message.FORMAT_EMAIL}
            label="Email"
            placeholder="nttansv@gmail.com"
            type="text"
          />
          <Input
            {...form.create("userName")}
            label="Tên đăng nhập"
            placeholder="account"
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
          <Button main onClick={action}>
            Đăng nhập
          </Button>
        </Wrapper>
        <Button className="w-full border-none" icon="icon/google.svg">
          Đăng nhập với Google
        </Button>
        <div className="flex w-full justify-center gap-[4px] items-center">
          <Content>Chưa có tài khoản?</Content>
          <Content className="text-[#1a3eaa] cursor-pointer">Create</Content>
        </div>
      </div>
    </div>
  )
}

export default Iam
