import { sanitizeStr } from "@/utils/sanitize-str";
import { validateToDoDescription } from "../schemas/validate-toDo-description";
import { makeNewToDo } from "./make-newtoDo";
import { TodoPresenter } from "../schemas/toDo.contract";

export function makeValidatedToDo(description: string): TodoPresenter {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateToDoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      success: true,
      todo: makeNewToDo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  };
}
