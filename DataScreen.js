import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';



const DataScreen = ({ navigation }) => {
  const dataButtons = [
    { name: 'Mobile No List', navigateTo: 'MobileNoList', image: require('./assets/phone-call.png') },
    { name: 'Surname Wise', navigateTo: 'SurnameWise', image: require('./assets/license.png') },
    { name: 'Family List', navigateTo: 'FamilyList', image: require('./assets/family.png') },
    { name: 'Booth Wise', navigateTo: 'BoothWise', image: require('./assets/voting-booth.png') },
    { name: 'Age Wise', navigateTo:  'AgeVotersList', image: require('./assets/age-group.png') },
    { name: 'New Voters', navigateTo: 'NewVoters', image: require('./assets/contact.png') },
    { name: 'Survey Wise', navigateTo: 'SurveyWise', image: require('./assets/product-details.png') },
  ];

  const handleDataButtonPress = (button) => {
    if (button.navigateTo) {
      navigation.navigate(button.navigateTo);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.dataButtonsContainer}>
          {dataButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dataButton}
              onPress={() => handleDataButtonPress(button)}
            >
              <Image source={button.image} style={styles.dataButtonImage} />
              <Text style={styles.dataButtonText}>{button.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  dataButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dataButton: {
    backgroundColor: '#d9d9d9', // Change this color to your preferred color
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  dataButtonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  dataButtonText: {
    color: '#262626',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DataScreen;
