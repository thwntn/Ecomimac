import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Navigation from "@/app/(components)/navigation"
import Profile from "@/app/(components)/profile"
import Row from "@/app/(components)/row"
import { useAccount } from "@/utils/hooks"

const Analyst = () => {
  const account = useAccount()
  return (
    <Navigation>
      <Row size={0.1}>
        <Column justifyStart className="h-fit">
          <Row itemsCenter gap={8} className="p-[12px]">
            <div className="w-[20px] h-[20px] bg-[#46a8ff] rounded-md flex justify-center items-center text-white">
              #
            </div>
            <Content className="font-bold">Hoá đơn gần đây</Content>
          </Row>
          <Row className="p-[8px]" itemsCenter gap={8}>
            <div className="w-[32px] h-[32px] bg-[#00B8D9] flex justify-center items-center font-bold text-white text-[16px] rounded-full">
              J
            </div>
            <Column>
              <div>Y6GYDOOXRFUUOHVJFB0H</div>
              <Description>Hóa đơn ngày 16:08, 06-10-2024</Description>
            </Column>
          </Row>
          <Row className="p-[8px]" itemsCenter gap={8}>
            <div className="w-[32px] h-[32px] bg-[#FFAB00] flex justify-center items-center font-bold text-white text-[16px] rounded-full">
              5
            </div>
            <Column>
              <div>5GOPMVYWLZGZQV7WJISS</div>
              <Description>Hóa đơn ngày 16:08, 06-10-2024</Description>
            </Column>
          </Row>
          <Row className="p-[8px]" itemsCenter gap={8}>
            <div className="w-[32px] h-[32px] bg-[#00A76F] flex justify-center items-center font-bold text-white text-[16px] rounded-full">
              B
            </div>
            <Column>
              <div>BT9YJEKMBOYE7TYQF4UP</div>
              <Description>Hóa đơn ngày 16:08, 06-10-2024</Description>
            </Column>
          </Row>
        </Column>
      </Row>
      <Row className="h-full">
        <Column justifyStart className="h-fit">
          <Row itemsCenter gap={8} className="p-[12px]">
            <div className="w-[20px] h-[20px] bg-[#ff4665] rounded-md flex justify-center items-center text-white">
              #
            </div>
            <Content className="font-bold">Khách hàng tiềm năng</Content>
          </Row>
          <Row className="p-[8px]">
            <Profile
              avatar={account.profile.avatar}
              name={account.profile.name}
              email={account.profile.email}
            ></Profile>
          </Row>
        </Column>
      </Row>
    </Navigation>
  )
}

export default Analyst
