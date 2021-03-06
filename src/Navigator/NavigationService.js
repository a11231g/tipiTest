import { NavigationActions, StackActions } from "react-navigation";

/**
 * high level navigation helper: when app is ready navigator is equaled to app navigator
 * and you can call some actions form here
 */

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function navigateAndReset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params
        })
      ]
    })
  );
}

function goBack(key) {
  navigator.dispatch(
    NavigationActions.back({
      key: key
    })
  );
}

function returnNav(){
    return navigator
}

export default {
    navigate,
    navigateAndReset,
    goBack,
    setTopLevelNavigator,
    returnNav
};
