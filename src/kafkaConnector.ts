import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'ms-mails-lubycash',
  brokers: ['kafka:29092'],
})

enum TopicEnum {
  validations = 'customer-validation-results',
  tokens = 'new-password-tokens'
}

export { kafka, TopicEnum }