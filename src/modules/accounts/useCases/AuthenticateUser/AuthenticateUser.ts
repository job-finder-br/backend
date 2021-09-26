import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { jwt_secrets } from '@config/auth';
import { ICreateUserDTO } from '@modules/accounts/domain';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';
import { AppException } from '@shared/errors/AppException';

type IAuthRequest = {
  email: string;
  password: string;
};

type IAuthResponse = {
  token: string;
  user: Omit<ICreateUserDTO, 'password'>;
};

@injectable()
class AuthenticateUser {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppException({
        message: 'Email or password incorrect!',
        statusCode: 401,
      });
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppException({
        message: 'Email or password incorrect!',
        statusCode: 401,
      });
    }

    const { expiresIn, secret } = jwt_secrets;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: UserMapper.render(user),
      token,
    } as IAuthResponse;
  }
}

export { AuthenticateUser };
