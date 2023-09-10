import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  clientId: yup.string().required(),
  period: yup
    .string()
    .required()
    .matches(/^[0-9]{6}$/, 'The format must YYYYMM'),
  category: yup.string().required(),
})
