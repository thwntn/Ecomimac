import { Helper } from "@/utils/common"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { CustomerResponse } from "@/utils/interface"

const Profile = ({ customer }: { customer: CustomerResponse }) => {
  return (
    <Wrapper padding={0} className="overflow-hidden">
      <Column gap={32} padding={16}>
        <Row gap={24} itemsCenter>
          <RenderIf
            reference={customer.image}
            render={(image) => (
              <Row className="relative" justifyCenter size={0.1}>
                <Image
                  width={86}
                  height={86}
                  src={image}
                  className="rounded-full"
                ></Image>
                <Icon
                  className="absolute bottom-[4px]"
                  dir="icon/camera.svg"
                ></Icon>
              </Row>
            )}
          ></RenderIf>

          <RenderIf
            reference={!customer.image}
            render={() => (
              <Character size={86} text={customer.name}></Character>
            )}
          ></RenderIf>

          <Column gap={8}>
            <Column>
              <Title>{customer.name}</Title>
              <Title>{customer.birthday}</Title>
              <Description>{customer.address}</Description>
            </Column>

            <Column>
              <Description>
                Khả dụng * {Helper.Currency.vietNamDong(40000000)}/Tháng
              </Description>
            </Column>

            <Row itemsCenter gap={8}>
              <Icon
                dir="icon/customer-phone.svg"
                content="Số điện thoại"
              ></Icon>
              <Icon dir="icon/customer-email.svg" content="Hộp thư"></Icon>
              <Icon
                dir="icon/customer-messenger.svg"
                content="Messenger"
              ></Icon>
            </Row>
          </Column>
        </Row>

        <Column gap={16}>
          <Column gap={16}>
            <Column>
              <Description>Số điện thoại</Description>
              <Content>{customer.phone}</Content>
            </Column>
            <Column>
              <Description>Sinh nhật</Description>
              <Content>
                {Helper.Time.format(customer.birthday ?? new Date())}
              </Content>
            </Column>
          </Column>
          <Column>
            <Description>Địa chỉ</Description>
            <Content>{customer.address}</Content>
          </Column>
          <Column>
            <Description>Loại</Description>
            <Content>Khách hàng hội viên</Content>
          </Column>
        </Column>
      </Column>
    </Wrapper>
  )
}

export default Profile
