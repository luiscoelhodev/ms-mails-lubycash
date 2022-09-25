import { kafka, TopicEnum } from '../src/kafkaConnector'
import { TokenMessageFromAdonisProducer, SubjectEnum } from '../src/kafkaTypes'
import { sendMail } from '../src/sendMail'

async function myMSMockConsumer() {
  const consumer = kafka.consumer({ groupId: 'ms-group' })

  await consumer.connect()
  console.log('consumer connected successfully')
  await consumer.subscribe({ topic: TopicEnum.tokens, fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageData: TokenMessageFromAdonisProducer = JSON.parse(message.value!.toString())
      await sendMail(messageData.user, SubjectEnum.token, messageData.token)
    },
  })
}

myMSMockConsumer()
