import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Places from './components/places';
import Map from './components/map';
import { useState } from 'react'; 

const Stack = createNativeStackNavigator(); // Tämä mahdollistaa eri näyttöjen näyttämisen pinojärjestyksessä.

export default function App() {
  const [places, setPlaces] = useState([]); // Tila osoitteiden tallentamiselle


  const addToPlaces = (entry) => {//funktiolla päivitetään places listaa tallentamalla uusi osoite siihen
    setPlaces([...places, entry]); // Lisää uusi osoite olemassa olevaan lista
    //console.log(places);
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Places"> 
        <Stack.Screen name="Places">
          {props => <Places {...props}  places={places} setPlaces={setPlaces} />} 
          {/*props tarkoittaa, että kaikki props-objektin avaimet ja arvot siirretään Places-komponentille.
          places={places} siirtää places tilan places komponenttiin
          setPlaces siirtää setPlaces tilan places komponenttiin
           */}
        </Stack.Screen>
        <Stack.Screen name="Map">
          {props => <Map {...props} places={places} onAddToPlaces={addToPlaces} />} 
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" /> 
    </NavigationContainer>
  );
}
