import { usePathname, useRouter } from "next/navigation"
import { map } from "./meta/MapName"
import themes from "./index.module.scss"
import Image from "../image"
import { CustomIconNames } from "../common"
import Row from "../row"
import Column from "../column"
import Description from "../description"
import { useEffectOnce } from "@/utils/hooks"

const PREFIX = "/"
const BREAK = "___"
const EMPTY_NAME = "Chi tiết"

const Container = () => {
  const path = usePathname()
  const router = useRouter()
  const paths = path.split(PREFIX)
  const render = paths.flatMap((item) => [BREAK, item]).slice(1)

  //
  //  Summary:
  //    Set title name tab website active
  //
  //  Returns:
  //
  useEffectOnce(
    () => void (document.title = map[render[render.length - 1]] ?? EMPTY_NAME)
  )
  return (
    <div className={themes.frame}>
      <Row gap={12} itemsCenter>
        <div
          className="flex justify-center items-center p-[6px] border rounded-[8px] hover:bg-slate-100 cursor-pointer"
          onClick={router.back}
        >
          <Image
            dir={CustomIconNames.CONTAINER_PREVIOUS}
            width={24}
            height={24}
          ></Image>
        </div>
        <Column gap={4}>
          <Description className={themes.description}>
            Trở về trang trước
          </Description>
          <ul className={themes.wrapper}>
            {render.map((path, index) =>
              path === BREAK ? (
                <li className={themes.icon} key={index}></li>
              ) : (
                <li key={index} className={themes.redirect}>
                  {map[path] ? map[path] : EMPTY_NAME}
                </li>
              )
            )}
          </ul>
        </Column>
      </Row>
    </div>
  )
}

export default Container
