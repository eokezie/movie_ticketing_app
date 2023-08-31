import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/theme';


const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {navigation.push('MovieDetails')}}>
        <Text style={styles.header}>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black
  },
  header: {
    color: COLORS.White
  }
});

export default HomeScreen;