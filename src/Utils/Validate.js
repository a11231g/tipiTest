import Toast from "react-native-root-toast";

export function notBeEmpty(input, title) {
  if (!input || (input && input.trim() && input.trim().length === 0)) {
    Toast.show(title + " can not be empty", {
      duration: 3000,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });
  }
}
export function emailValidate(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    Toast.show("Email is not valid", {
      duration: 50000,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });
  }
}
