import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';



const SearchComponent = ({ onSubmit }) => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const colors = [
    { name: 'All', value: '#ffffff' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#008000' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Yellow', value: '#ffff00' },
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = () => {
    onSubmit({ from: fromText, to: toText, search: searchText, color: selectedColor });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="From"
            value={fromText}
            onChangeText={setFromText}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="To"
            value={toText}
            onChangeText={setToText}
          />
        </View>
        <View style={styles.radioContainer}>
          {colors.map((color, index) => (
            <View key={index} style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radio,
                  { backgroundColor: color.value },
                  selectedColor === color.value && styles.radioSelected,
                ]}
                onPress={() => handleColorSelect(color.value)}
              />
              <Text style={styles.radioText}>{color.name}</Text>
            </View>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your VoterID, Name or Partial Name"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 4,
  },
  inputHalf: {
    width: '48%',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  radioButtonContainer: {
    alignItems: 'center',
  },
  radio: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
  },
  radioSelected: {
    borderWidth: 5,
  },
  radioText: {
    fontSize: 12,
    textAlign: 'center',
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

export default SearchComponent;
