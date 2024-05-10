import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';

const TextProcessingScreen = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  // Hàm xử lý văn bản theo từng chức năng
  const processText = () => {
    // Xử lý văn bản ở đây dựa trên các chức năng
    // Ví dụ: grammar check, plagiarism check, text completion, paraphrasing
    // Ở đây chỉ đơn giản gán lại inputText cho outputText để minh họa
    setOutputText(inputText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập văn bản của bạn..."
        multiline
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Xử lý văn bản" onPress={processText} />
      <Text style={styles.output}>{outputText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  output: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TextProcessingScreen;
