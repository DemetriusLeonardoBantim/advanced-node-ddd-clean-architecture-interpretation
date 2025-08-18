import { type TokenGenerator } from "@/data/contracts/crypto/token";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

class JsonWebToken {
  constructor(private readonly secret: string) {}
  async generateToken(params: TokenGenerator.Params): Promise<void> {
    const expirationInSeconds = params.expirationInMs / 1000;
    jwt.sign({ key: params.key }, this.secret, {
      expiresIn: expirationInSeconds,
    });
  }
}

describe("JwtTokenGenerator", () => {
  it("Should call sign with correct params", async () => {
    const fakeJwt = jwt as jest.Mocked<typeof jwt>;
    const sut = new JsonWebToken("any_secret");

    await sut.generateToken({ key: "any_key", expirationInMs: 1000 });

    expect(fakeJwt.sign).toHaveBeenCalledWith(
      { key: "any_key" },
      "any_secret",
      {
        expiresIn: 1,
      }
    );
  });
});
