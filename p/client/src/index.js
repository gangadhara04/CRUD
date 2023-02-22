import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";

import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk"
import rootReducer from "./reduxComponent/Reduce";
const store=createStore(rootReducer,applyMiddleware(thunk))
console.log(store.getState());
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <Provider store={store}>
      <App/>
      </Provider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
