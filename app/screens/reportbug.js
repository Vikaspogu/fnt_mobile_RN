import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import axios from "axios";
import t from "tcomb-form-native";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import Toast from "../components/Toast";
import styles from "../styles/styles";
import settings from "../config/settings.json";

const Form = t.form.Form;

const Report = t.struct({
  reporter: t.String,
  description: t.String,
  reportedDate: t.Date
});

const options = {
  fields: {
    reporter: {
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
            height: 250,
            fontFamily: "overpass-regular"
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 250,
            fontFamily: "overpass-regular"
          }
        }
      }
    },
    reportedDate: {
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

export default class ReportBug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        reporter: "",
        description: "",
        reportedDate: ""
      },
      visible: false
    };
    this.setCurrentUser();
  }

  setCurrentUser = async () => {
    const username = await AsyncStorage.getItem("loggedInUser");
    this.setState({ value: { reporter: username, reportedDate: new Date() } });
  };

  onChange(value) {
    this.setState({ value });
  }

  reportBug = () => {
    const value = this.refs.form.getValue();
    if (value) {
      const { description, reporter, reportedDate } = value;
      axios
        .post(settings.BACKEND_URL.concat("reportedissue"), {
          description,
          reporter,
          reportedDate
        })
        .then(() => {
          this.setState({ visible: true });
          this.props.navigation.navigate("Profile");
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
          type={Report}
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
            title="Submit"
            buttonStyle={styles.saveBlueButton}
            onPress={this.reportBug}
          />
        </View>
      </ScrollView>
    );
  }
}
