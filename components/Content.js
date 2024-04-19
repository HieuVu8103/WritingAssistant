import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, View, TouchableOpacity, Text } from 'react-native';

const Content = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.content}>
        <View style={[styles.textInputContainer, styles.border]}>
            <ScrollView contentContainerStyle={styles.scrollView}>
            <TextInput
                style={styles.textInput}
                multiline
                placeholder='Write something!'
                onChangeText={setText}
                value={text}
                maxLength={500}
            />
            </ScrollView>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>  Grammar check </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Plagiarism check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 2,
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 20
  },
  scrollView: {
    flexGrow: 1,
    padding: 10,
  },
  textInputContainer: {
    height: 400,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    padding: 20,
    borderRadius: 12
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#2CB673',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Content;
