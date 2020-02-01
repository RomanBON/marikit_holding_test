import copy from 'fast-copy';

import { transformCategories, transformProducts } from '../utils';
import { IUseSetQuantityProps } from './actions';
import {
  PRODUCTS_GET,
  PRODUCTS_GET__SUCCESS,
  PRODUCTS_GET__FAIL,
  CATEGORIES_GET,
  CATEGORIES_GET__SUCCESS,
  CATEGORIES_GET__FAIL,
  EXCHANGE_RATES_GET,
  BASKET_PRODUCT_ADD,
  BASKET_PRODUCT_REMOVE,
  QUANTITY_SET,
} from './types';


let typedCategories = [] as INames;

const reducer = (state: IState, action: IAction): IState => {
  const { payload } = action;

  switch (action.type) {
    case CATEGORIES_GET:
      return { ...state, fetched: false };

    case CATEGORIES_GET__SUCCESS:
      typedCategories = payload as INames;
      const transformedCategories = transformCategories(typedCategories);

      return {
        ...state,
        categories: transformedCategories,
        fetched: true,
      };

    case CATEGORIES_GET__FAIL:
      return { ...state, fetched: true };

    case PRODUCTS_GET:
      return { ...state, fetched: false };

    case PRODUCTS_GET__SUCCESS:
      const transformedProducts = transformProducts(payload, typedCategories);

      return {
        ...state,
        products: transformedProducts,
        fetched: true,
      };

    case PRODUCTS_GET__FAIL:
      return { ...state, fetched: true };

    case EXCHANGE_RATES_GET:
      return { ...state, exchangeRates: payload };

    case BASKET_PRODUCT_ADD:
      const basketCopiedToAdd = copy(state.basket);
      const indexToAdd = basketCopiedToAdd.findIndex(item => item.id === payload.id);
      const isIndexFounded = indexToAdd !== -1;
      let currentProduct;

      if (!isIndexFounded && payload.available > 0) {
        const totalAddedProducts = basketCopiedToAdd.push(payload);
        currentProduct = basketCopiedToAdd[totalAddedProducts - 1];
        currentProduct.quantity = 0;
      }

      if (isIndexFounded) {
        currentProduct = basketCopiedToAdd[indexToAdd];
      }

      if (
        currentProduct
        && currentProduct.available > 0
        && currentProduct.quantity < currentProduct.available
      ) {
        currentProduct.quantity += 1;
      }

      return { ...state, basket: basketCopiedToAdd };

    case BASKET_PRODUCT_REMOVE:
      const { id } = payload;
      const basketCopiedToRemove = copy(state.basket);
      const indexToRemove = basketCopiedToRemove.findIndex(item => item.id === id);
      basketCopiedToRemove.splice(indexToRemove, 1);

      return { ...state, basket: basketCopiedToRemove };

    case QUANTITY_SET:
      const { product, newQuantity } = payload as IUseSetQuantityProps;
      const basketCopiedToQuantitySet = copy(state.basket);
      const indexToQuantitySet = basketCopiedToQuantitySet.findIndex(item => item.id === product.id);
      const productToQuantitySet = basketCopiedToQuantitySet[indexToQuantitySet];
      if (
        newQuantity > 0
        && productToQuantitySet.available > 0
        && newQuantity <= productToQuantitySet.available
      ) {
        productToQuantitySet.quantity = newQuantity;
      }

      return { ...state, basket: basketCopiedToQuantitySet };

    default:
      break;
  }

  return state;
};

export default reducer;
