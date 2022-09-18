import { SubjectEnum, User } from "./kafkaTypes"

export function getTemplate(
  subject: string, 
  user: User, 
  token?: string,
  ) 
  {
  switch (subject) {
    case SubjectEnum.token:
      return `<p>${user.name}, use the token below to reset your password:</p><p>${token}</p>`
    case SubjectEnum.accepted:
      return `<h1>Hey, ${user.name}!</h1><p>We're very have to announce that you've been accepted as our new customer! We'd like to thank you for your interest in using our banking services and we hope to always serve you well.</p>`
    case SubjectEnum.rejected:
      return `<h1>Our apologies, ${user.name}.</h1><p>After studying the information you provided when you requested to be our customer, we couldn't accept you right now.</p>`
  }
}