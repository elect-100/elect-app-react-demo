import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [searchText, setSearchText] = useState({
    fname: '',
    mname: '',
    lname: '',
    voterid: '',
    pattern: ''
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const buttons = [
    { name: 'Voter Registration' },
    { name: 'Voter Services' },
    { name: 'Download EPIC' },
    { name: 'Elections' },
    { name: 'Candidate Info' },
    { name: 'Election Results' },
  ];

  const fetchNameData = async () => {
    try {
      const response = await fetch(`https://ind-pol-services.onrender.com/voters/by-name?first_name=${searchText.fname}&middle_name=${searchText.mname}&last_name=${searchText.lname}`);
      const data = await response.json();
      setApiResponse(data);
      setShowResponse(true);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const fetchVoterIdData = async () => {
    try {
      const response = await fetch(`https://ind-pol-services.onrender.com/voters/epic/${searchText.voterid}`);
      const data = await response.json();
      setApiResponse(data);
      setShowResponse(true);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const fetchPatternData = async () => {
    try {
      const response = await fetch(`https://ind-pol-services.onrender.com/voters/match/${searchText.pattern}`);
      const data = await response.json();
      setApiResponse(data);
      setShowResponse(true);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const handleSubmit = () => {
    if (selectedValue === 'name') {
      fetchNameData();
    } else if (selectedValue === 'voterid') {
      fetchVoterIdData();
    } else if (selectedValue === 'pattern') {
      fetchPatternData();
    } else {
      console.warn('Submit action not defined for the selected option.');
    }
  };

  const renderSearchBar = () => {
    if (selectedValue === 'name') {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={searchText.fname}
            onChangeText={(text) => setSearchText({ ...searchText, fname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Middle Name"
            value={searchText.mname}
            onChangeText={(text) => setSearchText({ ...searchText, mname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={searchText.lname}
            onChangeText={(text) => setSearchText({ ...searchText, lname: text })}
          />
        </>
      );
    } else if (selectedValue === 'voterid') {
      return (
        <SearchBar
          placeholder="Type Voter ID Here..."
          onChangeText={(text) => setSearchText({ ...searchText, voterid: text })}
          value={searchText.voterid}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />
      );
    } else if (selectedValue === 'pattern') {
      return (
        <SearchBar
          placeholder="Enter first 2 letters of your first middle & last name"
          onChangeText={(text) => setSearchText({ ...searchText, pattern: text })}
          value={searchText.pattern}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
        />
      );
    }
    return null;
  };

  const renderApiResponse = () => {
    if (!apiResponse) return null;

    return (
      <View style={styles.responseContainer}>
        {Array.isArray(apiResponse) ? (
          <FlatList
            data={apiResponse}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.responseItem}>
                {Object.keys(item).map((key) => (
                  <View key={key} style={styles.responseRow}>
                    <Text style={styles.responseKey}>{formatKeyName(key)}:</Text>
                    <Text style={styles.responseText}>{item[key]}</Text>
                  </View>
                ))}
              </View>
            )}
          />
        ) : (
          Object.keys(apiResponse).map((key) => (
            <View key={key} style={styles.responseRow}>
              <Text style={styles.responseKey}>{formatKeyName(key)}:</Text>
              <Text style={styles.responseText}>{apiResponse[key]}</Text>
            </View>
          ))
        )}
      </View>
    );
  };

  const formatKeyName = (key) => {
    // Convert key to uppercase and replace underscores with spaces
    return key.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <ImageBackground
      source={{ uri: 'https://your-image-url.com/lotus-flower.jpg' }} // replace with your image URL
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)}
              items={[
                { label: 'Name', value: 'name' },
                { label: 'VoterID', value: 'voterid' },
                { label: 'Pattern', value: 'pattern' },
              ]}
              style={pickerSelectStyles}
              placeholder={{
                label: 'Select an option...',
                value: null,
              }}
            />
          </View>
          <View style={styles.searchContainer}>
            {renderSearchBar()}
            <Button
              title="Submit"
              onPress={handleSubmit}
            />
            {renderApiResponse()}
            {showResponse && (
              <Button
                title="Go to Home"
                onPress={() => {
                  setShowResponse(false);
                  setApiResponse(null);
                  navigation.navigate('Home');
                }}
              />
            )}
          </View>
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity key={index} style={styles.button}>
                <Text style={styles.buttonText}>{button.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
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
  dropdownContainer: {
    marginBottom: 20,
  },
  searchBarContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#e0e0e0',
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
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  responseItem: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  responseKey: {
    fontWeight: 'bold',
    marginRight: 5,
    width: 100, // Adjust width as needed for key column
  },
  responseText: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '30%',
    height: 100,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
});

export default HomeScreen;
