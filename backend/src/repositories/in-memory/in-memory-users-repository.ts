import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)
    return !user ? null : user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      levelId: null,
      reset: 0,
      status: 1,
      createdAt: new Date(),
      updatedAt: null,
    }
    this.users.push(user)
    return user
  }
}
