import * as sanitizeStrMod from "@/utils/sanitize-str";
import {
  InvalidToDo,
  makeValidatedToDo,
  ValidToDo,
} from "./make-validated-toDo";
import * as makeNewToDoMod from "./make-newtoDo";
import * as validateToDoDescriptionMod from "../schemas/validate-toDo-description";

describe("MakeValidatedToDo (unit)", () => {
  test("deve chamar a função sanitizeStr com o valor correto", () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedToDo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test("deve chamar a validateToDoDescription com o retorno de sanitizeStr", () => {
    const { description, sanitizeStrSpy, validaToDoDescriptionSpy } =
      makeMocks();
    const sanitizeStrReturn = "retorno da sanitizeSTR";
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);
    makeValidatedToDo(description) as ValidToDo;

    expect(validaToDoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn,
    );
  });

  test("deve chamar makeNewToDo se validatedDescription retornou sucesso", () => {
    const { description } = makeMocks();
    const result = makeValidatedToDo(description) as ValidToDo;
    expect(result.success).toBe(true);
    expect(result.todo.id).toBe("any-id");
    expect(result.todo.description).toBe("abcd");
    expect(result.todo.createdAt).toBe("any-date");
  });

  test("deve chamar makeNewToDo se validatedDescription.error se a validação falhou", () => {
    const { description, validaToDoDescriptionSpy, errors } = makeMocks();

    validaToDoDescriptionSpy.mockReturnValue({ errors, success: false });

    const result = makeValidatedToDo(description) as InvalidToDo;

    expect(result).toStrictEqual({ errors, success: false });
  });
});

const makeMocks = (description = "abcd") => {
  const todo = {
    id: "any-id",
    description,
    createdAt: "any-date",
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validaToDoDescriptionSpy = vi
    .spyOn(validateToDoDescriptionMod, "validateToDoDescription")
    .mockReturnValue({
      errors: [],
      success: true,
    });

  const makeNewToDoSpy = vi
    .spyOn(makeNewToDoMod, "makeNewToDo")
    .mockReturnValue(todo);

  const errors = ["any", "errors"];

  return {
    description,
    sanitizeStrSpy,
    validaToDoDescriptionSpy,
    makeNewToDoSpy,
    errors,
  };
};
