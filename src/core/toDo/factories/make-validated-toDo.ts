import { sanitizeStr } from "@/utils/sanitize-str";
import { validateToDoDescription } from "../schemas/validate-toDo-description";
import { makeNewToDo } from "./make-newtoDo";
import { Todo } from "../schemas/toDo.contract";

export type InvalidToDo = {
  success: false;
  errors: string[];
};

export type ValidToDo = {
  success: true;
  data: Todo;
};

type MakeValidatedToDo = InvalidToDo | ValidToDo;

export function makeValidatedToDo(description: string): MakeValidatedToDo {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateToDoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      success: true,
      data: makeNewToDo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  };
}
