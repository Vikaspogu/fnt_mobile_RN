/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, YellowBox} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SafeAreaView from 'react-native-safe-area-view';
import DeviceInfo from 'react-native-device-info';
import {Icon, Text} from 'react-native-elements';

import TechEvents from './screens/techevents';
import SocialEvents from './screens/socialevents';
import AddTechEvent from './screens/addtechevent';
import AddSocialEvent from './screens/addsocialevent';
import VoteSocialEvent from './screens/votesocialevent';
import Profile from './screens/profile';
import Login from './screens/login';
import ReportBug from './screens/reportbug';
import AuthLoadingScreen from './screens/authloading';
import styles, {MIN_HEIGHT} from './styles/styles';
import {colors} from './styles/colors';

export const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export const TechTalkStack = createStackNavigator(
  {
    TechEvents: {
      screen: TechEvents,
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
        headerTransparent: true,
      },
    },
    AddTechEvent: {
      screen: AddTechEvent,
      navigationOptions: {
        title: 'Add Tech Event',
        headerStyle: {
          backgroundColor: colors.dark_grey,
          height: MIN_HEIGHT,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'overpass-regular',
          fontSize: 24,
          fontWeight: undefined,
        },
      },
    },
  },
  {
    initialRouteName: 'TechEvents',
    headerLayoutPreset: 'center',
  },
);

TechTalkStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export const SocialEventStack = createStackNavigator(
  {
    SocialEvents: {
      screen: SocialEvents,
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
        headerTransparent: true,
      },
    },
    AddSocialEvent: {
      screen: AddSocialEvent,
      navigationOptions: {
        title: 'Add Social Events',
        headerStyle: {
          backgroundColor: colors.dark_grey,
          height: MIN_HEIGHT,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'overpass-regular',
          fontSize: 24,
          fontWeight: undefined,
        },
      },
    },
    VoteSocialEvent: {
      screen: VoteSocialEvent,
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
        headerTransparent: true,
        headerTintColor: 'white',
      },
    },
  },
  {
    initialRouteName: 'SocialEvents',
    headerLayoutPreset: 'center',
  },
);

SocialEventStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index === 1) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile',
        headerStyle: {
          backgroundColor: colors.dark_grey,
          height: MIN_HEIGHT,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'overpass-regular',
          fontSize: 24,
          fontWeight: undefined,
        },
      },
    },
    ReportBug: {
      screen: ReportBug,
      navigationOptions: {
        title: 'Report a Issue',
        headerStyle: {
          backgroundColor: colors.dark_grey,
          height: MIN_HEIGHT,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'overpass-regular',
          fontSize: 24,
          fontWeight: undefined,
        },
      },
    },
  },
  {
    initialRouteName: 'Profile',
    headerLayoutPreset: 'center',
  },
);

ProfileStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export const Tabs = createMaterialTopTabNavigator(
  {
    SocialEventStack: {
      screen: SocialEventStack,
      navigationOptions: {
        tabBarLabel: <Text style={styles.tabText}> Social Events </Text>,
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-map" type="ionicon" size={24} color={tintColor} />
        ),
      },
    },
    TechTalkStack: {
      screen: TechTalkStack,
      navigationOptions: {
        tabBarLabel: <Text style={styles.tabText}> Tech Talks </Text>,
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-school" type="ionicon" size={24} color={tintColor} />
        ),
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: <Text style={styles.tabText}> Profile </Text>,
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-contact" type="ionicon" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    barStyle: styles.bottomTabColor,
    resetOnBlur: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: colors.dark_100,
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
      },
    },
  },
);

//TODO add hasNotch functioanlity, remove warning
if (Platform.OS === 'android' || DeviceInfo.hasNotch()) {
  SafeAreaView.setStatusBarHeight(25);
  YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
  ]);
}

let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Tabs,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default () => <Navigation theme="dark" />;
