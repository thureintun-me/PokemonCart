import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBar from '../../components/HeaderBar'
import PokemonCard from '../../components/Card'
import usePokemonCards from './hooks/usePokemonCards'
import useInfinitePokemonCards from './hooks/useInfinitePokemonCards'
import { useAppStore } from '../../store/appStore'
import { Search, ShoppingCart } from 'lucide-react-native'
import CartModal from '../../components/CartModal'


const HomeScreen = () => {

  const [modifyCardData, setModifyCardData] = useState([])
  const [filter, setFilter] = useState('')
  const { data, hasNextPage, fetchNextPage, isLoading, refetch } = useInfinitePokemonCards(filter)
  const { selectedCard, setSelectedCard } = useAppStore((state) => state)
  const [cartModalVisible, setCartModalVisible] = useState(false)

  const loadNextPageData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };


  useEffect(() => {
    const flattenData = data?.pages?.flatMap((page) => page.data)

    setModifyCardData(flattenData?.map((obj) => {
      const card = selectedCard.filter(item => item.id === obj.id)
      return { ...obj, isSelected: card.length > 0 ? true : false, count: card.length > 0 ? card[0].count : 0 }
    })
    )
  }, [data, selectedCard])


  

  const handleSelect = (item) => {
    const cardExists = selectedCard.some(obj => obj.id === item.id);

    if (!cardExists) {
      setSelectedCard([...selectedCard, { ...item, isSelected: true, count: 1 }]);
    } else {
      const cards = selectedCard.map(obj =>
        obj.id === item.id
          ? { ...obj, isSelected: !obj.isSelected }
          : { ...obj, count: 1 }
      )
      setSelectedCard(cards.filter(obj => obj.isSelected == true));
    }
  };

  return (
    <View style={styles.container}>

      <HeaderBar />
      <View style={{ marginTop: 70, marginHorizontal: 30 }}>
        <View style={{
          flexDirection: "row", height: 50,
          backgroundColor: "lightgrey",
          borderRadius: 20,
          paddingHorizontal: 20,
          alignItems: 'center'
        }}>
          <Search color={"grey"} />
          <TextInput
            placeholder='Search Pokemon by name'
            onChangeText={val => setFilter(val)}
            style={{
              flex: 1,
              height: 50,
              marginHorizontal: 10,
              fontFamily: "RobotoMono-Regular",

            }}
          />

        </View>

      </View>
      <FlatList
        style={{ marginTop: 0 }}
        ListFooterComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
              {
                hasNextPage ? <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 15 }}>Loading...</Text> : <Text style={{ fontFamily: "RobotoMono-Regular", fontSize: 15, color: "red" }}>{!isLoading ? "End of List" : "loading..."}</Text>
              }

            </View>
          )
        }}
        data={modifyCardData}
        renderItem={({ item, index }) => <PokemonCard item={item} handleSelect={handleSelect} />}
        onEndReached={loadNextPageData}

      />

      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
        <TouchableOpacity onPress={() => setCartModalVisible(!cartModalVisible)} style={{ width: 30, height: 30, }}>
          <ShoppingCart color={"#4d66d1"} size={50} />
          <View style={{
            width: 30, height: 30,
            backgroundColor: "red",
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: -10,
            left: 30
          }}>
            <Text>{selectedCard.length}</Text>
          </View>
        </TouchableOpacity>



      </View>

      <CartModal isVisible={cartModalVisible} setIsVisible={setCartModalVisible} />

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // justifyContent:'center'
  }
})

export default HomeScreen