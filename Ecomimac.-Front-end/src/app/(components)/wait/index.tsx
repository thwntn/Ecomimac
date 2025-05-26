import { CustomIconNames } from "../common"
import Image from "../image"
import Loading from "../loading"

const Wait = () => {
  return (
    <div className="flex items-center justify-center bg-[#f7f7f7] h-[100vh] w-[100vw] z-50 fixed inset-0">
      {/* <Image dir={CustomIconNames.LOADING} width={120} height={120}></Image> */}
      <Loading></Loading>
    </div>
  )
}

export default Wait
