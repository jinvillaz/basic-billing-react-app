import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { PendingBilling } from './'
import { Provider } from 'react-redux'
import { store } from '../../reducers/store'

test('renders component correctly', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <PendingBilling />
      </MemoryRouter>
    </Provider>,
  )
  const textElement = getByText('Pending Bills')
  expect(textElement).toBeInTheDocument()
})
