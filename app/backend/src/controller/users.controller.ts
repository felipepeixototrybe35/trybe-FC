import { Request, Response } from 'express';
import { verifyToken } from '../utils/token';
import UserService from '../services/users.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async postUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const result = await this.userService.login(email, password);

    return res.status(result.status).json(result.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    const decoded = verifyToken(token as string);
    const result = await this.userService.getByRole(decoded.id);
    return res.status(200).json({ role: result?.role });
  }
}
