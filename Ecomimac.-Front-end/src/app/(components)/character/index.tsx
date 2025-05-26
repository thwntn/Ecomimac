const DEFAULT_TEXT = "#"
const COLORS: string[] = [
  "#EF5350",
  "#EC407A",
  "#AB47BC",
  "#7E57C2",
  "#5C6BC0",
  "#42A5F5",
  "#29B6F6",
  "#26C6DA",
  "#26A69A",
  "#66BB6A",
  "#9CCC65",
  "#D4E157",
  "#FFEE58",
  "#FFCA28",
  "#FFA726",
  "#FF7043",
  "#8D6E63",
  "#B0BEC5",
  "#90A4AE",
  "#A1887F",
  "#E57373",
  "#F06292",
  "#BA68C8",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#4FC3F7",
  "#4DD0E1",
  "#4DB6AC",
  "#81C784",
  "#AED581",
  "#C5E1A5",
  "#FFF176",
  "#FFD54F",
  "#FFB74D",
  "#FF8A65",
  "#A1887F",
  "#90CAF9",
  "#A5D6A7",
  "#B39DDB",
  "#CE93D8",
  "#F48FB1",
  "#FFCC80",
  "#E0F7FA",
  "#E1BEE7",
  "#C5CAE9",
  "#B3E5FC",
  "#B2EBF2",
  "#FFE082",
  "#DCEDC8",
]

const Character = ({
  text,
  size,
  noColor,
  radius,
}: {
  text: string
  size?: number
  noColor?: boolean
  radius?: number
}) => {
  const character = text.length > 0 ? text[0] : DEFAULT_TEXT

  const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]
  return (
    <div
      style={{
        width: size,
        minWidth: size,
        backgroundColor: noColor ? undefined : randomColor(),
        color: noColor ? "black" : "white",
        borderRadius: radius,
      }}
      className="w-[40px] min-w-[40px] aspect-square text-[14px] font-bold rounded-full bg-slate-200 flex justify-center items-center"
    >
      {character}
    </div>
  )
}

export default Character
