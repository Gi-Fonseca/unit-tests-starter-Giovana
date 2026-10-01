const request = require('supertest');
const createApp = require('../app');

// Teste de integracao: API HTTP real
describe('API /clientes (integracao com supertest)', () => {
  let app;

  beforeEach(() => {
    //* App isolada
    app = createApp();
  });

  describe('GET /clientes', () => {
    test('retorna 200 e um array com os clientes iniciais', async () => {
      const res = await request(app).get('/clientes');

      //! Status OK
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /clientes/:id', () => {
    test('retorna 200 e o cliente quando o id existe', async () => {
      const res = await request(app).get('/clientes/1');

      //* ID 1
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    test('retorna 404 com mensagem de erro quando o cliente nao existe', async () => {
      const res = await request(app).get('/clientes/999');

      //! Erro 404
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('erro');
    });
  });

  describe('POST /clientes', () => {
    test('retorna 201 e o cliente criado com id gerado', async () => {
      const novoCliente = { nome: 'Carlos Silva', email: 'carlos@email.com' };
      const res = await request(app).post('/clientes').send(novoCliente);

      //! Criado 201
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nome).toBe(novoCliente.nome);
      expect(res.body.email).toBe(novoCliente.email);
    });

    test('retorna 400 quando o nome esta faltando', async () => {
      const res = await request(app)
        .post('/clientes')
        .send({ email: 'semnome@email.com' });

      //! Sem nome
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('erro');
    });

    test('retorna 400 quando o email esta faltando', async () => {
      const res = await request(app)
        .post('/clientes')
        .send({ nome: 'Sem Email' });

      //! Sem email
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('erro');
    });

    test('retorna 400 quando o email ja esta cadastrado', async () => {
      //* Busca email
      const listRes = await request(app).get('/clientes');
      const emailExistente = listRes.body[0].email;

      const res = await request(app).post('/clientes').send({
        nome: 'Cliente Duplicado',
        email: emailExistente,
      });

      //! Email duplicado
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('erro');
    });

    test('cliente criado aparece em GET /clientes', async () => {
      const novoCliente = { nome: 'Cliente Teste', email: 'teste@email.com' };
      await request(app).post('/clientes').send(novoCliente);

      //* Listagem atualizada
      const res = await request(app).get('/clientes');
      const existe = res.body.some((c) => c.email === novoCliente.email);
      expect(existe).toBe(true);
    });
  });

  describe('PUT /clientes/:id', () => {
    test('retorna 200 e o cliente atualizado quando o id existe', async () => {
      const dadosAtualizados = {
        nome: 'Ana Souza Editada',
        email: 'ana.editada@email.com',
      };

      const res = await request(app).put('/clientes/1').send(dadosAtualizados);

      //! Edição OK
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe(dadosAtualizados.nome);
      expect(res.body.email).toBe(dadosAtualizados.email);
    });

    test('retorna 404 quando o cliente nao existe', async () => {
      const res = await request(app)
        .put('/clientes/999')
        .send({ nome: 'Inexistente', email: 'inexistente@email.com' });

      //! Erro 404
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('erro');
    });

    test('retorna 400 quando o novo email ja pertence a outro cliente', async () => {
      //* Outro email
      const listRes = await request(app).get('/clientes');
      const emailDoSegundoCliente = listRes.body[1].email;

      const res = await request(app).put('/clientes/1').send({
        nome: 'Conflito de Email',
        email: emailDoSegundoCliente,
      });

      //! Conflito email
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('erro');
    });
  });

  describe('DELETE /clientes/:id', () => {
    test('retorna 204 quando o cliente e removido com sucesso', async () => {
      const res = await request(app).delete('/clientes/1');

      //! Status 204
      expect(res.status).toBe(204);
    });

    test('cliente removido nao aparece mais na listagem', async () => {
      await request(app).delete('/clientes/1');

      //* Sumiu do GET
      const res = await request(app).get('/clientes/1');
      expect(res.status).toBe(404);
    });

    test('retorna 404 quando o cliente nao existe', async () => {
      const res = await request(app).delete('/clientes/999');

      //! Erro 404
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('erro');
    });
  });
});