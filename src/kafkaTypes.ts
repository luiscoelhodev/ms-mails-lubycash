import { DateTime } from "luxon"

type MessageFromAdonisProducer = {
  user: User,
  token: string
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

export { MessageFromAdonisProducer, User, SubjectEnum }