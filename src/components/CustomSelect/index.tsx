import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, FieldInputProps, FormikProps } from 'formik'

interface CustomSelectProps {
  name: string
  label: string
  options: string[]
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ name, label, options }) => {
  return (
    <Box>
      {label && <Typography>{label}</Typography>}
      <Field name={name}>
        {({ field, form }: { field: FieldInputProps<unknown>; form: FormikProps<CustomSelectProps> }) => (
          <TextField
            {...field}
            select
            variant="standard"
            onChange={e => {
              form.setFieldValue(name, e.target.value)
              form.setFieldTouched(name, true)
            }}
            onBlur={() => form.setFieldTouched(name, true)}
            fullWidth
          >
            {options.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Field>
      <Typography sx={{ color: 'red' }}>
        <ErrorMessage name={name} />
      </Typography>
    </Box>
  )
}
