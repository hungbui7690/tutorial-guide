/*


*/

import bcrypt from 'bcryptjs'
import { connectDB } from '../db/postgres-connect.js'
import { users, posts } from '../db/data.js'

const client = await connectDB()

for (const user of users) {
  const text =
    'INSERT INTO users(id, username, password, image, createdAt) VALUES($1, $2, $3, $4, $5) RETURNING *'
  const values = [
    user.id,
    user.username,
    await bcrypt.hash(user.password, 10),
    user.image,
    new Date(),
  ]
  const res = await client.query(text, values)
}

for (const post of posts) {
  const text =
    'INSERT INTO posts(id, title, desc, image, body, userId, createdAt) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = [
    post.id,
    post.title,
    post.desc,
    post.image,
    post.body,
    post.userId,
    new Date(),
  ]
  const res = await client.query(text, values)
}
