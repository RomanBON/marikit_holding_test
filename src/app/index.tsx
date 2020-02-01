import React, { useReducer } from 'react';

import reducer from '../hooks/reducer';
import useAPI from '../hooks/api';
import initialState from '../store/initialState';
import StateContext from '../store/context';
import { CatalogPage } from '../pages';
import './style.css';


const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useAPI(dispatch, state);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className={App.displayName}>
        <CatalogPage />
      </div>
    </StateContext.Provider>
  );
};

App.displayName = 'App';

export default App;
