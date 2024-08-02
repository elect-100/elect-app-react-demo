import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';

const AgeVotersList = () => {
  const [limit, setLimit] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Ensure that limit, minAge, and maxAge are numbers and valid
      const limitValue = parseInt(limit, 10);
      const minAgeValue = parseInt(minAge, 10);
      const maxAgeValue = parseInt(maxAge, 10);

      if (isNaN(limitValue) || isNaN(minAgeValue) || isNaN(maxAgeValue)) {
        setError('Please enter valid numbers for limit and age.');
        setLoading(false);
        return;
      }

      const response = await fetch(`https://ind-pol-services.onrender.com/voters/age?limit=${limitValue}&offset=0&age_min=${minAgeValue}&age_max=${maxAgeValue}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Org-ID': '3948388a-7924-4c2b-8070-d9d87c0d5eea',
          'Authorization': 'apiKey pk:sk',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (limit && minAge && maxAge) {
      fetchData();
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Limit"
          value={limit}
          onChangeText={setLimit}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Min Age"
          value={minAge}
          onChangeText={setMinAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Max Age"
          value={maxAge}
          onChangeText={setMaxAge}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>Name: {item.fullName || 'N/A'}</Text>
              <Text style={styles.itemText}>Age: {item.voterAge || 'N/A'}</Text>
              <Text style={styles.itemText}>Voter ID: {item.epicId || 'N/A'}</Text>
              <Text style={styles.itemText}>Booth No: {item.boothNo || 'N/A'}</Text>
              <Text style={styles.itemText}>Booth Name: {item.boothName || 'N/A'}</Text>
              <Text style={styles.itemText}>VotingCenter: {item.votingCenter || 'N/A'}</Text>

            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 4,
  },
  submitButton: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default AgeVotersList;
