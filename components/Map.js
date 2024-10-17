import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default function Map({places, onAddToPlaces, navigation}) {
  const [address, setAddress] = useState({
    address: "",
    latitude: null, 
    longitude: null,
  });

  useEffect(() => {
    if (places.length > 0) {
      const lastPlace = places[places.length - 1]; // Hae viimeinen lisätty osoite
      getLocation(lastPlace); // Kutsu getLocation funktiota
    }
  }, [places]);
  
  const getLocation = async (place) => {
  
    try {
      let response = await fetch(`https://geocode.maps.co/search?q=${place}`); 
      let data = await response.json(); 
      console.log(data)

      if (data && data.length > 0) { 
        const { lat, lon} = data[0]; // otetaan vain ensimmäinen tieto
        setAddress({ ...address, latitude: parseFloat(lat), //Api antaa vastauksen merkkijonona, pitää muutta numeroksi jotta toimii!
          longitude: parseFloat(lon),
        address: place  }); 
       
      } else {
        Alert.alert('No results found'); 
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch coordinates'); 
      
    }
  };


  const handleFetch = () => {
    if (address.address) { //varmistetaan että osoitteen voi tallentaa
      onAddToPlaces({address: address.address}); //kutsutaan App-komponentista anAddtoPlaces funktiota joka tallentaa address objektin (eli osoitteen) places taulukkoon
      //address objektille annetaan yksilöivä avain address, jonka arvo on address.address.
      //address on tilamuuttuja joka sisältää osoitteen, ja leveys- sekä pituuspiirin tiedot
      navigation.navigate('Places');
    } else {
      Alert.alert('No address to save');
    }
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
      <Button title="SAVE LOCATION" onPress={handleFetch} /> 
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