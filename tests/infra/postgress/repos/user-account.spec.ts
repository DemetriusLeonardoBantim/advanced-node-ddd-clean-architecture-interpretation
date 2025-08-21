import { type LoadUserAccountRepository } from "@/data/contracts/repos";
import { newDb } from "pg-mem";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  type DataSource,
  type Repository,
} from "typeorm";

class PgUserAccountRepository implements LoadUserAccountRepository {
  constructor(private readonly repo: Repository<PgUser>) {}

  async load(
    params: LoadUserAccountRepository.Params
  ): Promise<LoadUserAccountRepository.Result> {
    const pgUser = await this.repo.findOne({
      where: { email: params.email },
    });

    if (pgUser !== undefined && pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name,
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
  let dataSource: DataSource;
  let pgUserRepo: Repository<PgUser>;

  beforeEach(async () => {
    const db = newDb();
    dataSource = await db.adapters.createTypeormDataSource({
      type: "postgres",
      entities: [PgUser],
    });

    await dataSource.initialize();
    await dataSource.synchronize();

    pgUserRepo = dataSource.getRepository(PgUser);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  describe("load", () => {
    it("Should return an account if email exists", async () => {
      await pgUserRepo.save({ email: "existing_email" });
      const sut = new PgUserAccountRepository(pgUserRepo);

      const account = await sut.load({ email: "existing_email" });

      expect(account).toEqual({ id: "1", name: null });
    });

    it("Should return undefined if email does not exists", async () => {
      await pgUserRepo.save({ email: "other_email" });
      const sut = new PgUserAccountRepository(pgUserRepo);

      const account = await sut.load({ email: "non_existing_email" });

      expect(account).toBeUndefined();
    });
  });
});
