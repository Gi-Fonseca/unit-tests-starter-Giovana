const request = require("supertest")
const createApp = require("../../app")

describe("API /produtos - testes de integração", () => {
  let app

  beforeEach(() => {
    app = createApp()
  });

  describe("GET /produtos", () => {
    test("Retorna 200 e um array com os produtos iniciais", async () => {
      const res = await request(app).get("/produtos");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBe(3)
    });
  });
  //! Teste GET/produtos/:id
  describe("GET /produtos/:id", () => {
    test("Retorna 200 e um array com o produto especifico", async () => {
      const res = await request(app).get("/produtos/1")

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("id", 1)
      expect(res.body).toHaveProperty("nome")
    });
  });
  //! POST
    describe("POST /produtos", () => {
    test("Deve retornar 201 e o produto criado com id gerado", async () => {
      const novoProduto = {nome: "Empada", preco: 6}
      const res = await request(app)
      .post("/produtos")
      .send(novoProduto) // Envia o JSON no corpo da requisição

      expect(res.status).toBe(201);            // Status Code 201 = Created
      expect(res.body).toHaveProperty("id")   // Verifica se a API gerou a chave "id"
      expect(res.body.nome).toBe("Empada")    // Verifica se salvou o nome correto
    });
    test("Deve retornar 400 com { erro: ... } quando o nome estiver faltando", async () => {
      const res = await request(app)
      .post("/produtos")
      .send({preco: 6}) // Enviando requisição SEM a propriedade "nome"

      expect(res.status).toBe(400);           // Status Code 201 = Created
      expect(res.body).toHaveProperty("erro")   // Verifica se a API gerou a chave "id"
    });
  });
  //!DELETE
      describe("DELETE /produtos/:id", () => {
    test("Deve retornar 204 quando o produto é removido com sucesso", async () => {
      const res = await request(app).delete("/produtos/1")

      expect(res.status).toBe(204)  
  });
      test("Deve retornar 404 com { erro: ... } quando o produto não existir", async () => {
      const res = await request(app).delete("/produtos/9999")

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty("erro")       
  });
});
})
