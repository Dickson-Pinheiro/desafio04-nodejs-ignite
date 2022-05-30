import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {UsersRepository} from "../../repositories/implementations/UsersRepository"

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const existsUserWithEmail = this.usersRepository.findByEmail(email)

    if(existsUserWithEmail){
      throw new Error("User Already Exists")
    }
    const newUser = this.usersRepository.create({name, email})

    return newUser;
  }
}

export { CreateUserUseCase };
