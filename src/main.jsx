import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import appRouter from './routes/userRoutes.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster richColors position='top-right' />
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
)
