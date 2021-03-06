import db from "../src/db";
import DatabaseError from "../src/models/Errors/error.model";
import User from "../src/models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const sql = `SELECT uuid,username FROM application_user`;
    const { rows } = await db.query<User>(sql);

    return rows || [];
  }

  async findByUuid(uuid: string): Promise<User> {
    try {
      const values = [uuid];
      const sql = `SELECT uuid,username FROM application_user WHERE uuid = $1`;

      const { rows } = await db.query<User>(sql, values);
      const [user] = rows;

      return user;
    } catch (error) {
      throw new DatabaseError("Erro na requisição por Uuid", error);
    }
  }

  async createUser(user: User): Promise<string> {
    const script = `INSERT INTO application_user (
      username, 
      password
      ) VALUES($1,crypt($2,'my-pepper'))
      RETURNING uuid`;

    const values = [user.username, user.password];
    const { rows } = await db.query<{ uuid: string }>(script, values);
    const [newUser] = rows;
    return newUser.uuid;
  }

  async updateUser(user: User): Promise<void> {
    const script = `UPDATE application_user 
    SET
      username = $1, 
      password = crypt($2, 'my-pepper')
    WHERE uuid = $3
    `;

    const values = [user.username, user.password, user.uuid];
    await db.query<{ uuid: string }>(script, values);
  }

  async removeUser(uuid: string): Promise<void> {
    const script = `DELETE FROM application_user WHERE uuid=$1`;
    const values = [uuid];
    await db.query(script, values);
  }
}

export default new UserRepository();
