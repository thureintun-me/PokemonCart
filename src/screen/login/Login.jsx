import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react-native'
import { useAppStore } from '../../store/appStore'

const Login = () => {
    const [isVisible,setIsVisible] = useState(false)
    const { isLoading, token, setToken, setIsLoading } = useAppStore((state) => state)
    const [userName,setUserName] = useState()
    const [password,setPassword] = useState()
    const toggleVisible = () =>setIsVisible(!isVisible)
    

    const onPressLogin = () =>{
        setToken(userName)
    }

    const handleUserName = val =>setUserName(val)
    const handlePassword = val => setPassword(val)

    
    return (
        <View style={styles.constiner}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/pokemonSplash.png')}
                    style={{ width: 150, height: 150 }} />
                <Text style={{ marginTop: 20, fontFamily: "RobotoMono-Regular", fontSize: 18 }}>Welcome to the Pokémon TCG Market</Text>
            </View>
            <View style={styles.formContainer}>

                <TextInput
                    onChangeText={handleUserName}
                    placeholder='User Name'
                    style={{ backgroundColor: "lightgrey", height: 50, borderRadius: 20, paddingHorizontal: 15, marginTop: 15, fontSize: 16,fontFamily: "RobotoMono-Regular" }}
                />
                <View style={{ flexDirection: 'row', backgroundColor: "lightgrey", height: 50, paddingHorizontal: 15, marginTop: 15, borderRadius: 20, alignItems: 'center' }}>
                    <TextInput
                        onChangeText={handlePassword}
                        secureTextEntry={!isVisible}
                        placeholder='Password'
                        style={{ flex: 1, fontSize: 16,fontFamily: "RobotoMono-Regular" }}
                    />
                    <TouchableOpacity  onPress={toggleVisible}>
                    {
                        isVisible ?  <EyeIcon color={'black'} size={25} /> :<EyeOffIcon color={'black'} size={25} />
                    }
                   </TouchableOpacity>
                </View>
                <TouchableOpacity
                onPress={onPressLogin}
                 style={{
                    backgroundColor: "#524dd1", height: 50, borderRadius: 20, paddingHorizontal: 15, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{fontSize:18,fontFamily: "RobotoMono-Regular",}}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    constiner: {
        flex: 1
    },
    imageContainer: {
        flex: 0.7,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor:"blue"
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 50,
        justifyContent: 'center'
        // backgroundColor:'red'
    }

})

export default Login