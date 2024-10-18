
import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList, Text, Pressable, Alert } from 'react-native';

export default function Places({ places, navigation, setPlaces }) {
  const [keyword, setKeyword] = useState("");
 

  const handleSelect = () => {
    //console.log("Selected place:", keyword);
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
    <Text>PLACEFINDER</Text>
      <TextInput 
        style={styles.textInput} 
        placeholder='Type in address' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
      />
      <View style={styles.button}>
      <Button title="SHOW ON MAP" onPress={handleSelect} /> 
      </View>
     
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={places}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable onLongPress={() => handleLongPress(item)}>
              <Text style={styles.addressText}>{item.address}</Text>
            </Pressable>
            <Pressable onPress={() => handleFetch(item)} style={styles.showOnMapButton}>
              <Text style={styles.showOnMapText}>Show on map</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      padding: 30,
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 1, 
      borderBottomColor: 'gray', 
      borderTopWidth: 0, 
      borderLeftWidth: 0, 
      borderRightWidth: 0, 
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10, 
      backgroundColor: 'white', // Valkoinen taustaväri
      padding: 10, // Vähän täytettä
      width: '100%', // Täyttää koko leveydeltään
    },
    addressText: {
      flex: 1, 
      fontSize: 18,
    },
    showOnMapButton: {
      marginLeft: 10, 
      color: 'light gray', 
    },
      showOnMapText: {
        color: 'gray',
    },
    button: {
        padding: 20,
        
    },

  });
