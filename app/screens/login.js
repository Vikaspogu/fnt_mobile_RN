import React, {Component} from 'react';
import {View, Alert, Image} from 'react-native';
import {SocialIcon, Text} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

import styles from '../styles/styles';
import settings from '../config/settings';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._configureGoogleSignIn();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: settings.webClientId,
      offlineAccess: false,
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await this.setState({userInfo, error: null});
      if (userInfo) {
        await AsyncStorage.setItem('loggedInUser', userInfo.user.name);
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert(error.toString(), error.toString());
      }
    }
  };

  render() {
    const {wrapper, welcomeWrapper, welcomeText} = styles;
    return (
      <View style={wrapper}>
        <View style={welcomeWrapper}>
          <Text style={welcomeText}>Welcome to</Text>
          <Text style={welcomeText}>First n Thirds</Text>
          <View style={styles.logoContainer}>
            <Image source={require('../img/icon.png')} style={styles.logo} />
          </View>
          <View style={styles.buttonBottomView}>
            <SocialIcon
              title="Sign In With Google"
              button
              raised
              onPress={this._signIn}
              type="google-plus-official"
            />
          </View>
        </View>
      </View>
    );
  }
}
