import { ChangeEvent, useState } from 'react'
import { Button, Container, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { selectBills, selectRequestFinished } from '../../reducers/billing/billing.selectors'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { getBillsByCategory, resetStatus } from '../../reducers/billing/billing.actions'
import { BillCategory } from '../../model/Bill'

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

const CATEGORIES = Object.values(BillCategory)

export const BillingSearch = () => {
  const [category, setCategory] = useState<string>('')
  const dispatch = useAppDispatch()
  const bills = useAppSelector(selectBills)
  const requestFinished = useAppSelector(selectRequestFinished)

  const getBills = () => {
    dispatch(getBillsByCategory(category))
  }

  const handlerOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
    dispatch(resetStatus())
  }

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '20px 0px' }}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2">Search bills by category</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="clientId"
            select
            variant="standard"
            onChange={handlerOnchange}
            value={category}
            sx={{ width: '200px' }}
          >
            <MenuItem value="">Select category</MenuItem>
            {CATEGORIES.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={getBills}>
            Get bills by category
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
            <Typography variant="h4"> Not found bills for the category {category}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
