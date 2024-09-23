import { StyleSheet, TextInput, Image, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const apiUrl = "https://run.mocky.io/v3/11b94179-5e39-4444-b3df-c799d47c13db";

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setEmail(data.email);
      })
      .catch(error => {
        console.error('Email fetching failed:', error);
      });
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      if (userName) {
        setName(userName);
      }
    } catch (loadError) {
      console.error('Loading name failed:', loadError);
    }
  };

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      Alert.alert('Success!', 'Name was saved.');
    } catch (saveError) {
      console.error('Saving name failed:', saveError);
    }
  };

  return (
    <View style={pgDesign.container}>
      <Image 
        source={{uri: 'https://picsum.photos/id/203/4032/3024'}} 
        style={pgDesign.image} 
      />
      <Text style={pgDesign.title}>{name}</Text>
      <TextInput 
        style={pgDesign.input} 
        placeholder="Enter your name" 
        value={name}
        onChangeText={setName} 
      />
      <Button title="Save" onPress={saveName} />
      <Text style={pgDesign.emailDisplay}>Email: {email ? email : 'Loading...'}</Text>
    </View>
  );
}

const pgDesign = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: -160
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 7
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 125,
    marginBottom: 25
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 10
  },
  nameDisplay: {
    fontSize: 18,
    marginTop: 10
  },
  emailDisplay: {
    marginTop: 10
  },
});
