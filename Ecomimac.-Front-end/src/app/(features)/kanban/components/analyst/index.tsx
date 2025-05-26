import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Navigation from "@/app/(components)/navigation"
import Profile from "@/app/(components)/profile"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
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
            <Content className="font-bold">Dự án đang thực hiện</Content>
          </Row>
          <Column size={0.1} gap={8} padding={8}>
            <Row gap={12}>
              <Image
                src="https://cdn.dribbble.com/userupload/11099062/file/original-629223dcd63ab8d7e7c69778cd3f68e5.jpg?resize=1024x640"
                width={40}
                height={40}
                className=" rounded-full"
              ></Image>
              <Column>
                <Title>Flat Colored Interface</Title>
                <Description lineClamp={2}>
                  Flat Colored Interface Icons icons and vector packs for
                  Sketch, Adobe XD,
                </Description>
              </Column>
            </Row>
            <Row gap={12}>
              <Image
                src="https://cdn.dribbble.com/userupload/8439618/file/original-03aa3ee320ef5e46be49cc76e962326e.jpg?resize=1024x576"
                width={40}
                height={40}
                className=" rounded-full"
              ></Image>
              <Column>
                <Title>Titan.co Manager</Title>
                <Description lineClamp={2}>
                  Figma and websites. Browse 306 vector icons about Flat Colored
                  Interface Icons term. No Ads here 🤗 Instead
                </Description>
              </Column>
            </Row>
          </Column>
        </Column>
      </Row>
      <Row className="h-full">
        <Column justifyStart className="h-fit">
          <Row itemsCenter gap={8} className="p-[12px]">
            <div className="w-[20px] h-[20px] bg-[#4649ff] rounded-md flex justify-center items-center text-white">
              #
            </div>
            <Content className="font-bold">Thành viên dự án</Content>
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
