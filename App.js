import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Places from './components/places';
import Map from './components/map';
import { useState } from 'react'; 

const Stack = createNativeStackNavigator(); // Tämä mahdollistaa eri näyttöjen näyttämisen pinojärjestyksessä.

export default function App() {
  const [places, setPlaces] = useState([]); // Tila osoitteiden tallentamiselle

  const addToPlaces = (entry) => {
    setPlaces([...places, entry]); // Lisää uusi osoite olemassa olevaan lista
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Places"> 
        <Stack.Screen name="Places">
          {props => <Places {...props} onAddToPlaces={addToPlaces} />} 
        </Stack.Screen>
        <Stack.Screen name="Map">
          {props => <Map {...props} places={places} />} 
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" /> 
    </NavigationContainer>
  );
}
