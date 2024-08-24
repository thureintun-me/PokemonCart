

import { View, Text, useWindowDimensions, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useAppStore } from '../store/appStore'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import Toast from 'react-native-toast-message'

const CartModal = ({ isVisible, setIsVisible }) => {
    const { height, width } = useWindowDimensions()
    const { selectedCard, setSelectedCard } = useAppStore((state) => state)
    const toggleVisible = () => {
        setIsVisible(!isVisible)
    }

    const plusItem = (item) => {
        if ( item.count + 1 > item?.set.total) {
            Alert.alert("","Card is out of stock")
            return
        }

        const modifyCardList = selectedCard.map(obj =>
            obj.id === item.id
                ? { ...obj, count: obj.count + 1 }
                : obj)

        setSelectedCard(modifyCardList)

    }

    const minusItem = (item) => {
        const modifyCardList = selectedCard.map(obj =>
            obj.id === item.id
                ? { ...obj, count: obj.count - 1 }
                : obj).filter(item => item.count > 0)

        setSelectedCard(modifyCardList)


    }

    const totalPrice = selectedCard.reduce(
        (accumulator, item) => accumulator + (item.count * item?.cardmarket.prices.averageSellPrice),
        0,
    );
    const totalCard = selectedCard.reduce(
        (accumulator, item) => accumulator + item?.count,
        0,
    );
    return (
        <Modal onBackdropPress={toggleVisible} animationOut={'slideOutDown'} animationOutTiming={800} animationIn={'slideInUp'} animationInTiming={800} isVisible={isVisible} style={{ flex: 1, backgroundColor: "lightgrey", margin: 0, marginTop: height / 3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.9, }}>
                    <View style={{ flex: 0.8 }}>
                        <FlatList
                            style={{ marginVertical: 30 }}
                            contentContainerStyle={{ marginHorizontal: 30, rowGap: 20, }}
                            data={selectedCard}

                            renderItem={({ item, index }) => {

                                return (
                                    <View style={{ marginTop: 0, flexDirection: "row", justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row' }}>

                                            <Image source={{ uri: item.images.small }} style={{ width: 100, height: 150, borderRadius: 15 }} />
                                            <View style={{ marginLeft: 15, marginVertical: 20, justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={{ color: "#000", fontSize: 23, fontFamily: "RobotoMono-Regular" }}>{item.name}</Text>
                                                    <View style={{ flexDirection: "row", marginTop: 3 }}>
                                                        <Text style={{ fontSize: 13, fontFamily: "RobotoMono-Regular", color: "#000", fontWeight: '400' }}>${item?.cardmarket.prices.averageSellPrice}</Text>
                                                        <Text style={{ marginLeft: 5, fontSize: 13, fontFamily: "RobotoMono-Regular", color: "grey", fontWeight: '400' }}>per card</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <Text style={{ fontSize: 13, fontFamily: "RobotoMono-Regular", color: "darkred", fontWeight: '600' }}>{item?.set.total - item.count}</Text>
                                                    <Text style={{ marginLeft: 3, fontSize: 13, fontFamily: "RobotoMono-Regular", color: "grey", fontWeight: '400' }}> cards left</Text>

                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ marginVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{}}>
                                                <View style={{ marginLeft: 8 }}>
                                                    <TouchableOpacity onPress={() => plusItem(item)}>
                                                        <ChevronUp color={"#4d66d1"} size={20} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => minusItem(item)}>
                                                        <ChevronDown color={"#4d66d1"} size={20} />
                                                    </TouchableOpacity>

                                                </View>

                                                <Text style={{ color: '#4d66d1', fontFamily: "RobotoMono-Regular", fontSize: 15, fontWeight: "bold" }}>{item.count}</Text>
                                            </View>

                                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: '#000', fontFamily: "RobotoMono-Regular", fontSize: 13, }}>price</Text>
                                                <Text style={{ color: '#4d66d1', marginTop: 5, fontFamily: "RobotoMono-Regular", fontSize: 15, }}>$ {(item.count * item?.cardmarket.prices.averageSellPrice).toFixed(2)}</Text>
                                            </View>

                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => setSelectedCard([])}>
                            <Text style={{ textDecorationLine: 'underline', color: 'grey' }}>Clear All</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginHorizontal: 80, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 20, }}>Total Cards</Text>
                            <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 15, color: "darkred" }}>{totalCard}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                            <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 20, }}>Total Price</Text>
                            <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 20, color: "darkred" }}>$ {totalPrice.toFixed(2)}</Text>
                        </View>

                    </View>
                    <View style={{ marginHorizontal: 100, justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={() => {
                            toggleVisible()
                            setSelectedCard([])
                        }} style={{ backgroundColor: "#4d66d1", height: 58, borderRadius: 38, justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: "RobotoMono-Regular", color: "#fff" }}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: "flex-end", paddingBottom: 30, }}>
                    <TouchableOpacity onPress={toggleVisible} style={{ borderRadius: 30, width: 100, height: 30, backgroundColor: "red", justifyContent: 'center', alignItems: "center" }} >
                        <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 15, color: "#fff" }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CartModal