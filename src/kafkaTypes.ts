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

export { MessageFromAdonisProducer, User }