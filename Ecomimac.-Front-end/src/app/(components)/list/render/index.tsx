import themes from "./index.module.scss"

interface IProps {
  column: number
}

const ListRender = (props: IProps) => {
  const rows = Array.from({ length: 3 })
  const cols = Array.from({ length: props.column })
  return (
    <div className={themes.frame}>
      {rows.map((_item, index) => (
        <div
          key={index}
          className={themes.row}
          style={{
            gridTemplateColumns: "repeat(" + props.column + ", minmax(0, 1fr))",
          }}
        >
          {cols.map((_item, key) => (
            <div key={key} className={themes.element}>
              <div className={themes.anim}></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ListRender
