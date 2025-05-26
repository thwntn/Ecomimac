import { RouteMap } from "@/utils/common"
import { useGet } from "@/utils/hooks"
import Frame from "@/app/(components)/frame"
import Picture from "./components/picture"
import Row from "@/app/(components)/row"
import Column from "@/app/(components)/column"
import Information from "./components/information"
import IAM from "./components/iam"
import Activity from "./components/Activity"
import { AccountResponse } from "@/utils/interface"

const Profile = () => {
  const account = useGet<AccountResponse>(RouteMap.PROFILE)
  return (
    <Frame>
      <Picture account={account} />
      <Row gap={20}>
        <Column size={3}>
          <Information account={account} />
        </Column>
        <Column size={9} gap={16}>
          <IAM />
          <Activity />
        </Column>
      </Row>
    </Frame>
  )
}

export default Profile
