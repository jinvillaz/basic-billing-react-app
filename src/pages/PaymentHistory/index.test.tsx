import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { PaymentHistory } from './'
import { Provider } from 'react-redux'
import { store } from '../../reducers/store'

test('renders component correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <PaymentHistory />
      </MemoryRouter>
    </Provider>,
  )
  const textElement = getByText('Payment History')
  expect(textElement).toBeInTheDocument()
})
