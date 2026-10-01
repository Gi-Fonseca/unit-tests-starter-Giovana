const ClienteService = require("../../services/ClienteService");

// Teste unitario: o service e testado em isolamento total.
describe("ClienteService (unitario com mocks)", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new ClienteService(mockRepository);
  });

  describe("listar", () => {
    test("chama repository.findAll uma vez e retorna o resultado", () => {
      //* Mock retorno
      const clientes = [{ id: 1, nome: "Ana Souza", email: "ana@email.com" }];
      mockRepository.findAll.mockReturnValue(clientes);

      const resultado = service.listar();

      //! Validação
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(clientes);
    });
  });

  describe("buscarPorId", () => {
<<<<<<< HEAD:api/__tests__/ClienteService.test.js
    test("Deve repassar o id ao mockRepository.findById e retornar o cliente encontrado", () => {
      //* Objeto único
      const cliente = { id: 1, nome: "Ana Souza", email: "ana@email.com" };
      mockRepository.findById.mockReturnValue(cliente);

      const resultado = service.buscarPorId(1);

      //! Retorno OK
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(cliente);
    });

    test("deve lancar erro quando o cliente nao existe", () => {
      //* Retorna null
      mockRepository.findById.mockReturnValue(null);

      //! Lança erro
      expect(() => service.buscarPorId(999)).toThrow("Cliente nao encontrado");
    });
=======
    test.todo("repassa o id ao repository e retorna o cliente encontrado");
    test.todo(
      "lanca erro 'Cliente nao encontrado' quando o repository retorna null",
    );
>>>>>>> 89b994eaa8ff6cdadda91e4ededefcbc83b682c5:api/__tests__/unit/ClienteService.test.js
  });

  describe("criar", () => {
    test("repassa os dados ao repository e retorna o cliente criado", () => {
      const dados = { nome: "Carlos", email: "carlos@gmail.com" };
      //* Spread operator
      const clienteSalvo = { id: 3, ...dados };

      mockRepository.create.mockReturnValue(clienteSalvo);

      const resultado = service.criar(dados);

      //! Valida chamada
      expect(mockRepository.create).toHaveBeenCalledWith(dados);
      expect(resultado).toEqual(clienteSalvo);
    });

    test("propaga o erro quando nome ou email estiverem faltando", () => {
      //* Força erro
      mockRepository.create.mockImplementation(() => {
        throw new Error("Nome e email sao obrigatorios");
      });

      //! Dispara exceção
      expect(() => service.criar({ nome: "Carlos" })).toThrow("Nome e email sao obrigatorios");
    });

    test("propaga o erro quando o email ja estiver cadastrado", () => {
      //* Sem acento
      mockRepository.create.mockImplementation(() => {
        throw new Error("Email ja cadastrado");
      });

      //! Dispara exceção
      expect(() => service.criar({ nome: "Carlos", email: "ana@email.com" })).toThrow("Email ja cadastrado");
    });
  });

  describe("atualizar", () => {
<<<<<<< HEAD:api/__tests__/ClienteService.test.js
    test("chama repository.findById e repository.update quando o cliente existe", () => {
      const clienteExistente = { id: 1, nome: "Ana", email: "ana@email.com" };
      const novosDados = { nome: "Ana Silva", email: "ana.silva@email.com" };

      mockRepository.findById.mockReturnValue(clienteExistente);
      mockRepository.update.mockReturnValue({ id: 1, ...novosDados });

      const resultado = service.atualizar(1, novosDados);

      //! Valida updates
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.update).toHaveBeenCalledWith(1, novosDados);
      expect(resultado).toEqual({ id: 1, ...novosDados });
    });

    test("lanca erro 'Cliente nao encontrado' sem chamar repository.update quando o cliente nao existe", () => {
      mockRepository.findById.mockReturnValue(null);

      //! Pegadinha import
      expect(() => service.atualizar(999, { nome: "Teste" })).toThrow("Cliente nao encontrado");
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    test("propaga o erro quando o novo email ja pertence a outro cliente", () => {
      mockRepository.findById.mockReturnValue({ id: 1, nome: "Ana", email: "ana@email.com" });

      mockRepository.update.mockImplementation(() => {
        throw new Error("Email ja cadastrado");
      });

      //! Email duplicado
      expect(() => service.atualizar(1, { nome: "Ana", email: "outro@email.com" })).toThrow("Email ja cadastrado");
    });
  });

  describe("remover", () => {
    test("chama repository.delete com o id correto quando o cliente existe", () => {
      //* Retorna true
      mockRepository.delete.mockReturnValue(true);

      //! Não quebra
      expect(() => service.remover(1)).not.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    test("lanca erro 'Cliente nao encontrado' quando o repository retorna false", () => {
      //* Retorna false
      mockRepository.delete.mockReturnValue(false);

      //! Erro exclusão
      expect(() => {
        service.remover(999);
      }).toThrow("Cliente nao encontrado");
    });
=======
    test.todo(
      "chama repository.findById e repository.update quando o cliente existe",
    );
    test.todo(
      "lanca erro 'Cliente nao encontrado' sem chamar repository.update quando o cliente nao existe",
    );
    test.todo("propaga o erro quando o novo email ja pertence a outro cliente");
  });

  describe("remover", () => {
    test.todo(
      "chama repository.delete com o id correto quando o cliente existe",
    );
    test.todo(
      "lanca erro 'Cliente nao encontrado' quando o repository retorna false",
    );
>>>>>>> 89b994eaa8ff6cdadda91e4ededefcbc83b682c5:api/__tests__/unit/ClienteService.test.js
  });
});