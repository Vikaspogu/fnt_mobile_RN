import React, { Component } from "react";
import { View, ScrollView, ToastAndroid } from "react-native";
import { Button, Icon } from "react-native-elements";
import axios from "axios";
import t from "tcomb-form-native";
import moment from "moment";

import Toast from "../components/Toast";
import styles from "../styles/styles";
import settings from "../config/settings.json";

const Form = t.form.Form;

const Social = t.struct({
  place: t.String,
  location: t.String,
  description: t.String,
  eventDate: t.Date
});

const options = {
  fields: {
    place: {
      stylesheet: {
        ...Form.stylesheet,
        controlLabel: {
          normal: styles.formLabel,
          error: styles.formLabel
        }
      }
    },
    location: {
      stylesheet: {
        ...Form.stylesheet,
        controlLabel: {
          normal: styles.formLabel,
          error: styles.formLabel
        }
      }
    },
    description: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        controlLabel: {
          normal: styles.formLabel,
          error: styles.formLabel
        },
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150,
            fontFamily: "overpass-regular"
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 150,
            fontFamily: "overpass-regular"
          }
        }
      }
    },
    eventDate: {
      mode: "date",
      config: {
        format: date => {
          return moment(date).format("YYYY-MM-DD");
        },
        dateFormat: date => {
          return moment(date).format("YYYY-MM-DD");
        }
      },
      stylesheet: {
        ...Form.stylesheet,
        controlLabel: {
          normal: styles.formLabel,
          error: styles.formLabel
        },
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            fontFamily: "overpass-regular"
          },
          error: {
            ...Form.stylesheet.textbox.error,
            fontFamily: "overpass-regular"
          }
        }
      }
    }
  }
};

export default class AddSocialEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  updateImageUri = (keyword, id) => {
    axios
      .get(settings.SCRAPE_URL.concat("scrape/" + keyword))
      .then(res => {
        axios.put(settings.BACKEND_URL.concat("updaterequestedsocial/" + id), {
          photoUri: res.data.uri
        });
      })
      .catch(err => console.warn(err));
  };

  requestSocialEvent = () => {
    const value = this.refs.form.getValue();
    if (value) {
      const { place, location, description, eventDate } = value;
      axios
        .post(settings.BACKEND_URL.concat("requestedsocial"), {
          place,
          location,
          additionalInfo: description,
          date: eventDate
        })
        .then(res => {
          this.updateImageUri(res.data.place, res.data.id);
          this.setState({ visible: true });
          this.props.navigation.navigate("SocialEvents");
        })
        .catch(err => console.warn(err));
    }
  };

  render() {
    return (
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.formContainer}
      >
        <Form type={Social} ref="form" options={options} />
        <Toast visible={this.state.visible} message="Successfully submitted!" />
        <View style={styles.buttonBottomView}>
          <Button
            icon={
              <Icon
                name="md-checkmark"
                size={15}
                color="white"
                type="ionicon"
                iconStyle={{ paddingRight: 20 }}
              />
            }
            title="Submit"
            buttonStyle={styles.saveBlueButton}
            onPress={this.requestSocialEvent}
          />
        </View>
      </ScrollView>
    );
  }
}
