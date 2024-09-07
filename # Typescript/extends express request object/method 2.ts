import { type Request, type Response, type NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

// 1.
interface Payload extends JwtPayload {
  username: string
}
interface UserRequest extends Request {
  user: any
}

export const authenticateUser = async (
  req: UserRequest, // 2.
  res: Response,
  next: NextFunction
) => {
  const { username } = jwt.verify(
    '',
    process.env.JWT_SECRET || 'secret'
  ) as Payload // 3.
  req.user = { username } // 4.
}
