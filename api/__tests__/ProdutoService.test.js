const ProdutoService = require ("../services/ProdutoService")
//jest fn função vazia
describe("ProdutoService - Testes Unitarios", () => {
    let service
    let mockRepository

    beforeEach(() =>{
        mockRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            delete: jest.fn()
        }
        service = new ProdutoService(mockRepository)
    })
    describe("listar", ()=>{
        test("Chama repository.findAll uma vez e retorna o resultado", ()=>{
            const produtos = [{id: 1, nome: "Coxinha", preco: 5}]
            mockRepository.findAll.mockReturnValue(produtos)

            const resultado = service.listar()

            expect(mockRepository.findAll).toHaveBeenCalledTimes(1)
            expect(resultado).toEqual(produtos)
        })

        //!Criar teste repository.findById

        describe("buscar por Id", ()=>{
        test("Chama repository.findById uma vez e retorna o resultado", ()=>{
            const produto = [{id: 1, nome: "Coxinha", preco: 5}]
            mockRepository.findById.mockReturnValue(produto)

            const resultado = service.buscarPorId(1)

            expect(mockRepository.findById).toHaveBeenCalledTimes(1)
            expect(mockRepository.findById).toHaveBeenCalledWith(1)
            expect(resultado).toEqual(produto)
        })
    })
        describe("criar dados", ()=>{
        test("Deve repassar dados para mockRepository.create e retornar o produto criado", ()=>{
            const dadosEntrada = {nome: "Coxinha", preco: 5}
            const produtoSalvo = {id: 1, dadosEntrada}
            mockRepository.create.mockReturnValue(produtoSalvo)

            const resultado = service.criar(dadosEntrada)

            expect(mockRepository.create).toHaveBeenCalledWith(dadosEntrada)
            expect(resultado).toEqual(produtoSalvo)
        })
        test("Deve propagar o erro lançado pelo repository quando os dados forem inválidos", ()=>{
            mockRepository.create.mockImplementation(() =>{
                throw new Error ("Dados inválidos")
            })

            expect(() =>{
                service.criar({})
            }).toThrow("Dados inválidos")
        })
    })

        describe("remover id especifico", ()=>{
        test("Deve chamar mockRepository.delete com o id correto quando o produto existe", ()=>{
            mockRepository.delete.mockReturnValue(true)
        // Executa o método e verifica se ele roda SEM disparar nenhum erro
            expect(() => service.remover(1)).not.toThrow();

            expect(mockRepository.delete).toHaveBeenCalledWith(1)
        })
        test("Deve lançar erro 'Produto nao encontrado' quando o repository retornar false", ()=>{
            mockRepository.delete.mockImplementation(false)

            expect(() =>{
                service.remover({})
            }).toThrow("Produto nao encontrado")
        })
    })
})})


// toHaveBeenCalledWith - Valida com quais argumentos a função foi chamada
// toHaveBeenCalledTimes - Valida quantas vezes a função foi executada
// throw - Serve para testar se a sua aplicação sabe falhar corretamente ou confirma que a exceção realmente aconteceu
// mockImplementation - Você usa principalmente quando quer simular que o banco de dados falhou ou lançou uma exceção
