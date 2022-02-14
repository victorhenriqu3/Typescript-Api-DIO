import db from "../src/db";
import User from "../src/models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const sql = `SELECT uuid,username FROM application_user`;
    const res = await db.query<User>(sql);
    const rows = res.rows;
    return rows || [];
  }
}

export default new UserRepository();
