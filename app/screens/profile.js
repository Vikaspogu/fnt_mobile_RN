import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Button, Text, Avatar, Card, Divider, Icon} from 'react-native-elements';
import {GoogleSignin} from 'react-native-google-signin';
import {NavigationActions} from 'react-navigation';
import styles from '../styles/styles';
import {colors} from '../styles/colors';
import settings from '../config/settings';

const navigateAction = NavigationActions.navigate({
  routeName: 'Auth',
  params: {},
  action: NavigationActions.navigate({routeName: 'AuthRoute'}),
});

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      title: '',
    };
    GoogleSignin.configure({
      webClientId: settings.webClientId,
      offlineAccess: false,
    });
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    await this.setState({
      name: currentUser.user.name,
      email: currentUser.user.email,
      title:
        currentUser.user.givenName.charAt(0) +
        currentUser.user.familyName.charAt(0),
    });
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.navigation.dispatch(navigateAction);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarView}>
          <Avatar
            rounded
            size="xlarge"
            title={this.state.title}
            activeOpacity={0.7}
            containerStyle={styles.avatarContainerStyle}
          />
        </View>

        <View>
          <Card containerStyle={styles.cardProfileView}>
            <Text style={styles.labelStyle}>{this.state.name}</Text>
            <Divider style={styles.dividerProfile} />
            <Text style={styles.labelStyle}>{this.state.email}</Text>
            <Divider style={styles.dividerProfile} />
            <Text style={styles.labelStyle}>Version: v0.0.1</Text>
            <Divider style={styles.dividerProfile} />
            <Text style={styles.labelStyle}>License: MIT</Text>
          </Card>
        </View>
        <View style={styles.profileBottomView}>
          <Button
            onPress={() => {
              navigate('ReportBug');
            }}
            icon={
              <Icon
                name="md-bug"
                size={20}
                color={colors.darker_red}
                iconStyle={{marginRight: 10}}
                type="ionicon"
              />
            }
            buttonStyle={styles.profileButtons}
            title="Report a Issue"
          />
          <Button
            onPress={this.signOut}
            icon={
              <Icon
                name="md-log-out"
                size={20}
                color={colors.darker_blue}
                iconStyle={{marginRight: 10}}
                type="ionicon"
              />
            }
            buttonStyle={styles.profileButtons}
            title="Sign Out"
          />
        </View>
      </ScrollView>
    );
  }
}
