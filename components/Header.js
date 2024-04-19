import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={[styles.header, styles.border]}>
      <Text style={styles.title}>Writing Assist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2CB673',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 30,
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Header;
