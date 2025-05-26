import Content from "../content"
import Image from "../image"
import RenderIf from "../render-if"

const Profile = ({
  avatar,
  name,
  email,
}: {
  avatar?: string
  name: string
  email: string
}) => {
  return (
    <div className="flex items-center gap-[12px] rounded-[8px]">
      <RenderIf
        reference={avatar}
        render={(image) => (
          <Image
            width={36}
            height={36}
            className="w-[32px] h-[32px] rounded-full object-cover"
            src={image}
          />
        )}
      ></RenderIf>
      <div className="flex flex-col">
        <Content className="text-nowrap">{name}</Content>
        <Content className="text-[10px] text-gray-400">{email}</Content>
      </div>
    </div>
  )
}

export default Profile
