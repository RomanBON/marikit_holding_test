import React from 'react';

import { IUseSetQuantityProps } from '../../../hooks/actions';
import { convertToNumber, formatCurrency } from '../../../utils';
import { InputNumberQuantity } from '../..';
import { Button, Table } from '../../ui';


type Props = {
  exchangeRates: IExchangeRates;
  basketProducts: IProduct[];
  categories: ICategory[];
  setQuantity: ({ product, newQuantity }: IUseSetQuantityProps) => void;
  removeProductToBasket: ({ id }: Partial<IProduct>) => void;
};

const BasketTable = (props: Props) => {
  const { exchangeRates, basketProducts, categories, setQuantity, removeProductToBasket } = props;
  const columns = [
    {
      title: 'Наименование товара и описание',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
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
  const dataSource = basketProducts.map(product => {
    const { id, name, quantity, available, categoryId } = product;
    const productCurrencyRub = convertToNumber(product.currency * exchangeRates.rates.RUB);
    const appropriateCategory = categories.find(category => category.id === categoryId);
    const appropriateCategoryName = appropriateCategory? `${appropriateCategory.name}. ` : '';

    return {
      key: id,
      name: `${appropriateCategoryName}${name}`,
      quantity: (
        <InputNumberQuantity
          value={quantity}
          min={1}
          max={available}
          isIncreased={exchangeRates.isIncreased}
          onChange={(e) =>
            setQuantity({ product, newQuantity: parseInt(e.target.value, 10) })
          }
          addon="шт."
          warningMessage={quantity === available ? 'Количество ограничено' : ''}
        />
      ),
      price: `${formatCurrency(productCurrencyRub)} / шт.`,
      actions: (
        <Button styleType="danger" onClick={() => removeProductToBasket({ id })}>
          Удалить
        </Button>
      ),
    };
  });
  const totalAmount = basketProducts.reduce(
    (a, b) => a + convertToNumber(b.currency * b.quantity * exchangeRates.rates.RUB),
    0
  );

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      className={`${BasketTable.displayName}__table`}
      emptyText="Нет товаров в корзине"
      total={`Общая стоимость: ${formatCurrency(totalAmount)}`}
    />
  );
};

BasketTable.displayName = 'BasketTable';

export default BasketTable;
