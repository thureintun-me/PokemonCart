import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screen/splash/SplashScreen";
import { useEffect, useState } from "react";
import UnAuthStack from "./stack/UnAuthStack";
import AuthStack from "./stack/AuthStack";


const Stack = createNativeStackNavigator();


const RootNavigator = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1300)

    }, [])
    return (
        <NavigationContainer>
            {
                isLoading ?
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    </Stack.Navigator>
                    :
                    token ? <AuthStack /> :
                        <UnAuthStack />
            }

        </NavigationContainer>
    )
}

export default RootNavigator