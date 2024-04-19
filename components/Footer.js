import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={[styles.footer, styles.border]}>
      <TouchableOpacity style={[styles.footerItem, styles.borderRight]}>
        <Text style={styles.footerText}>Home page</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Text style={styles.footerText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#2CB673',
  },
  footerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: 'black',
  },
});

export default Footer;
