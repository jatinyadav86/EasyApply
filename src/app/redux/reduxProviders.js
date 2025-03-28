'use client'
import { store } from "./store";

const { Provider } = require("react-redux");

export function ReduxProvider({ children }) {
    return <Provider store={store}>
        {children}
    </Provider>
}