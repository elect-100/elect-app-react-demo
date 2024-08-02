import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voter Details</Text>
      <Text>Name: {data.name}</Text>
      <Text>EPIC ID: {data.epic_id}</Text>
      <Text>Address: {data.address}</Text>
      {/* Add more fields as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DetailScreen;
