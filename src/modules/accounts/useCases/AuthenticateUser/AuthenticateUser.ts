import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { jwt_secrets } from '@config/auth';
import { ICreateUserDTO } from '@modules/accounts/domain';
import { IHashProvider } from '@modules/accounts/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories';

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
      throw new Error('Email or password incorrect!');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!');
    }

    const { expiresIn, secret } = jwt_secrets;
    const { description, is_admin, name, phone_number } = user;

    const token = sign({ is_admin }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        user_id: user.id,
        name,
        email,
        description,
        phone_number,
      },
      token,
    } as IAuthResponse;
  }
}

export { AuthenticateUser };
