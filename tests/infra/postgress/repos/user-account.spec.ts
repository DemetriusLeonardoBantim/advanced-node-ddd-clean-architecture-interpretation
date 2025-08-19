import { type LoadUserAccountRepository } from "@/data/contracts/repos";
import { newDb } from "pg-mem";
import { Column, Entity, getRepository, PrimaryGeneratedColumn } from "typeorm";

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load(
    params: LoadUserAccountRepository.Params
  ): LoadUserAccountRepository.Result {
    const pgUserRepo = getRepository(PgUser);

    const pgUser = await pgUserRepo.findOne({ email: params.email });

    if (pgUser !== undefined) {
      return {
        id: pgUser.id?.toString(),
        name: pgUser?.name,
      };
    }
  }
}

@Entity({ name: "usuarios" })
class PgUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "nome", nullable: true })
  name!: string;

  @Column()
  email!: string;

  @Column({ name: "id_facebook", nullable: true })
  facebookId?: string;
}

describe("PgUserAccountRepository", () => {
  describe("load", () => {
    it("Should return an account if email exists ", async () => {
      const db = newDb();
      const connection = await db.adapters.createTypeormConnection({
        type: "postgres",
        entities: [PgUser],
      });

      await connection.synchonize();
      const pgUserRepo = getRepository(PgUser);
      await pgUserRepo.save({ email: "" });
      const sut = new PgUserAccountRepository();

      const account = await sut.load({ email: "existing_email" });
      expect(account).toEqual({ id: "1" });
    });
  });
});
