import { OFF, ON, Status } from "@/app/(components)/common"
import { ChangeEvent, useState } from "react"

const getContent = function (obj: Object, name: string) {
  const content = Object(obj)[name]
  if (content === undefined) return ""
  return content
}

class Value {
  [key: string]: string
}

class Props {
  constructor(
    public onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    public value: string,
    public name: string,
    public validated: Status
  ) {}
}

export class Form<T> {
  constructor(
    public data: T,
    public validate: Validation<T>,
    public create: (name: keyof T) => Props,
    public append: (key: keyof T, value: unknown) => void,
    public set: (data: Object) => void
  ) {}
}

export type Validate<T> = {
  [key in keyof T]: Function
}

class Validation<T> {
  constructor(
    public get: (name: keyof T) => Status,
    public run: () => Status,
    public reset: VoidFunction,
    public isOpen: boolean
  ) {}
}

export const useForm = function <T = Object>(
  init: Object = {},
  validation?: Validate<T>
) {
  const [form, update] = useState<Value>(init as Value)
  const [open, setOpen] = useState<boolean>(false)

  const append = (key: keyof T, value: unknown): void =>
    void update((previous) => ({ ...previous, [key]: value } as Value))

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    update((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  const get = (name: keyof T, bypass: boolean = false): Status => {
    const func = Object(validation)[name]
    if ((func === undefined || open === false) && bypass === false) return ON

    const status = eval(func)(getContent(form, name as string), form) ? ON : OFF
    return status
  }

  const status = (validation: Validate<T>, bypass: boolean = false): Status => {
    const status = Object.keys(validation)
      .map((key) => get(key as keyof T, bypass))
      .every((item) => item === ON)
      ? //
        ON
      : OFF
    return status
  }

  const run = (): Status => {
    const validated = validation ? status(validation, true) : ON
    setOpen(true)
    return validated
  }

  const set = (data: Object): void => void update(data as Value)
  const reset = (): void => void setOpen(false)

  const create = (name: keyof T): Props =>
    new Props(
      onChange,
      getContent(form, name as string),
      name as string,
      get(name as keyof T)
    )

  const valid = new Validation(get, run, reset, open)

  return new Form<T>(form as T, valid, create, append, set)
}
