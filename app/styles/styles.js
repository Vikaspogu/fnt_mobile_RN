import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {Header} from 'react-navigation-stack';

export const MIN_HEIGHT = Header.HEIGHT + 25;
export const MAX_HEIGHT = 250;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey_850,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: colors.white,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark_grey,
  },
  noEvent: {
    marginBottom: 10,
    marginTop: 40,
    fontFamily: 'overpass-regular',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  cardTitleEvent: {
    marginBottom: 10,
    fontFamily: 'overpass-regular',
    fontSize: 20,
    color: 'white',
  },
  cardText: {
    marginBottom: 10,
    fontFamily: 'overpass-regular',
    fontSize: 16,
    color: 'white',
  },
  profileButtons: {
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: colors.dark_grey,
  },
  saveBlueButton: {
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: colors.darker_blue,
  },
  //Profile page styles
  avatarStyle: {
    marginLeft: 50,
    marginTop: 100,
    marginBottom: 50,
  },
  avatarContainerStyle: {
    marginTop: 50,
    marginBottom: 50,
  },
  labelStyle: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'overpass-regular',
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'overpass-regular',
  },
  avatarView: {
    alignItems: 'center',
    marginTop: 10,
  },
  cardProfileView: {
    marginBottom: 20,
    backgroundColor: colors.dark_grey,
    borderColor: 'gray',
  },
  cardView: {
    backgroundColor: colors.dark_grey,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  dividerProfile: {
    backgroundColor: 'gray',
    marginTop: 10,
    marginBottom: 10,
  },
  //login screen stylesheets
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.dark_grey,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 50,
    padding: 20,
  },
  logo: {
    paddingBottom: 50,
    marginBottom: 40,
    width: 350,
    height: 250,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: 'overpass-regular',
    color: 'white',
  },
  buttonBottomView: {
    position: 'relative',
    justifyContent: 'flex-end',
    flex: 1,
  },
  profileBottomView: {
    position: 'relative',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  bottomTabColor: {
    backgroundColor: colors.grey_850,
  },
  //form style
  formLabel: {
    fontFamily: 'overpass-bold',
    fontSize: 18,
    color: colors.dark_100,
  },
  voteButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  likeText: {
    fontFamily: 'overpass-regular',
    fontSize: 20,
    color: 'white',
  },
  whiteText: {
    fontFamily: 'overpass-regular',
    color: 'white',
  },
  reportDescText: {
    fontFamily: 'overpass-regular',
    color: 'white',
    height: 200,
  },
  tabText: {
    fontFamily: 'overpass-regular',
    fontSize: 14,
    color: colors.white,
  },
  voteIcon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
  section: {
    padding: 15,
    backgroundColor: colors.dark_grey,
  },
  sectionTitle: {
    fontFamily: 'overpass-regular',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 30,
    fontFamily: 'overpass-regular',
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    fontFamily: 'overpass-regular',
  },
});
