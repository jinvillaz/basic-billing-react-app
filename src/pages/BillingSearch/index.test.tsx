import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { BillingSearch } from './'
import { Provider } from 'react-redux'
import { store } from '../../reducers/store'

test('renders component correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <BillingSearch />
      </MemoryRouter>
    </Provider>,
  )
  const textElement = getByText('Search bills by category')
  expect(textElement).toBeInTheDocument()
})
