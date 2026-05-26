import { makeValidatedToDo } from "../factories/make-validated-toDo";
import { todoRepository } from "../repositories/default.repository";

export async function createTodoUseCase(description: string) {
  const validateResult = makeValidatedToDo(description);

  if (!validateResult.success) {
    return validateResult;
  }

  const createResult = await todoRepository.create(validateResult.todo);
  return createResult;
}
