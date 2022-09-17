import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'ms-mails-lubycash',
  brokers: ['localhost:9092'],
})

enum TopicEnum {
  validations = 'customer-validation-results',
  tokens = 'new-password-tokens'
}

export { kafka, TopicEnum }