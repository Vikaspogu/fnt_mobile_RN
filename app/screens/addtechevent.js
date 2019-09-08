import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import axios from "axios";
import t from "tcomb-form-native";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import Toast from "../components/Toast";
import styles from "../styles/styles";
import settings from "../config/settings.json";

const Form = t.form.Form;

const Tech = t.struct({
  topic: t.String,
  presenter: t.String,
  description: t.String,
  eventDate: t.Date
});

const options = {
  fields: {
    topic: {
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
    },
    presenter: {
      editable: false,
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

export default class AddTechEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        topic: "",
        presenter: "",
        description: "",
        eventDate: ""
      },
      visible: false
    };
    this.setCurrentUser();
  }

  setCurrentUser = async () => {
    const username = await AsyncStorage.getItem("loggedInUser");
    this.setState({ value: { presenter: username, eventDate: new Date() } });
  };

  onChange(value) {
    this.setState({ value });
  }

  updateImageUri = (keyword, id) => {
    axios
      .get(settings.SCRAPE_URL.concat("scrape/" + keyword))
      .then(res => {
        axios.put(settings.BACKEND_URL.concat("updaterequestedtalk/" + id), {
          photoUri: res.data.uri
        });
      })
      .catch(err => console.warn(err));
  };

  requestTechTalk = () => {
    const value = this.refs.form.getValue();
    if (value) {
      const { topic, presenter, description, eventDate } = value;
      axios
        .post(settings.BACKEND_URL.concat("requestedtalk"), {
          topic: topic,
          presenter: presenter,
          additionalInfo: description,
          date: eventDate
        })
        .then(res => {
          this.updateImageUri(res.data.topic, res.data.id);
          this.setState({ visible: true });
          this.props.navigation.navigate("TechEvents");
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
        <Form
          type={Tech}
          ref="form"
          options={options}
          value={this.state.value}
          onChange={() => this.onChange}
        />
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
            onPress={this.requestTechTalk}
            title="Submit"
            buttonStyle={styles.saveBlueButton}
          />
        </View>
      </ScrollView>
    );
  }
}
