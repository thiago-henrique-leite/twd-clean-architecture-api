import { UserData } from '../../../src/entities/user-data'
import { UserRepository } from '../../../src/usecases/resgister-user-on-mailing-list/ports/user-repository'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'
import { RegisterUserOnMailingList } from '../../../src/usecases/resgister-user-on-mailing-list/register-user-on-mailing-list'
import { InvalidEmailError } from '../../../src/entities/errors/invalid-email-error'
import { InvalidNameError } from '../../../src/entities/errors/invalid-name-error'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.perform({ name, email })
    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe(name)
    expect(response.value.name).toBe(name)
  })

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const response = await usecase.perform({ name: name, email: invalidEmail })
    const user = await repo.findUserByEmail(invalidEmail)
    expect(user).toBeNull()
    expect(response.value).toBeInstanceOf(InvalidEmailError)
  })

  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@mail.com'
    const response = await usecase.perform({ name: invalidName, email: email })
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.value).toBeInstanceOf(InvalidNameError)
  })
})
