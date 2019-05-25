/**
 * auth reducer checks if user pressed skiped button of intro or not
 */


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
