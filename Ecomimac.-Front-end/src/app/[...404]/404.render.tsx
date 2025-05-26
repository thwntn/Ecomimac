import themes from "./index.module.scss"
import { useRouter } from "@/utils/functions"
import { Redirect } from "@/utils/common"
import Content from "../(components)/content"
import Button from "../(components)/button"
import Column from "../(components)/column"
import Image from "../(components)/image"

const NotFound = () => {
  const router = useRouter()
  return (
    <div className={themes.frame}>
      <Column gap={32} itemsCenter>
        <Image dir="icon/notfound.svg" width={320} height={240}></Image>
        <Column gap={8} itemsCenter>
          <Content className={themes.title}>
            Xin lỗi, không tìm thấy trang!
          </Content>
          <Content className={themes.description}>
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ
            bạn đã gõ nhầm URL? Hãy chắc chắn kiểm tra chính tả của bạn..
          </Content>
        </Column>
        <Button onClick={() => router.push(Redirect.HOME)}>Trang chủ</Button>
      </Column>
    </div>
  )
}

export default NotFound
