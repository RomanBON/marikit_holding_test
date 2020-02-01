import { useEffect, Dispatch } from 'react';

import Api from '../api';
import { fetchData, getRandomIntegerRange } from '../utils';
import * as types from '../hooks/types';
import { BASE_CURRENCY, MIN_RUB_EX_RATE, MAX_RUB_EX_RATE } from '../constants';


const FETCH_DELAY = 15 * 1000;

export default function useAPI (dispatch: Dispatch<any>, state: IState) {
  const { categories, products, exchangeRates } = state;

  // Get categories effect
  useEffect(() => {
    fetchData(
      Api.getCategories,
      dispatch,
      [
        types.CATEGORIES_GET,
        types.CATEGORIES_GET__SUCCESS,
        types.CATEGORIES_GET__FAIL
      ]
    );
  }, [dispatch]);

  // Get products effect, load after categories
  useEffect(() => {
    if (!categories.length) {
      return;
    }

    fetchData(
      Api.getProducts,
      dispatch,
      [
        types.PRODUCTS_GET,
        types.PRODUCTS_GET__SUCCESS,
        types.PRODUCTS_GET__FAIL
      ]
    );
  }, [categories, dispatch]);

  // Get exchange rates effect, load after products
  useEffect(() => {
    if (!products.length) {
      return;
    }

    const rateRub = getRandomIntegerRange(MIN_RUB_EX_RATE, MAX_RUB_EX_RATE);
    const isIncreased = rateRub > exchangeRates.rates.RUB;

    dispatch({
      type: types.EXCHANGE_RATES_GET,
      payload: {
        rates: {
          RUB: rateRub,
          USD: 1,
        },
        base: BASE_CURRENCY,
        isIncreased,
      },
    });
  }, [products, dispatch]);

  // Get products effect with delay in the background
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(
        Api.getProducts,
        dispatch,
        [
          types.PRODUCTS_GET,
          types.PRODUCTS_GET__SUCCESS,
          types.PRODUCTS_GET__FAIL
        ],
        true
      );
    }, FETCH_DELAY);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
}
