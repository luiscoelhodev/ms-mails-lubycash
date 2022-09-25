import { kafka, TopicEnum } from '../src/kafkaConnector'
import { ValidationMessageFromAdonisProducer, SubjectEnum } from '../src/kafkaTypes'
import { sendMail } from '../src/sendMail'

async function myValidationMockConsumer() {
  const consumer = kafka.consumer({ groupId: 'ms-group-validation' })

  await consumer.connect()
  console.log('consumer connected successfully')
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
myValidationMockConsumer()