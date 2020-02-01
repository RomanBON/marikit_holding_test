import React from 'react';

import { Basket, Categories } from '../../containers';
import './style.css';


const CatalogPage: React.FC = () => (
  <div className={CatalogPage.displayName}>
    <Basket />
    <Categories />
  </div>
);

CatalogPage.displayName = 'CatalogPage';

export default CatalogPage;
