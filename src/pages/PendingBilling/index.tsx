import { ChangeEvent, useState } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { selectPendingBills, selectRequestFinished } from '../../reducers/billing/billing.selectors'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { getBillsPendingByClientId, resetStatus } from '../../reducers/billing/billing.actions'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'BillID',
    width: 150,
  },
  {
    field: 'clientId',
    headerName: 'ClientID',
    width: 250,
    sortable: false,
  },
  {
    field: 'period',
    headerName: 'Period',
    width: 250,
    sortable: false,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 250,
    sortable: false,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 250,
    sortable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    sortable: false,
  },
]

export const PendingBilling = () => {
  const [clientId, setClientId] = useState<string>('')
  const dispatch = useAppDispatch()
  const bills = useAppSelector(selectPendingBills)
  const requestFinished = useAppSelector(selectRequestFinished)

  const getBills = () => {
    if (clientId.trim().length > 0) {
      dispatch(getBillsPendingByClientId(clientId))
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
          <Typography variant="h2">Pending Bills</Typography>
        </Grid>
        <Grid item>
          <TextField id="clientId" type="number" variant="standard" onChange={handlerOnchange} value={clientId} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={getBills}>
            Get bills by client
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        {bills.length > 0 && (
          <Grid item xs={12}>
            <DataGrid
              rows={bills}
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
        {requestFinished && bills.length === 0 && (
          <Grid container item xs={12} justifyContent="center" alignItems="center" sx={{ height: '400px' }}>
            <Typography variant="h4"> Not found bills for the client {clientId}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
