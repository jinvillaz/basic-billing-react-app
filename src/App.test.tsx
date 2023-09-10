import { render, screen } from '@testing-library/react'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './reducers/store'

test('renders Home page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const linkElement = screen.getByText(/Welcome to Basic Billing App/i)
  expect(linkElement).toBeInTheDocument()
})
