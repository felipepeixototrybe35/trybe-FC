import * as bcrypt from 'bcryptjs';
import { createToken } from '../utils/token';
// import IToken from '../Interfaces/IToken';
import UserModel from '../database/models/users.model';

export default class UserService {
  private model = UserModel;

  public async login(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const token = createToken({ id: user.id, email: user.email, role: user.role });
    return { status: 200, data: { token } };
  }

  public async getByRole(id: number) {
    return this.model.findByPk(id);
  }
}
