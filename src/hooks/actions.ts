import { Dispatch, useContext } from 'react';

import StateContext from '../store/context';
import * as types from './types';


export interface IUseSetQuantityProps {
  product: IProduct;
  newQuantity: number;
}

export function useDispatch(): Dispatch<IAction> {
  const { dispatch } = useContext(StateContext);

  return dispatch;
}

export function useAddProductToBasket() {
  const dispatch = useDispatch();

  return function(product: IProduct): void {
    dispatch({
      type: types.BASKET_PRODUCT_ADD,
      payload: product,
    });
  };
}

export function useRemoveProductToBasket() {
  const dispatch = useDispatch();

  return function({ id }: Partial<IProduct>): void {
    dispatch({
      type: types.BASKET_PRODUCT_REMOVE,
      payload: { id },
    });
  };
}

export function useSetQuantity() {
  const dispatch = useDispatch();

  return function({ product, newQuantity }: IUseSetQuantityProps): void {
    dispatch({
      type: types.QUANTITY_SET,
      payload: { product, newQuantity },
    });
  };
}
