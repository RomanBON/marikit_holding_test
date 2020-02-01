import React from 'react';

import { convertToNumber, formatCurrency } from '../../../utils';
import { Button, Table } from '../../ui';


type Props = {
  productsList: IProduct[];
  exchangeRates: IExchangeRates;
  basketProducts: IProduct[];
  category: ICategory;
  addProductToBasket: (product: IProduct) => void;
  removeProductToBasket: ({ id }: Partial<IProduct>) => void;
};

const CategoryTable = (props: Props) => {
  const {
    productsList,
    exchangeRates,
    basketProducts,
    category,
    addProductToBasket,
    removeProductToBasket
  } = props;

  const dataSource = productsList
    .filter((product) => category.products.includes(product.id))
    .map(product => {
      const { id, currency, available, name } = product;

      const productItemInBasket = basketProducts.find(item => item.id === id);
      const isDisabledDeleteButton = productItemInBasket
        ? productItemInBasket.quantity > 0
        : false
      ;
      const isDisabledAddButton = productItemInBasket
        ? productItemInBasket.quantity === available
        : false
      ;
      const productCurrencyRub = convertToNumber(currency * exchangeRates.rates.RUB);
      const productAvailableCount = productItemInBasket
        ? available - productItemInBasket.quantity
        : available
      ;

      return {
        key: id,
        name: name,
        available: productAvailableCount,
        price: formatCurrency(productCurrencyRub),
        actions: (
          <>
            <Button
              onClick={() => addProductToBasket(product)}
              disabled={isDisabledAddButton}
            >
              Добавить
            </Button>
            {isDisabledDeleteButton && (
              <Button styleType="danger" onClick={() => removeProductToBasket({ id })}>
                Удалить
              </Button>
            )}
          </>
        )
      };
    })
  ;
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Доступно',
      dataIndex: 'available',
      key: 'available',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      emptyText="Нет товаров в категории"
    />
  );
};

CategoryTable.displayName = 'CategoryTable';

export default CategoryTable;
