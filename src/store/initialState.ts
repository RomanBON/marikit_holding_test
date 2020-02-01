import { BASE_CURRENCY, MIN_RUB_EX_RATE } from '../constants';


const initialState: IState = {
  products: [],
  categories: [],
  basket: [],
  exchangeRates: {
    rates: {
      RUB: MIN_RUB_EX_RATE,
      USD: 1,
    },
    base: BASE_CURRENCY,
    isIncreased: false,
  },
  fetched: false,
};

export default initialState;
