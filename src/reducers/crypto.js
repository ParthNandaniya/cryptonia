import {
    FETCH_SINGLE_PRICE,
    FETCH_SINGLE_PRICE_SUCCESSFUL,
    FETCH_SINGLE_PRICE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    from: '',
    to: '',
    singlePrice: {},

    fetchingSinglePrice: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case FETCH_SINGLE_PRICE:
            return { ...state, fetchingSinglePrice: true };

        case FETCH_SINGLE_PRICE_SUCCESSFUL:
            return { ...state, fetchingSinglePrice: false, from: action.payload.from, to: action.payload.to, singlePrice: action.payload.singlePrice };
            
        case FETCH_SINGLE_PRICE_FAIL:
            return { ...state, fetchingSinglePrice: false };


        default:
            return state;
    }
}