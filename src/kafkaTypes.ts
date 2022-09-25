import { DateTime } from "luxon"

type TokenMessageFromAdonisProducer = {
  user: User,
  token: string
}

type ValidationMessageFromAdonisProducer = {
  user: User,
  result: string
}

type User = {
  id: number
  secureId: string
  name: string
  cpf: string
  phone: string
  email: string
  password: string
  createdAt: DateTime
  updatedAt: DateTime
}

enum SubjectEnum {
  token = `Here's your token`,
  accepted = 'Hello, new Lubycash customer!',
  rejected = `We're sorry...`
}

export { TokenMessageFromAdonisProducer, User, SubjectEnum, ValidationMessageFromAdonisProducer }