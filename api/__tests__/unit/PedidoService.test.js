const PedidoService = require("../../services/PedidoService");

// Teste unitario: o service e testado em isolamento total.
describe("PedidoService (unitario com mocks)", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    };

    service = new PedidoService(mockRepository);
  });

  describe("listar", () => {
    test("chama repository.findAll uma vez e retorna o resultado", () => {
<<<<<<< HEAD:api/__tests__/PedidoService.test.js
      //* Mock pedidos
      const pedidos = [{ id: 1, cliente: "Ana Souza", itens: [], status: "pendente", total: 0 }];
=======
      const pedidos = [
        {
          id: 1,
          cliente: "Ana Souza",
          itens: [],
          status: "pendente",
          total: 0,
        },
      ];
>>>>>>> 89b994eaa8ff6cdadda91e4ededefcbc83b682c5:api/__tests__/unit/PedidoService.test.js
      mockRepository.findAll.mockReturnValue(pedidos);

      const resultado = service.listar();

      //! Valida mock
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(pedidos);
    });
  });

  describe("buscarPorId", () => {
<<<<<<< HEAD:api/__tests__/PedidoService.test.js
    test("repassa o id ao repository e retorna o pedido encontrado", () => {
      //* Mock id
      const pedido = { id: 1, cliente: "Ana Souza", total: 100 };
      mockRepository.findById.mockReturnValue(pedido);

      const resultado = service.buscarPorId(1);

      //! Retorna pedido
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(pedido);
    });

    test("lanca erro 'Pedido nao encontrado' quando o repository retorna null", () => {
      //* Retorna null
      mockRepository.findById.mockReturnValue(null);

      //! Lança erro
      expect(() => service.buscarPorId(999)).toThrow("Pedido nao encontrado");
    });
  });

  describe("criar", () => {
    test("repassa os dados ao repository e retorna o pedido criado com o total calculado", () => {
      const dados = {
        cliente: "Ana Souza",
        itens: [{ nome: "Coxinha", precoUnitario: 5, quantidade: 2 }],
      };
      //* Total calculado
      const pedidoSalvo = { id: 1, ...dados, total: 10, status: "pendente" };

      mockRepository.create.mockReturnValue(pedidoSalvo);

      const resultado = service.criar(dados);

      //! Sucesso total
      expect(mockRepository.create).toHaveBeenCalledWith(dados);
      expect(resultado).toEqual(pedidoSalvo);
    });

    test("propaga o erro quando o cliente estiver faltando", () => {
      //* Sem cliente
      mockRepository.create.mockImplementation(() => {
        throw new Error("Cliente e obrigatorio");
      });

      //! Erro cliente
      expect(() => service.criar({ itens: [{ nome: "Coxinha", precoUnitario: 5, quantidade: 2 }] })).toThrow("Cliente e obrigatorio");
    });

    test("propaga o erro quando a lista de itens estiver vazia", () => {
      //* Sem itens
      mockRepository.create.mockImplementation(() => {
        throw new Error("Lista de itens nao pode ser vazia");
      });

      //! Erro itens
      expect(() => service.criar({ cliente: "Ana Souza", itens: [] })).toThrow("Lista de itens nao pode ser vazia");
    });

    test("propaga o erro quando algum item tiver preco ou quantidade invalidos", () => {
      //* Preço negativo
      mockRepository.create.mockImplementation(() => {
        throw new Error("Preco e quantidade devem ser maiores que zero");
      });

      //! Erro valor
      expect(() =>
        service.criar({
          cliente: "Ana Souza",
          itens: [{ nome: "Coxinha", precoUnitario: -5, quantidade: 1 }],
        })
      ).toThrow("Preco e quantidade devem ser maiores que zero");
    });
  });

  describe("atualizarStatus", () => {
    test("chama repository.findById e repository.updateStatus quando o pedido existe", () => {
      const pedidoExistente = { id: 1, status: "pendente" };
      const pedidoAtualizado = { id: 1, status: "pago" };

      mockRepository.findById.mockReturnValue(pedidoExistente);
      mockRepository.updateStatus.mockReturnValue(pedidoAtualizado);

      const resultado = service.atualizarStatus(1, "pago");

      //! Status atualizado
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.updateStatus).toHaveBeenCalledWith(1, "pago");
      expect(resultado).toEqual(pedidoAtualizado);
    });

    test("lanca erro 'Pedido nao encontrado' sem chamar repository.updateStatus quando o pedido nao existe", () => {
      //* Pedido nulo
      mockRepository.findById.mockReturnValue(null);

      //! Pegadinha updateStatus
      expect(() => service.atualizarStatus(999, "pago")).toThrow("Pedido nao encontrado");
      expect(mockRepository.updateStatus).not.toHaveBeenCalled();
    });

    test("propaga o erro quando o novo status for invalido", () => {
      mockRepository.findById.mockReturnValue({ id: 1, status: "pendente" });

      //* Status errado
      mockRepository.updateStatus.mockImplementation(() => {
        throw new Error("Status invalido");
      });

      //! Erro status
      expect(() => service.atualizarStatus(1, "status_desconhecido")).toThrow("Status invalido");
    });

    test("propaga o erro quando o pedido ja estiver cancelado", () => {
      //* Já cancelado
      mockRepository.findById.mockReturnValue({ id: 1, status: "cancelado" });

      mockRepository.updateStatus.mockImplementation(() => {
        throw new Error("Nao e possivel alterar status de pedido cancelado");
      });

      //! Bloqueia alteração
      expect(() => service.atualizarStatus(1, "pago")).toThrow("Nao e possivel alterar status de pedido cancelado");
    });
  });

  describe("remover", () => {
    test("chama repository.delete com o id correto quando o pedido existe", () => {
      //* Deleta OK
      mockRepository.delete.mockReturnValue(true);

      //! Sem exceção
      expect(() => service.remover(1)).not.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    test("lanca erro 'Pedido nao encontrado' quando o repository retorna false", () => {
      //* Deleta falhou
      mockRepository.delete.mockReturnValue(false);

      //! Erro 404
      expect(() => service.remover(999)).toThrow("Pedido nao encontrado");
    });
=======
    test.todo("repassa o id ao repository e retorna o pedido encontrado");
    test.todo(
      "lanca erro 'Pedido nao encontrado' quando o repository retorna null",
    );
  });

  describe("criar", () => {
    test.todo(
      "repassa os dados ao repository e retorna o pedido criado com o total calculado",
    );
    test.todo("propaga o erro quando o cliente estiver faltando");
    test.todo("propaga o erro quando a lista de itens estiver vazia");
    test.todo(
      "propaga o erro quando algum item tiver preco ou quantidade invalidos",
    );
  });

  describe("atualizarStatus", () => {
    test.todo(
      "chama repository.findById e repository.updateStatus quando o pedido existe",
    );
    test.todo(
      "lanca erro 'Pedido nao encontrado' sem chamar repository.updateStatus quando o pedido nao existe",
    );
    test.todo("propaga o erro quando o novo status for invalido");
    test.todo("propaga o erro quando o pedido ja estiver cancelado");
  });

  describe("remover", () => {
    test.todo(
      "chama repository.delete com o id correto quando o pedido existe",
    );
    test.todo(
      "lanca erro 'Pedido nao encontrado' quando o repository retorna false",
    );
>>>>>>> 89b994eaa8ff6cdadda91e4ededefcbc83b682c5:api/__tests__/unit/PedidoService.test.js
  });
});