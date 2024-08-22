import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screen/splash/SplashScreen";
import { useEffect, useState } from "react";
import UnAuthStack from "./stack/UnAuthStack";
import AuthStack from "./stack/AuthStack";
import { useAppStore } from "../store/appStore";


const Stack = createNativeStackNavigator();


const RootNavigator = () => {

    const { isLoading, token, setToken, setIsLoading } = useAppStore((state) => state)
    useEffect(() => {
        setIsLoading(true)
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