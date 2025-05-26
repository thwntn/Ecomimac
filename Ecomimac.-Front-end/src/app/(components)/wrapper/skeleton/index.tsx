import themes from "./index.module.scss"

const Skeleton = () => {
  return (
    <div className={themes.frame}>
      <div className={themes.content}>
        <div className={themes.first}></div>
        <div className={themes.second}></div>
        <div className={themes.third}></div>
      </div>
    </div>
  )
}

export default Skeleton
