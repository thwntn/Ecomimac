import themes from "./index.module.scss"

const Skeleton = () => {
  return (
    <div className={themes.frame}>
      <div className={themes.header}>
        <div className={themes.circle}></div>
        <div className={themes.content}>
          <div className={themes.title}></div>
          <div className={themes.doc}></div>
        </div>
      </div>
      <div className={themes.body}>
        <div className={themes.left}>
          <div className={themes.rectangular}></div>
          <div className={themes.content}>
            <div style={{ width: 512 }} className={themes.record}></div>
            <div style={{ width: 312 }} className={themes.record}></div>
            <div style={{ width: 612 }} className={themes.record}></div>
            <div style={{ width: 112 }} className={themes.record}></div>
          </div>
        </div>
        <div className={themes.right}></div>
      </div>
      <div className={themes.session}></div>
    </div>
  )
}

export default Skeleton
