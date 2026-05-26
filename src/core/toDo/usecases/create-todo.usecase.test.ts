import { maketestTodoRepository } from "@/core/__tests__/utils/make-test-todo-repository";
import { createTodoUseCase } from "./create-todo.usecase";
import { InvalidToDo, ValidToDo } from "../schemas/toDo.contract";

describe("createTodoUseCase (integration", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await maketestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await maketestTodoRepository();
    await deleteTodoNoWhere();
  });

  test("Deve retornar erro se a validação falhar", async () => {
    const result = (await createTodoUseCase("")) as InvalidToDo;

    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  test("deve retornar o TODO se a validação passar", async () => {
    const description = "isso deve funcionar";
    const result = (await createTodoUseCase(description)) as ValidToDo;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      id: expect.any(String),
      description,
      createdAt: expect.any(String),
    });
  });

  test("deve retornar o erro se o repositorio falhar", async () => {
    //Cria o todo uma vez
    const description = "isso só funciona uma vez";
    (await createTodoUseCase(description)) as ValidToDo;

    //Tenta recriar o todo e deve retornar erro
    const result = (await createTodoUseCase(description)) as InvalidToDo;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      "Já existe um todo com o ID ou descrição enviados",
    ]);
  });
});
