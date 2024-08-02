import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import VoterRegistrationButton from './buttons/VoterRegistrationButton';
import ElectionsButton from './buttons/ElectionsButton';
import CandidateInfoButton from './buttons/CandidateInfoButton';
import ElectionResultsButton from './buttons/ElectionResultsButton';
import { useNavigation } from '@react-navigation/native';
import RegistrationForm from './RegistrationForm';
import { color } from 'react-native-elements/dist/helpers';
import { Linking } from 'react-native';

/////////////////////////////////////////////

const fetchWithHeaders = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Org-ID': '3948388a-7924-4c2b-8070-d9d87c0d5eea',
    'Authorization': 'apiKey pk:sk',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  return response.json();
};

///////////////////////////////////////////


const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const navigation = useNavigation();




  const buttons = [
    { name: '', image: require('./buttons/search 1.png') ,navigateTo: 'SearchComponent'  },
    { name: '', image: require('./buttons/start survey 1.png') ,  navigateTo: 'RegistrationForm' },
    { name: '', image: require('./buttons/booth 1.png') },
    { name: '', image: require('./buttons/survey report 1.png') },
    { name: '', image: require('./buttons/data 1.png'), navigateTo: 'DataScreen' },
    { name: '', image: require('./buttons/boardcast 1.png') , isBroadcast: true },
  ];

  const fetchData = async () => {
    try {
      const data = await fetchWithHeaders(`https://ind-pol-services.onrender.com/voters/wild-search/${searchText}`);
      setApiResponse(data);
      setShowResponse(true);
      navigation.navigate('Result', { data });
    } catch (error) {
      console.error('Failed to fetch data', error);
    
    }
  };


  const handleSubmit = () => {
    fetchData(`https://ind-pol-services.onrender.com/voters/wild-search/${searchText}`);
  };

  const handleButtonPress = (button) => {
    if (button.navigateTo) {
      navigation.navigate(button.navigateTo);
    } else if (button.isBroadcast) {
      openWhatsApp();
        } else {
      console.log(`${button.name} pressed`);
    }
  };


  const openWhatsApp = () => {
    const whatsappUrl = 'whatsapp://send?text=Hello'; // Change this to your desired WhatsApp message
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on your device');
    });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://your-image-url.com/lotus-flower.jpg' }} // replace with your image URL
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your VoterID, Name or Partial Name"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          
          <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>


          </View>
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleButtonPress(button)}
              >
                <Image source={button.image} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{button.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
         
        </ScrollView>
        <Image source={require('./Profiles1.jpg')} style={styles.bottomImage} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  searchContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  button: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10, // Ensure enough padding
  },
  buttonImage: {
    paddingTop: 10, // Ensure enough padding
    width: 80,
    height: 100,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomImage: {
    width: '115%',
    height: 440,
    resizeMode: 'center',
    position: 'absolute',
    bottom: 0,
  },
  submitButton: {
    backgroundColor: '#6200ea', // Change this color to your preferred color
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 4, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;