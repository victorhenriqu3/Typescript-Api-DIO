import db from "../src/db";
import User from "../src/models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const sql = `SELECT uuid,username FROM application_user`;
    const { rows } = await db.query<User>(sql);

    return rows || [];
  }

  async findByUuid(uuid: string): Promise<User> {
    const values = [uuid];
    const sql = `SELECT uuid,username FROM application_user WHERE uuid = $1`;

    const { rows } = await db.query<User>(sql, values);
    const [user] = rows;

    return user;
  }
}

export default new UserRepository();
