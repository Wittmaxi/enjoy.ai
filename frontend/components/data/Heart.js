import * as React from "react"
import { StyleSheet, View, Text} from 'react-native';
import Svg, { Path } from "react-native-svg"

export default Heart = ({ hr }) => {
    return (
        <View style={styles.container}>
            <Svg
                width={24}
                height={24}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 21.593C6.37 16.054 1 11.296 1 7.191 1 3.4 4.068 2 6.281 2c1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447C20.266 2.01 23 3.631 23 7.191c0 4.069-5.136 8.625-11 14.402ZM17.726 1.01c-2.203 0-4.446 1.042-5.726 3.238C10.715 2.042 8.478 1 6.281 1 3.098 1 0 3.187 0 7.191 0 11.852 5.571 16.62 12 23c6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
                    fill="#000"
                    fillOpacity={0.75}
                />
            </Svg>
            <Text>:</Text>
            <Text>{hr}</Text>
        </View>
    )


}
const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent:'space-around',
    width:'80%'
    }
});

