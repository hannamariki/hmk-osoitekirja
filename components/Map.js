import { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default function Mapp() {
  const [address, setAddress] = useState({
    address: "",
    latitude: null, 
    longitude: null,
  });

  //const [keyword, setKeyword] = useState("");
  
  const getLocation = async () => {
    try {
      let response = await fetch(`https://geocode.maps.co/search?q=${keyword}`); 
      let data = await response.json(); 
      console.log(data)

      if (data.length > 0) { 
        const { lat, lon } = data[0]; // otetaan vain ensimmäinen tieto
        setAddress({ ...address, latitude: parseFloat(lat), //Api antaa vastauksen merkkijonona, pitää muutta numeroksi jotta toimii!
          longitude: parseFloat(lon)  }); 
       
      } else {
        Alert.alert('No results found'); 
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch coordinates'); 
      
    }
  };

  const handleFetch = () => {
    setAddress({ ...address, address: keyword });
    getLocation(); // kutsuu getLocation-funktiota painiketta painettaessa!!
  };

  
  return (
    <View style={styles.container}>
      {address.longitude && address.latitude && (
        <MapView
          style={{ width: "100%", height: "80%" }}
          region={{
            latitude: address.latitude,
            longitude: address.longitude,
            latitudeDelta: 0.0322, 
            longitudeDelta: 0.0221
          }}
        >
          <Marker
            coordinate={{
              latitude: address.latitude, 
              longitude: address.longitude
            }}
          />
        </MapView>
      )}
     {/* <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder='keyword' 
          value={keyword}
          onChangeText={text => setKeyword(text)} 
        />
        <Button title="SHOW" onPress={handleFetch}
          />
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    flexdirection: 'row'
  },
  textInput: {
    fontSize: 18,
    width: '100%', 
    marginBottom: 10, 
 
  },
});