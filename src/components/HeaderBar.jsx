import { Image, Text, View } from "react-native"


const HeaderBar = () => {

    return (
        <View style={{ height: 200, backgroundColor: 'lightgrey',alignItems:'center' }}>
            <View style={{flex:1,alignItems:'center',marginTop:80}}>
                <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 20 }}>Pokémon TCG Market</Text>
            </View>

            <View style={{ position: "absolute", width: 100, height: 100, borderRadius: 100, backgroundColor: '#4d66d1', alignSelf: 'center', marginTop: 150 }}>
                <Image source={require('../../assets/pokemonSplash.png')} style={{ width: 100, height: 100 }} />
            </View>
        </View>
    )
}

export default HeaderBar