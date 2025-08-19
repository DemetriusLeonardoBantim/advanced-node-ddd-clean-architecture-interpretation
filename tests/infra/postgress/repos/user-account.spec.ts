import { type LoadUserAccountRepository } from "@/data/contracts/repos";
import { newDb } from "pg-mem";

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load(
    params: LoadUserAccountRepository.Params
  ): LoadUserAccountRepository.Result {}
}

describe("PgUserAccountRepository", () => {
  describe("load", () => {
    it("Should return an account if email exists ", async () => {
      const db = newDb();
      const connection = await db.adapters.createTypeormConnection({
        type: "postgres",
        entities: [],
      });

      await connection.synchonize();

      const sut = new PgUserAccountRepository();

      await sut.load({ email: "existing_email" });
    });
  });
});
