import moment from 'moment'
import passwordValidator from 'password-validator'

export const validatePassword = (password: string) => {
  const validator = new passwordValidator()
  validator.is().min(8).has().uppercase().has().lowercase().has().digits(1).has().symbols(1).has().not().spaces()

  return validator.validate(password, { list: true }) as string[]
}

export const validateUsername = new passwordValidator()
validateUsername.is().min(8).has().has().not().spaces()

export const validateEmail = (email: string) => {
  const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(String(email).toLowerCase())
}

export const validateName = (name: string) => {
  const regex = /^[a-z\d\-\s]+$/i

  return regex.test(name)
}

export const validateAge = (dob: string) => {
  return moment().diff(dob, 'years')
}

export const validatePhone = (phone) => {
  var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/

  return regex.test(phone)
}