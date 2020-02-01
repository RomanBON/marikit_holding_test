import React from 'react';

import * as actions from '../../hooks/actions';
import * as selectors from '../../hooks/selectors';
import { BasketTable } from '../../components';
import './style.css';


const Basket: React.FC = () => {
  const exchangeRates = selectors.useExchangeRatesList();
  const basketProducts = selectors.useBasketProductsList();
  const categories = selectors.useCategoriesList();
  const setQuantity = actions.useSetQuantity();
  const removeProductToBasket = actions.useRemoveProductToBasket();

  return (
    <aside className={Basket.displayName}>
      <h2 className={`${Basket.displayName}__head`}>
        Корзина
      </h2>
      <BasketTable
        exchangeRates={exchangeRates}
        basketProducts={basketProducts}
        categories={categories}
        setQuantity={setQuantity}
        removeProductToBasket={removeProductToBasket}
      />
    </aside>
  );
};

Basket.displayName = 'Basket';

export default Basket;
