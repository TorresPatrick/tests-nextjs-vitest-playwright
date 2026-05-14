import { makeNewToDo } from "./make-newtoDo";

describe("makeNewToDo (unit)", () => {
  test("deve retornar un novo toDo válido", () => {
    /// AAA -> Arrange, act, assert
    // Arrange -> Criar as coisas que eu preciso
    const expectedTodo = {
      id: expect.any(String),
      description: "meu novo todo",
      createdAt: expect.any(String),
    };

    //Act
    const newToDo = makeNewToDo("meu novo todo");

    //Assert
    //toBe ===
    // Checando apenas a description
    expect(newToDo.description).toBe(expectedTodo.description);

    // Checando o objeto inteiro
    expect(newToDo).toStrictEqual(expectedTodo);
  });
});
