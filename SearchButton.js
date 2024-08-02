import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const SearchButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={require('./search 1.png')} style={styles.image} />
      <Text style={styles.buttonText}></Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#FFA500',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: 60,
    height: 60,
  },
  buttonText: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },
});

export default SearchButton;
