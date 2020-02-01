import React from 'react';

import * as actions from '../../hooks/actions';
import * as selectors from '../../hooks/selectors';
import { Card, Loader } from '../../components/ui';
import { CategoryTable } from '../../components';
import './style.css';


const Categories: React.FC = () => {
  const isFetched = selectors.useFetchData();
  const productsList = selectors.useProductsList();
  const categoriesList = selectors.useCategoriesList();
  const exchangeRates = selectors.useExchangeRatesList();
  const basketProducts = selectors.useBasketProductsList();
  const addProductToBasket = actions.useAddProductToBasket();
  const removeProductToBasket = actions.useRemoveProductToBasket();

  function renderCategories() {
    if (!isFetched) {
      return <Loader />;
    }

    return categoriesList.map(category => (
      <Card isCollapsible title={category.name} key={category.id}>
        <CategoryTable
          productsList={productsList}
          exchangeRates={exchangeRates}
          basketProducts={basketProducts}
          category={category}
          addProductToBasket={addProductToBasket}
          removeProductToBasket={removeProductToBasket}
        />
      </Card>
    ));
  }

  return (
    <main className={Categories.displayName}>
      <h2>Категории с товарами</h2>
      {renderCategories()}
    </main>
  );
};

Categories.displayName = 'Categories';

export default Categories;
