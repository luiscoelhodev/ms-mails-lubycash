import { kafka, TopicEnum } from '../src/kafkaConnector'
import { MessageFromAdonisProducer, SubjectEnum } from '../src/kafkaTypes'
import { sendMail } from '../src/sendMail'

async function myMSMockConsumer() {
  const consumer = kafka.consumer({ groupId: 'ms-group' })

  await consumer.connect()
  console.log('consumer connected successfully')
  await consumer.subscribe({ topic: TopicEnum.tokens, fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageData: MessageFromAdonisProducer = JSON.parse(message.value!.toString())
      await sendMail(messageData.user, SubjectEnum.token, messageData.token)
    },
  })
}

myMSMockConsumer()
