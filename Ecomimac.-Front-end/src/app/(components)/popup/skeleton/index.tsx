import themes from "./index.module.scss"

const Skeleton = () => {
  return (
    <div className={themes.frame}>
      <div className={themes.title}></div>
      <div className={themes.element}>
        <div className={themes.first}></div>
        <div className={themes.second}></div>
        <div className={themes.third}></div>
      </div>
      <div className={themes.handler}>
        <div className={themes.button}></div>
      </div>
    </div>
  )
}

export default Skeleton
