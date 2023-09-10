import { Button, Container, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useAppDispatch } from '../../reducers/hooks'
import { createPayment } from '../../reducers/billing/billing.actions'
import { CustomField } from '../../components/CustomField'
import { CustomSelect } from '../../components/CustomSelect'
import { validationSchema } from './schema'
import { BillCategory } from '../../model/Bill'
import { PaymentRequest } from '../../model/Payment'

const CATEGORIES = Object.values(BillCategory) as string[]

export const BillingPayment = () => {
  const dispatch = useAppDispatch()

  interface FormValues {
    clientId: string
    period: string
    category: string
  }

  const initValues = {
    clientId: '',
    period: '',
    category: CATEGORIES[0],
  }

  const onsubmit = (values: FormValues) => {
    const data: PaymentRequest = {
      clientId: parseInt(values.clientId),
      period: parseInt(values.period),
      category: values.category,
    }
    dispatch(createPayment(data))
  }

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '20px 0px' }}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2">Payment</Typography>
        </Grid>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={onsubmit}
        >
          {({ dirty, isValid }) => {
            return (
              <Form>
                <Grid container spacing={5} sx={{ padding: '30px 0px' }}>
                  <Grid item xs={12} textAlign="center">
                    <CustomField name="clientId" label="Client ID" type="number" />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <CustomField name="period" label="Period" type="number" />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <CustomSelect name="category" label="Category" options={CATEGORIES} />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button type="submit" variant="contained" disabled={!(isValid && dirty)}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )
          }}
        </Formik>
      </Grid>
    </Container>
  )
}
