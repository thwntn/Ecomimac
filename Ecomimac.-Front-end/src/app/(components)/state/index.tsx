import themes from "./index.module.scss"

const State = ({
  name,
  color,
  background,
}: {
  name: string
  color: string
  background: string
}) => {
  return (
    <div className={themes.frame}>
      <div className={themes.dot} style={{ background }}>
        <div className={themes.main} style={{ background: color }}></div>
      </div>
      <div style={{ color }} className={themes.status}>
        {name}
      </div>
    </div>
  )
}

export default State
