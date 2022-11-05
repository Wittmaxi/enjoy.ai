import * as React from "react"
import Svg, { Path, G, Circle, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const FancyPlay = (props) => (
  <Svg
    width={214}
    height={222}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M213.883 110.405c0 55.382-24.963 84.116-87.311 84.116-62.348 0-104.682-28.734-104.682-84.116S51.946 30.3 114.295 30.3c62.348 0 99.588 24.723 99.588 80.105Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <Path
      d="M185.881 97.78c0-57.057-25.622-97.777-81.276-97.777C48.95.003.659 33.253.659 90.31s39.148 85.392 94.802 85.392 90.42-20.866 90.42-77.922Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <Path
      d="M196.043 122.794c-2.509 52.877-30.837 97.458-85.74 94.853-54.903-2.605-101.075-46.381-98.566-99.258 2.509-52.878 42.374-77.305 97.277-74.7 54.903 2.604 89.537 26.228 87.029 79.105Z"
      fill="#ADD5FA"
      fillOpacity={0.4}
    />
    <G filter="url(#a)">
      <Circle cx={108.017} cy={112.411} r={60.765} fill="#9EC7ED" />
    </G>
    <Path
      d="M114.042 113.404a1.147 1.147 0 0 0 0-1.987L104.66 106a1.148 1.148 0 0 0-1.721.994v10.833c0 .883.956 1.436 1.721.994l9.382-5.417Z"
      fill="#F8F3E9"
    />
    <Defs></Defs>
  </Svg>
)

export default FancyPlay
