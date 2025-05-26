import { HTMLAttributes, useCallback, useEffect, useState } from "react"
const TIME_OUT = 2000
const SPEED = 50
const MIN_TIME = 500
const SPLIT = 200

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value: number | undefined
  format?: (value: number) => string | number
}

const Number = (props: IProps) => {
  const [random, setRandom] = useState<number>(props.value ?? 0)
  const customProps = Object.assign({}, props)

  const randomValue = useCallback(() => {
    setRandom((previous) => Math.floor(previous + (props.value ?? 0) / SPLIT))
  }, [props.value])

  delete customProps.format

  useEffect(
    function () {
      const time = Math.random() * TIME_OUT

      const interval = setInterval(randomValue, SPEED)
      setTimeout(
        () => {
          clearInterval(interval)
          setRandom(props.value ?? 0)
        },
        time < MIN_TIME ? MIN_TIME : time
      )
    },
    [props.value]
  )

  return (
    <div {...customProps}>{props.format ? props.format(random) : random}</div>
  )
}

export default Number
