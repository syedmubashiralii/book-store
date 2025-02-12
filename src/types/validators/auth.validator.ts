import * as zod from 'zod'
import i18n from '../../i18n'


export const LoginValidator = zod.object({
  email: zod.string().email(
    { message: i18n.t('enterEmail') }
  ),
  password: zod.string().min(6,
    {
      message: i18n.t('enterPassword'),
    })
})


export const RegisterValidator = zod.object({
  fullName: zod.string().min(3,
    {
      message: i18n.t('enterFullName'),
    }),
  email: zod.string().email(
    { message: i18n.t('enterEmail') }
  ),
  password: zod.string().min(6,
    {
      message: i18n.t('enterPassword'),
    }),
  confirmPassword: zod.string().min(6,
    {
      message: i18n.t('enterConfirmPassword'),
    }),
  termsAccepted: zod.boolean().refine(value => value === true, {
    message: i18n.t('pleaseacceptterms'),
  }),
})