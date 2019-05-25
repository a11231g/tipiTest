/**
 * startup action
 */

import { call, put, cps, select, take } from "redux-saga/effects";
import NavigationService from "../../Navigator/NavigationService";
export const REHYDRATE_SUCCESS = "eventMAster/rehydrate/REHYDRATE_SUCCESS";
export const START_REHYDRATE = "eventMAster/rehydrate/START_REHYDRATE";

export function startRehydrate(error) {
  return {
    type: START_REHYDRATE,
    error
  };
}
export function rehydrateSuccess() {
  return {
    type: REHYDRATE_SUCCESS
  };
}

export function* watchRehydrate(store, client, action) {
  const persist = store.getState();
  if (
    persist &&
    persist.auth &&
    persist.auth.skippedIntro
  ) {
    NavigationService.navigateAndReset("Welcome");
  } else {
    NavigationService.navigateAndReset("Intro");
  }
  yield store.dispatch(rehydrateSuccess());
}
