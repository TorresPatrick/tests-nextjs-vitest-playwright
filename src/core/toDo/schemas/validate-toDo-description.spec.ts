import { validateToDoDescription } from "./validate-toDo-description";

describe("validateToDoDescription (unit)", () => {
  test("deve retornar erros quando a descição tem menos que 4 caracteres", () => {
    const description = "abc";
    const result = validateToDoDescription(description);

    expect(result.errors).toStrictEqual([
      "Descrição precisa ter mais de 3 caracteres",
    ]);
    expect(result.success).toBe(false);
  });

  test("deve retornar sucesso quando a descição tem mais de 3 caracteres", () => {
    const description = "abcd";
    const result = validateToDoDescription(description);

    expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
