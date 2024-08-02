import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegistrationForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    isRegistered: true,
    isInVoterList: true,
    has_form_6a: true,
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    sex: '',
    birthDate: '',
    mobileNumber: '',
    alternateMobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    vibhag: '',
    houseNumber: '',
    society: '',
    oldTown: '',
    religion: '',
    caste: '',
    note: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://ind-pol-services.onrender.com/non-voters/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Org-ID': '3948388a-7924-4c2b-8070-d9d87c0d5eea',
          'Authorization': 'apiKey pk:sk',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      Alert.alert('Success', 'Registration Successful');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, please try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Registration Form</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            value={formData.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Middle Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Middle Name"
            value={formData.middleName}
            onChangeText={(text) => handleChange('middleName', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Age"
            value={formData.age}
            onChangeText={(text) => handleChange('age', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={formData.sex}
            onValueChange={(itemValue) => handleChange('sex', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Other" value="O" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.birthDate}
            onChangeText={(text) => handleChange('birthDate', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={formData.mobileNumber}
            onChangeText={(text) => handleChange('mobileNumber', text)}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Alternate Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Alternate Mobile Number"
            value={formData.alternateMobileNumber}
            onChangeText={(text) => handleChange('alternateMobileNumber', text)}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address Line 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Address Line 1"
            value={formData.addressLine1}
            onChangeText={(text) => handleChange('addressLine1', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address Line 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Address Line 2"
            value={formData.addressLine2}
            onChangeText={(text) => handleChange('addressLine2', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Vibhag</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Vibhag"
            value={formData.vibhag}
            onChangeText={(text) => handleChange('vibhag', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>House Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter House Number"
            value={formData.houseNumber}
            onChangeText={(text) => handleChange('houseNumber', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Society</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Society"
            value={formData.society}
            onChangeText={(text) => handleChange('society', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Old Town</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Old Town"
            value={formData.oldTown}
            onChangeText={(text) => handleChange('oldTown', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Religion</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Religion"
            value={formData.religion}
            onChangeText={(text) => handleChange('religion', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Caste</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Caste"
            value={formData.caste}
            onChangeText={(text) => handleChange('caste', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Note"
            value={formData.note}
            onChangeText={(text) => handleChange('note', text)}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistrationForm;
