import Column from "@/app/(components)/column"
import { ON } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"

export const list = [
  {
    avatar:
      "https://nld.mediacdn.vn/zoom/700_438/291774122806476800/2023/12/19/tra05910-17029486311741086656045-0-0-1250-2000-crop-1702948645758527041798.jpg",
    name: "Hoàng Hải",
    message: "Hoàng Hải trở lại sau 1 thập kỷ ngủ đông",
  },
  {
    avatar:
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2024/8/7/1377228/Domic-Bld5.jpg",
    name: "Dương Domic",
    message:
      "Cả hai được khán giả bắt gặp khoảnh khắc 'trộm nhìn' tại một sự kiện âm nhạc",
  },
  {
    avatar:
      "data:image/jpeg;base64,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",
    name: "Quân AP",
    message:
      "L’Oreal Paris tung thêm benefit khi tham dự Fan Meet có cơ hội chơi mini gam",
  },
]

const all = [
  {
    avatar:
      "https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/454372833_1015993993329835_6041575029445602821_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH37lQnPEYHHzLtN6TlsRy8-j-Xq-2MDUn6P5er7YwNSauEeOmhsql12zAU8GCfEA6t8cQ4EIkINU3zkyIRRS2A&_nc_ohc=Ld06n8pI9fIQ7kNvgF2B0v0&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYA-SnWn17sN4ahAGJt_Cm8BEuczo8Bd1L-wxG962Xk9bw&oe=66F4BC0E",
    name: "Tuấn Anh",
    message: "Hoàng Hải trở lại sau 1 thập kỷ ngủ đông",
  },
  {
    avatar:
      "https://img.4gamers.com.tw/ckfinder-vn/image2/auto/2024-02/fak-240203-071008.jpg?versionId=F4qOXcC1f6bc04LN87LeROFm0Zgg1O7m",
    name: "Faker",
    message:
      "Cả hai được khán giả bắt gặp khoảnh khắc 'trộm nhìn' tại một sự kiện âm nhạc",
  },
  {
    avatar:
      "https://i.pinimg.com/originals/8b/3a/c4/8b3ac44fd02ef43021eb8cd86a4cbcee.jpg",
    name: "Gumayusi",
    message:
      "L’Oreal Paris tung thêm benefit khi tham dự Fan Meet có cơ hội chơi mini gam",
  },
]

const List = () => {
  return (
    <Column
      gap={16}
      size={1}
      padding={16}
      className="relative border-r border-slate-100 h-full"
    >
      <div className=" absolute bottom-[16px] right-[16px] bg-[#ff4949] p-[8px] rounded-full shadow-md z-10">
        <Image dir="icon/chat-new.svg" width={24} height={24}></Image>
      </div>
      <Column gap={16} className="w-[286px]" size={1}>
        <Description>Tin nhắn đã ghim</Description>
        <Column>
          {list.map((item, index) => (
            <Row
              key={index}
              gap={8}
              padding={8}
              className="hover:bg-slate-50 rounded-[8px] cursor-pointer"
            >
              <Image
                className="rounded-full"
                src={item.avatar}
                width={40}
                height={40}
              ></Image>
              <Row gap={24}>
                <Column>
                  <Row justifyBetween>
                    <Title>{item.name}</Title>
                    <Content className="text-[10px] font-bold">
                      {Math.floor(Math.random() * 10)} min
                    </Content>
                  </Row>
                  <Description lineClamp={1}>{item.message}</Description>
                </Column>
              </Row>
            </Row>
          ))}
        </Column>
      </Column>
      <Column gap={16} className="w-[286px]" size={1}>
        <Description>Toàn bộ tin nhắn</Description>
        <Column>
          {all.map((item, index) => (
            <Row
              key={index}
              gap={8}
              padding={8}
              className="hover:bg-slate-50 rounded-[8px] cursor-pointer"
            >
              <Image
                className="rounded-full"
                src={item.avatar}
                width={40}
                height={40}
              ></Image>
              <Row gap={24}>
                <Column>
                  <Row justifyBetween>
                    <Title>{item.name}</Title>
                    <Content className="text-[10px] font-bold">
                      {Math.floor(Math.random() * 10)} min
                    </Content>
                  </Row>
                  <Description lineClamp={1}>{item.message}</Description>
                </Column>
              </Row>
            </Row>
          ))}
        </Column>
      </Column>
    </Column>
  )
}

export default List
