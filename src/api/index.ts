import axios from 'axios';

const { PUBLIC_URL } = process.env;


const Api = {
  getProducts: (): IRequestPromise<IResponseWrap<{ Goods: IProductResponse[] }>> =>
    axios.get(`${PUBLIC_URL}/data.json`),

  getCategories: (): IRequestPromise<INames> =>
    axios.get(`${PUBLIC_URL}/names.json`),
};

export default Api;
