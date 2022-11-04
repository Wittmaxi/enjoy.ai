import { View, Button } from 'react-native';

function toggleStartStop () {
    console.log ('hii');
}

export default (props) => {
    return <View>
        <Button onPress={toggleStartStop} title="Start playing"> Start playing </Button>
    </View>;
}