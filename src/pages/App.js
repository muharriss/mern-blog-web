import React from 'react';
import '../pages/App.css';
import { Navigation, store } from '../config';
import { Provider } from 'react-redux';



const App = () => {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );

}

export default App;