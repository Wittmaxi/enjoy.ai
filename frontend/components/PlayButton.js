import * as React from "react"
import Svg, { Path, G, Circle, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export default PlayButton = (props) => (
  <Svg
    width={100}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1858 962.024C1858 1444.62 1640.47 1695 1097.18 1695 553.892 1695 185 1444.62 185 962.024 185 479.433 446.911 264 990.202 264 1533.49 264 1858 479.433 1858 962.024Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <Path
      d="M1614 852.005C1614 354.827 1390.73 0 905.766 0 420.804 0 0 289.73 0 786.909 0 1284.09 341.128 1531 826.089 1531 1311.05 1531 1614 1349.18 1614 852.005Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <Path
      d="M1702.54 1069.98c-21.86 460.76-268.7 849.23-747.116 826.53-478.415-22.7-880.752-404.16-858.891-864.92 21.86-460.762 369.24-673.624 847.655-650.926 478.412 22.698 780.222 228.552 758.352 689.316Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <G filter="url(#a)">
      <Circle cx={935.5} cy={979.5} r={529.5} fill="#9EC7ED" />
    </G>
    <Path
      d="M988 988.16c6.667-3.849 6.667-13.471 0-17.32l-81.75-47.199c-6.667-3.849-15 .963-15 8.661v94.398c0 7.7 8.333 12.51 15 8.66l81.75-47.2Z"
      fill="#F8F3E9"
    />
    <Defs></Defs>
  </Svg>
)



