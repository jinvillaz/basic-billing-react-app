import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { store } from './reducers/store'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { PendingBilling } from './pages/PendingBilling'
import { PaymentHistory } from './pages/PaymentHistory'
import { BillingSearch } from './pages/BillingSearch'
import { BillingPayment } from './pages/BillingPayment'

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/billing/pending" element={<PendingBilling />} />
          <Route path="/billing/search" element={<BillingSearch />} />
          <Route path="/billing/payment-history" element={<PaymentHistory />} />
          <Route path="/billing/payment" element={<BillingPayment />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
