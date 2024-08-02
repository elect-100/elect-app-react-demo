import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity , navigation , navigate} from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { data } = route.params;

  const renderApiResponse = () => {
    if (!data) return null;

    return (
      <View style={styles.responseContainer}>
        {Array.isArray(data) ? (
          <FlatList
            data={data}
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
          Object.keys(data).map((key) => (
            <View key={key} style={styles.responseRow}>
              <Text style={styles.responseKey}>{formatKeyName(key)}:</Text>
              <Text style={styles.responseText}>{data[key]}</Text>
            </View>
          ))
        )}
      </View>
    );
  };

  const formatKeyName = (key) => {
    return key.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderApiResponse()}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
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
    width: 100,
  },
  responseText: {
    flex: 1,
  },
  homeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResultScreen;
