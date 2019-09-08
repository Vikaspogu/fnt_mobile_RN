import React, {Component} from 'react';
import {
  RefreshControl,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Card, Text, Icon} from 'react-native-elements';
import IconAD from 'react-native-vector-icons/AntDesign';
import {View} from 'native-base';
import axios from 'axios';
import {GoogleSignin} from 'react-native-google-signin';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import styles, {MIN_HEIGHT, MAX_HEIGHT} from '../styles/styles';
import {VOTESOCIAL, NOEVENTS, URL404, RVA} from '../utils/constants';
import {colors} from '../styles/colors';
import settings from '../config/settings';

const AnimatedIcon = Animatable.createAnimatableComponent(IconAD);

export default class VoteSocialEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      rows: [],
      liked: [],
      bounce: [],
      email: '',
    };
    GoogleSignin.configure({
      webClientId: settings.webClientId,
      offlineAccess: false,
    });
    this.getCurrentUser();
  }

  componentDidMount() {
    this.getAllRequestedSocial();
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    await this.setState({
      email: currentUser.user.email,
    });
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getAllRequestedSocial();
    this.setState({refreshing: false});
  };

  handleOnPressLike = (index, id, votes) => {
    if (votes === null) {
      votes = [];
    }
    if (!this.state.liked[index]) {
      votes.push(this.state.email);
    } else if (this.state.liked[index]) {
      var i = votes.indexOf(this.state.email);
      if (i > -1) {
        votes.splice(votes, 1);
      }
    }
    this.voteOnRequestedSocial(id, votes);
    this.state.bounce[index].bounceIn();
  };

  getAllRequestedSocial = () => {
    axios
      .get(settings.BACKEND_URL.concat('allrequestedsocial'))
      .then(res => {
        var likes = [];
        res?.data?.map(data => {
          likes.push(data?.votes?.includes(this.state.email));
        });
        this.setState({rows: res.data, liked: likes});
      })
      .catch(err => console.warn(err));
  };

  voteOnRequestedSocial = (id, votes) => {
    axios
      .put(settings.BACKEND_URL.concat('updaterequestedsocial/' + id), {
        votes,
      })
      .then(res => this.getAllRequestedSocial())
      .catch(err => console.warn(err));
  };

  render() {
    const {liked, rows} = this.state;
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
              <Text style={styles.navTitle}>{VOTESOCIAL}</Text>
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
            <Text style={styles.sectionTitle}>{VOTESOCIAL}</Text>
          </TriggeringView>
          {rows?.length === 0 ? (
            <Text style={styles.noEvent}>{NOEVENTS}</Text>
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
                <View style={styles.voteButtonContainer}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.handleOnPressLike(i, l.id, l.votes)}>
                    <AnimatedIcon
                      key={i}
                      ref={ref => {
                        this.state.bounce[i] = ref;
                      }}
                      name={liked[i] ? 'like1' : 'like2'}
                      color={liked[i] ? colors.dark_teal : colors.white}
                      size={34}
                      style={styles.voteIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.likeText}>
                    {l.votes == null ? 0 : l.votes.length} Likes
                  </Text>
                </View>
              </Card>
            ))
          )}
        </HeaderImageScrollView>
      </View>
    );
  }
}
