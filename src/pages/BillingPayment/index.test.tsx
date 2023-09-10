import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { BillingPayment } from './'
import { Provider } from 'react-redux'
import { store } from '../../reducers/store'

test('renders component correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <BillingPayment />
      </MemoryRouter>
    </Provider>,
  )
  const textElement = getByText('Payment')
  expect(textElement).toBeInTheDocument()
})
