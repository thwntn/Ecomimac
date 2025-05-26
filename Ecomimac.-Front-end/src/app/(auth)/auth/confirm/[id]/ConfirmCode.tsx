import { useParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { RouteMap, Redirect } from "@/utils/common"
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
import Column from "@/app/(components)/column"
import { SnackbarMode, useSnackbar } from "@/utils/functions"
import Row from "@/app/(components)/row"

export interface FormObject {
  accountId: string
  code: string
}

interface IParams {
  [key: string]: string
  id: string // Account
}

const validate: Validate<FormObject> = {
  accountId: (email: string) => email,
  code: (password: string) => password,
}

const ConfirmCode = () => {
  const params = useParams<IParams>()
  const snackbar = useSnackbar()
  const [form, router] = [
    useForm<FormObject>({ accountId: params.id }, validate),
    useRouter(),
  ]
  const confirmCode = usePost<AccountResponse>(RouteMap.CONFIRM_CODE)

  const action = useCallback(() => {
    const status = form.validate.run()
    if (status === OFF) return

    confirmCode.request(form.data).then((data) => {
      if (data === undefined) {
        snackbar(SnackbarMode.error, {
          title: Message.ERROR_CODE,
          description: Message.ERROR_CODE_DESCRIPTION,
        })
        return
      }

      setup(data)
      router.push(Redirect.HOME)
    })
  }, [form])

  return (
    <Row itemsCenter justifyCenter className="h-[100vh]">
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
        <Wrapper className="w-full">
          <Title>Xác nhận tài khoản</Title>
          <Input
            {...form.create("code")}
            autoFocus
            error={Message.FORMAT_EMAIL}
            label="Mã xác nhận"
            placeholder="xxxxxx"
            type="text"
          />
          <Button main onClick={action}>
            Xác nhận
          </Button>
        </Wrapper>
        <Row justifyCenter>
          <Button className="w-fit border-none" icon="icon/google.svg">
            Đăng nhập với Google
          </Button>
        </Row>
        <div className="flex w-full justify-center gap-[4px] items-center">
          <Content>Đã có tài khoản?</Content>
          <Content className="text-[#1a3eaa] cursor-pointer">Đăng nhập</Content>
        </div>
      </div>
    </Row>
  )
}

export default ConfirmCode
