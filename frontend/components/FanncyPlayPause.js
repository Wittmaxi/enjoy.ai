import * as React from "react"
import Svg, { Path, G, Circle, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const FancyPlayPause = (props) => (
  <Svg
    width={214}
    height={222}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M213.224 110.401c0 55.383-24.963 84.117-87.311 84.117-62.348 0-104.682-28.734-104.682-84.117 0-55.382 30.056-80.105 92.404-80.105 62.349 0 99.589 24.723 99.589 80.105Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <Path
      d="M185.222 97.776C185.222 40.72 159.6 0 103.945 0 48.291 0 0 33.25 0 90.305c0 57.057 39.148 85.392 94.802 85.392s90.42-20.865 90.42-77.921Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <Path
      d="M195.384 122.791c-2.509 52.877-30.837 97.457-85.74 94.852-54.903-2.604-101.075-46.381-98.566-99.258 2.509-52.877 42.374-77.305 97.277-74.7 54.903 2.605 89.537 26.228 87.029 79.106Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <G filter="url(#a)">
      <Circle cx={107.358} cy={112.407} r={60.765} fill="#9EC7ED" />
    </G>
    <Path fill="#D9D9D9" d="M110 107h3v13h-3zM101 107h3v13h-3z" />
    <Defs></Defs>
  </Svg>
)

export default FancyPlayPause
