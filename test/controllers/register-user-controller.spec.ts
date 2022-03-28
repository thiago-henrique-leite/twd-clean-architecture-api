import { HttpRequest, HttpResponse } from '@/controllers/ports'
import { RegisterUserController } from '@/controllers/register-user-controller'
import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/resgister-user-on-mailing-list'
import { UserRepository } from '@/usecases/resgister-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('Register user web controller', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@mail.com'
      }
    }

    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
})
