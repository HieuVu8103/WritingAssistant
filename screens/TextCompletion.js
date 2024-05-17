import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';

const TextCompletion = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleConfirm = () => {
    // Xử lý logic khi người dùng xác nhận
    // Ở đây tạm thời gán outputText bằng inputText
    setOutputText(inputText);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Enter your text"
          onChangeText={setInputText}
          value={inputText}
          multiline
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
        <Text style={styles.outputLabel}>Output Text</Text>
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{outputText}</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70
  },
  content: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingTop: 10,
    padding: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#2CB673',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outputContainer: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center'
  },
  outputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  outputText: {

  },
});

export default TextCompletion;
