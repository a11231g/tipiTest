/**
 * saga watcher
 */

import { all, takeEvery } from "redux-saga/effects";
import { watchRehydrate, START_REHYDRATE } from "./Modules/rehydrate";

import {
  SKIPP_INTRO,
  watchSkipIntro,
} from "./Modules/auth";

import {
  LOAD,
  watchLoad,
} from "./Modules/filmImage";


export default function* root(client, store) {
  yield all([
    takeEvery(START_REHYDRATE, watchRehydrate, store, client),
    takeEvery(SKIPP_INTRO, watchSkipIntro, client),
    takeEvery(LOAD, watchLoad, client),

  ]);
}
