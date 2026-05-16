import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidatedToDo } from "./make-validated-toDo";

describe("MakeValidatedToDo (unit)", () => {
  test("deve chamar a função sanitizeStr com o valor correto", () => {
    //Arrange
    const description = "abcd";
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, "sanitizeStr")
      .mockReturnValue(description);

    //Act
    makeValidatedToDo(description);

    //Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith("abcd");
  });
  //   test("deve chamar a validateToDoDescription com o retorno de sanitizeStr", () => {});
  //   test("deve chamar makeNewToDo se validatedDescription retornou sucesso", () => {});
});
