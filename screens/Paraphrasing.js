import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet,Keyboard, ScrollView, FlatList, Clipboard, ActivityIndicator } from 'react-native';
import Together from 'together-ai';

const together = new Together({
  apiKey: '641a769976dea73fe13ea16626c136498408407c837df7b32ac4ca8b3bbd9014',
});

const openAIService = async (inputText) => {
  try {
    const response = await together.chat.completions.create({
      messages: [
        { role: 'system', content: 'Given an English input text, you are tasked with providing several paraphrased versions of the input text.' },
        { role: 'user', content: inputText },
      ],
      model: 'meta-llama/Llama-3-8b-chat-hf',
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in openAIService:', error);
    return 'Error occurred while processing your request.';
  }
};

const parseResponses = (response) => {
  const lines = response.split('\n').filter(line => line.trim() !== '');
  const versions = lines.map(line => line.replace(/^\d+\.\s/, ''));
  return versions.slice(1);
};

const Paraphrasing = () => {
  const [inputText, setInputText] = useState('');
  const [paraphrasedVersions, setParaphrasedVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleConfirm = async () => {
    setIsLoading(true); 
    Keyboard.dismiss();
    try {
      const response = await openAIService(inputText);
      const versions = parseResponses(response);
      setParaphrasedVersions(versions);
      setSelectedVersion(''); 
    } catch (error) {
      console.error('Error in handleConfirm:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSelectVersion = (version) => {
    setSelectedVersion(version);
    setParaphrasedVersions([]); 
  };

  const copyToClipboard = () => {
    Clipboard.setString(selectedVersion);
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#2CB673" />
        ) : (
          <>
            {!selectedVersion ? (
              <>
                <Text style={styles.outputLabel}>Paraphrased Versions</Text>
                <FlatList
                  data={paraphrasedVersions}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectVersion(item)}>
                      <Text style={styles.paraphrasedItem}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
            ) : (
              <>
                <Text style={styles.outputLabel}>Selected Version</Text>
                <View style={styles.outputContainer}>
                  <ScrollView>
                    <Text style={styles.outputText}>{selectedVersion}</Text>
                  </ScrollView>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },
  content: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingTop: 10,
    padding: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#2CB673',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: -10,
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
    marginBottom: 10,
  },
  outputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  outputText: {},
  paraphrasedItem: {
    padding: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    color: '#2CB673'
  },
  copyButton: {
    backgroundColor: '#2CB673',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Paraphrasing;
