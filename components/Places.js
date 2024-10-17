import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList, Text, } from 'react-native';

export default function Places({ places, onAddToPlaces, navigation }) {
    console.log('Places data:', places);
  const [keyword, setKeyword] = useState("");

  const handleSelect = () => {
    console.log("Selected place:", keyword);
   onAddToPlaces(keyword); // Kutsutaan App-komponentin funktiota
   navigation.navigate('Map');
   setKeyword("");
  };

  const handleFetch = () => {

  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput} 
        placeholder='Type in anddress' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
      />
     <Button title="SHOW ON MAP" onPress={handleSelect} /> 

     <FlatList 
        keyExtractor={(item, index) => index.toString()}
        data={places} 
        renderItem={({item}) => <Text>{item.address}</Text>} 
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
