import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screen/login/Login";


const Stack = createNativeStackNavigator();
const UnAuthStack = () =>{
    
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="Login" component={Login}  />
        </Stack.Navigator>
    )
}

export default UnAuthStack