import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.square} onPress={() => handlePress('GrammarCheck')}>
          <Text style={styles.text}>Grammar check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square} onPress={() => handlePress('PlagiarismChecker')}>
          <Text style={styles.text}>Plagiarism checker</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.square} onPress={() => handlePress('TextCompletion')}>
          <Text style={styles.text}>Text completion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square} onPress={() => handlePress('Paraphrasing')}>
          <Text style={styles.text}>Paraphrasing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  square: {
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#2CB673',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
    color: "#FFFFFF"
  },
});

export default MainScreen;
