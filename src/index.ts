import { kafka, TopicEnum } from './kafkaConnector'
import { TokenMessageFromAdonisProducer, ValidationMessageFromAdonisProducer, SubjectEnum } from './kafkaTypes'
import { sendMail } from './sendMail'

async function tokenTopicConsumer() {
  const consumer = kafka.consumer({ groupId: 'ms-mails-token-group' })

  await consumer.connect()
  console.log('Token topic consumer connected successfully!')
  await consumer.subscribe({ topic: TopicEnum.tokens, fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageData: TokenMessageFromAdonisProducer = JSON.parse(message.value!.toString())
      await sendMail(messageData.user, SubjectEnum.token, messageData.token)
    },
  })
}

async function validationTopicConsumer() {
  const consumer = kafka.consumer({ groupId: 'ms-mails-validation-group' })

  await consumer.connect()
  console.log('Validation topic consumer connected successfully!')
  await consumer.subscribe({ topic: TopicEnum.validations, fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageData: ValidationMessageFromAdonisProducer = JSON.parse(message.value!.toString())
      messageData.result === 'Accepted' ? 
      await sendMail(messageData.user, SubjectEnum.accepted) :
      await sendMail(messageData.user, SubjectEnum.rejected)
    },
  })
}

tokenTopicConsumer()
validationTopicConsumer()