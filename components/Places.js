import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

export default function Places({ handleFetch }) {
  const [keyword, setKeyword] = useState("");

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput} 
        placeholder='Type in anddress' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
      />
     <Button title="SHOW MAP" onPress={handleFetch} />
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
