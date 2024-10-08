import request from "supertest";
import app from "../index"; // Ajuste o caminho conforme necessário

describe("User Controller - Login", () => {
  it("should log in successfully", async () => {
    const response = await request(app)
      .post("/api/login") // Lembre-se de incluir o prefixo da rota
      .send({ email: "test@test.com", password: "test" });

    expect(response.status).toBe(200); // Verifica se o status foi retornado
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Autenticado!",
      })
    );
  });

  it("should return 401 if password is invalid", async () => {
    const response = await request(app)
      .post("/api/login") // Lembre-se de incluir o prefixo da rota
      .send({ email: "test@test.com", password: "wrongpassword" });

    expect(response.status).toBe(401); // Verifica se o status foi retornado
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Senha invalida!",
      })
    );
  });
});
