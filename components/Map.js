import { useState, useEffect,  } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default function Map({places, route, onAddToPlaces, navigation}) { //route välittää reitiltä tulleet parametrit, tässä tapauksessa osoitteet
const {address} = route.params || {}; //address: Haetaan reitiltä parametri address. Jos route.params on tyhjät, käytetään tyhjää objektia estämään virhe.
const [location, setLocation] = useState({
        latitude: null, 
        longitude: null,
    })

  useEffect(() => { // kun käyttäjä valitsee osoitteen, kutsutaan getLocation funktiota
    if (address) {
        getLocation(address);
    }
  }, [address]);

  
  const getLocation = async (place) => {
  
    try {
      let response = await fetch(`https://geocode.maps.co/search?q=${place}`); 
      let data = await response.json(); 
      console.log(data)

      if (data && data.length > 0) { 
        const { lat, lon} = data[0]; // otetaan vain ensimmäinen tieto
        setLocation({ 
            latitude: parseFloat(lat), //Api antaa vastauksen merkkijonona, pitää muutta numeroksi jotta toimii!
            longitude: parseFloat(lon),
        }); 
       
      } else {
        Alert.alert('No results found'); 
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch coordinates'); 
      
    }
  };

  const handleFetch = () => {
    if (address) { //Jos osoite on olemassa kutsutaan onAddToPlaces funktiota
      if(!places.some(places => places.address === address)){ //som() metodilla 
        onAddToPlaces({address}); //tallennetaan osoite
        navigation.navigate('Places');
    } else {
      Alert.alert('No address to save');
    }
  }};
  
  
  return (
    <View style={styles.container}>
      {location.longitude && location.latitude && (
        <MapView
          style={{ width: "100%", height: "80%" }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0322, 
            longitudeDelta: 0.0221
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude, 
              longitude: location.longitude
            }}
          />
        </MapView>
      )}
      <Button title="SAVE LOCATION" onPress={handleFetch}  disabled={places.some(places => places.address === address)}  /> 
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