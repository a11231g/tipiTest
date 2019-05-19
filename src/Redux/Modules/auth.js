import { call, put, cps, select, take, delay  } from "redux-saga/effects";
import { Platform } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";


import NavigationService from "../../Navigator/NavigationService";


export const SKIPP_INTRO = "tipi/auth/SKIPP_INTRO";


const initialState = {
  skippedIntro: false,

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SKIPP_INTRO:
      return {
        ...state,
        skippedIntro: true
      };
    default:
      return state;
  }
}

export function skipIntro() {
  return {
    type: SKIPP_INTRO
  };
}

export function* watchSkipIntro(client) {
  try {
    NavigationService.navigateAndReset("Welcome");
  } catch (error) {

  }
}
