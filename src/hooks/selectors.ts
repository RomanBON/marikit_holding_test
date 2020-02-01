import { useContext } from 'react';

import StateContext from '../store/context';


export function useStoreSelector<StateType, StatePartType>(
  stateSelector: (store: StateType) => StatePartType
): StatePartType {
  const { state } = useContext(StateContext);

  return stateSelector(state as any);
}

export function useFetchData() {
  return useStoreSelector<IState, boolean>(
    state => state.fetched
  );
}

export function useCategoriesList() {
  return useStoreSelector<IState, ICategory[]>(
    state => state.categories
  );
}

export function useProductsList() {
  return useStoreSelector<IState, IProduct[]>(
    state => state.products
  );
}

export function useExchangeRatesList() {
  return useStoreSelector<IState, IExchangeRates>(
    state => (state.exchangeRates as IExchangeRates)
  );
}

export function useBasketProductsList() {
  return useStoreSelector<IState, IProduct[]>(
    state => state.basket
  );
}
