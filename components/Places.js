
import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList, Text, Pressable, Alert } from 'react-native';

export default function Places({ places, onAddToPlaces, navigation, setPlaces }) {
   // console.log('Places data:', places);
  const [keyword, setKeyword] = useState("");
 

  const handleSelect = () => {
    //console.log("Selected place:", keyword);
   onAddToPlaces(keyword); // Kutsutaan App-komponentin funktiota, ja välitetään sinne kirjoitettu osoite
   navigation.navigate('Map', {address: keyword}); //siirtyy map komponenttiin ja välittää  address-parametrin, joka sisältää osoitteen (keyword)
   setKeyword("");
  };

  const handleFetch = (item) => {
    navigation.navigate('Map', {
        address: item.address, //välitetään map-komponentille address parametri, joka sisältää osoitteen (item.address) FatList-komponentista.
        
      });
    };
    const handleLongPress = (item) => {
        Alert.alert(
          "Do you want to remove the address?",
          "The addres will be deleted permanently",
          [
            {
              text: "CANCEL",
              style: "CANCEL"
            },
            { 
              text: "OK", 
              onPress: () => removePlaces(item.address) //popUP-ikkuna
            }
          ]
        );
      };
      const removePlaces = (address) => { //https://www.robinwieruch.de/react-remove-item-from-list/
        const newPlaces = places.filter((item) => item.address !== address); //uusi lista josta poistetaan haluttu osoite
        setPlaces(newPlaces); // asetetaan uusi lista vanhan listan paikalle, josta puuttuu haluttu osoite
      };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput} 
        placeholder='Type in address' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
      />
      <Button title="SHOW ON MAP" onPress={handleSelect} /> 
  
     
      <FlatList 
        keyExtractor={(item, index) => index.toString()}
        data={places} 
        renderItem={({ item }) => (
          <View>
            <Pressable onLongPress={() => handleLongPress(item)}><Text>{item.address}</Text></Pressable>
            <Pressable onPress={() => handleFetch(item)}>
              <Text>SHOW ON MAP</Text>
            </Pressable>
            </View>
            
        )} 
    
      />
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
