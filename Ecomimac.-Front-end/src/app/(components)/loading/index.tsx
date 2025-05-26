import themes from "./index.module.scss"

const Loading = () => {
  return (
    <div className={themes.frame}>
      <div className={themes.loader}></div>
    </div>
  )
}

export default Loading
