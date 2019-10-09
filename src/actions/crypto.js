import axios from 'axios';

import Configs from '../configs';
import {
    FETCH_SINGLE_PRICE,
    FETCH_SINGLE_PRICE_SUCCESSFUL,
    FETCH_SINGLE_PRICE_FAIL
} from './types';

export const fetchSinglePrice = (details = {}, onSuccess = () => {}, onFailure = () => {}) => {
    return dispatch => {
        dispatch({ type: FETCH_SINGLE_PRICE });

        const { from, to } = details;

        return axios
            // .get(`${Configs.cryptoCompare.API.baseURL}price?fsym=${from}&tsyms=${to}&&api_key=${Configs.cryptoCompare.token}`)
            .get(`${Configs.cryptoCompare.API.baseURL}pricemultifull?fsyms=${from}&tsyms=${to}&&api_key=${Configs.cryptoCompare.token}`)
            .then(response => {

                // console.log(response);
                dispatch({
                    type: FETCH_SINGLE_PRICE_SUCCESSFUL,
                    payload: { from, to, singlePrice: response.data}
                })
                onSuccess();
            })
            .catch(error => {
                dispatch({ type: FETCH_SINGLE_PRICE_FAIL });
                onFailure(error);
            });
    }
}
