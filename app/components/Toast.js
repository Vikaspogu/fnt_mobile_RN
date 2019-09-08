import { ToastAndroid } from "react-native";

// a component that calls the imperative ToastAndroid API
export default Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      50,
      150,
      50
    );
    return null;
  }
  return null;
};