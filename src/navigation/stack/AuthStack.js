import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screen/home/HomeScreen";


const Stack = createNativeStackNavigator();
const AuthStack = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack