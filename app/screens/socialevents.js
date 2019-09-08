import React, {Component} from 'react';
import {Text, View, RefreshControl, Image, Dimensions} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import axios from 'axios';
import {Fab} from 'native-base';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

import styles, {MIN_HEIGHT, MAX_HEIGHT} from '../styles/styles';
import {SOCIALEVENT, NOUPCOMING, URL404, RVA} from '../utils/constants';
import {colors} from '../styles/colors';
import settings from '../config/settings.json';

export default class SocialEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      rows: [],
      fabActive: false,
    };
  }

  componentDidMount() {
    this.getAllSocialEventsItems();
  }

  getAllSocialEventsItems = () => {
    axios
      .get(settings.BACKEND_URL.concat('allsocialevents'))
      .then(res => {
        this.setState({rows: res.data});
      })
      .catch(err => console.warn(err));
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getAllSocialEventsItems();
    this.setState({refreshing: false});
  };

  render() {
    const {rows, fabActive} = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => (
            <Image
              source={require('../img/richmond.jpg')}
              style={{
                width: Dimensions.get('window').width,
                height: MAX_HEIGHT,
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="white"
            />
          }
          scrollViewBackgroundColor={colors.grey_850}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <Text style={styles.navTitle}>{SOCIALEVENT}</Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>{RVA}</Text>
            </View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}>
            <Text style={styles.sectionTitle}>{SOCIALEVENT}</Text>
          </TriggeringView>
          <NavigationEvents
            onWillFocus={() => this.setState({fabActive: false})}
          />
          {rows?.length === 0 ? (
            <Text style={styles.noEvent}>{NOUPCOMING}</Text>
          ) : (
            rows?.map((l, i) => (
              <Card
                key={i}
                containerStyle={styles.cardView}
                image={{
                  uri: l.photoUri === '' ? URL404 : l.photoUri,
                }}>
                <Text style={styles.cardTitleEvent}>{l.place}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="md-calendar"
                    type="ionicon"
                    color={colors.darker_green}
                    iconStyle={{marginRight: 10}}
                  />
                  <Text style={styles.cardText}>
                    {moment(l.date).format('MMMM D, YYYY, h:mm a')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="md-pin"
                    type="ionicon"
                    color={colors.darker_red}
                    iconStyle={{marginRight: 10}}
                  />
                  <Text style={styles.cardText}>{l.location}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="md-information-circle"
                    type="ionicon"
                    color={colors.darker_blue}
                    iconStyle={{marginRight: 10}}
                  />
                  <Text style={styles.cardText}>{l.additionalInfo}</Text>
                </View>
              </Card>
            ))
          )}
        </HeaderImageScrollView>
        <Fab
          active={fabActive}
          direction="up"
          style={{backgroundColor: colors.light_red}}
          position="bottomRight"
          onPress={() => this.setState({fabActive: !fabActive})}>
          <Icon name="bars" type="font-awesome" color="white" />
          <Button
            style={{backgroundColor: colors.darker_blue}}
            onPress={() => {
              navigate('VoteSocialEvent');
              this.setState({fabActive: !fabActive});
            }}>
            <Icon name="md-podium" type="ionicon" color="white" />
          </Button>
          <Button
            style={{backgroundColor: colors.darker_green}}
            onPress={() => {
              navigate('AddSocialEvent');
              this.setState({fabActive: !fabActive});
            }}>
            <Icon name="md-add" type="ionicon" color="white" />
          </Button>
        </Fab>
      </View>
    );
  }
}
