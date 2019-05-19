import { call, put, cps, select, take } from "redux-saga/effects";

export const LOAD = "tipi/film/LOAD";
export const LOAD_SUCCESS = "tipi/film/LOAD_SUCCESS";
export const LOAD_FAILURE = "tipi/film/LOAD_FAILURE";

const initialState = {
    result: [],
    loading: false,
    loaded: false,
    error: ""
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                result: action.result
            };
        default:
            return state;
    }
}

export function load() {
    return {
        type: LOAD,
    };
}

export function loadSuccess(result) {
    return {
        type: LOAD_SUCCESS,
        result
    };
}
export function loadFailure(error) {
    return {
        type: LOAD_FAILURE,
        error
    };
}

export function* watchLoad(client) {
    try {
        const baseImage ='https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
        const res =yield client.get('3/discover/movie?sort_by=popularity.desc&api_key=a465e2b5ca5ba1c81a34afc2c88e4f73');
        const imageArray = [
            baseImage + res.results[0].poster_path,
            baseImage + res.results[1].poster_path,
            'https://i.pinimg.com/originals/2e/29/c4/2e29c41787d04c4b3de4aa3832566357.jpg',
            baseImage + res.results[2].poster_path,
            baseImage + res.results[3].poster_path,
        ];
        yield put(loadSuccess(imageArray));
    } catch (error) {
        yield put(loadFailure())
    }
}
