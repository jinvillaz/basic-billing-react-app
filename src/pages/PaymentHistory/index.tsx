import { ChangeEvent, useState } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { selectPayments, selectRequestFinished } from '../../reducers/billing/billing.selectors'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { getPaymentHistoryByClientId, resetStatus } from '../../reducers/billing/billing.actions'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'PaymentID',
    width: 150,
  },
  {
    field: 'clientId',
    headerName: 'ClientID',
    width: 250,
    sortable: false,
  },
  {
    field: 'billId',
    headerName: 'Bill-ID',
    width: 250,
    sortable: false,
  },
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    width: 250,
    sortable: false,
    valueFormatter: params => {
      return format(new Date(params.value), 'MM/dd/yyyy')
    },
  },
]

export const PaymentHistory = () => {
  const [clientId, setClientId] = useState<string>('')
  const dispatch = useAppDispatch()
  const payments = useAppSelector(selectPayments)
  const requestFinished = useAppSelector(selectRequestFinished)

  const getPayments = () => {
    if (clientId.trim().length > 0) {
      dispatch(getPaymentHistoryByClientId(clientId))
    }
  }

  const handlerOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientId(e.target.value)
    dispatch(resetStatus())
  }

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '20px 0px' }}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2">Payment History</Typography>
        </Grid>
        <Grid item>
          <TextField id="clientId" type="number" variant="standard" onChange={handlerOnchange} value={clientId} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={getPayments}>
            Get payment history by client
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {payments.length > 0 && (
          <Grid item xs={12}>
            <DataGrid
              rows={payments}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
          </Grid>
        )}
        {requestFinished && payments.length === 0 && (
          <Grid container item xs={12} justifyContent="center" alignItems="center" sx={{ height: '400px' }}>
            <Typography variant="h4"> Not found payments for the client {clientId}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
