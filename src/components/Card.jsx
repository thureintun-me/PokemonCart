import { Image, View, Text, TouchableOpacity } from "react-native"

const PokemonCard = ({ item , handleSelect}) => {
    return (
        <View style={{ marginHorizontal: 50, marginTop: 100 }} >

            <View style={{
                height: 250, width: "100%",
                // backgroundColor: 'blue',
                //  marginHorizontal: 50,
                position: 'absolute',
                borderWidth: 0.5,
                borderColor: "black",
                borderRadius: 20,
                top: 300,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 25,
                    fontFamily: 'RobotoMono-Regular',
                    fontWeight:"bold"
                }}>{item.name}</Text>
                <Text style={{
                    marginVertical:15,
                    fontSize: 18,
                    fontFamily: 'RobotoMono-Regular'
                }}>{item.rarity}</Text>
                <View style={{ flexDirection: 'row',paddingHorizontal:60,width:"100%",justifyContent:'space-between', }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'RobotoMono-Regular'
                    }}>$ {item?.cardmarket.prices.averageSellPrice}</Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'RobotoMono-Regular'
                    }}>{item.isSelected ? item?.set.total- item.count : item?.set.total} left</Text>
                </View>

            </View>
            <View style={{ height: 350, width: "80%", alignSelf: 'center', borderRadius: 20, borderWidth: 1, borderColor: "lightgrey" }}>
                <Image source={{ uri: item.images.large }} style={{ width: '100%', height: "100%", borderRadius: 20 }} />
            </View>
            <TouchableOpacity onPress={()=>handleSelect(item)} style={{
                 height: 60, backgroundColor: item.isSelected ? "#000" : 'gold' , marginHorizontal: 50, 
                 marginTop: 165, borderRadius: "100%", justifyContent: 'center',
               
                  alignItems: 'center' }}>
                <Text style={{
                    fontSize: 23,
                    fontFamily: "RobotoMono-Regular",
                    color:"#fff"
                }}>{item.isSelected ? "Selected" : "Select"}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PokemonCard