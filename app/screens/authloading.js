import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import styles from '../styles/styles';

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    // This will switch to the App screen or Auth screen and this loading screen will be unmounted and thrown away.
    this.props.navigation.navigate(isSignedIn ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
