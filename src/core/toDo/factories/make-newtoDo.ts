import { Todo } from "../schemas/toDo.contract";

export function makeNewToDo(description: string): Todo {
  return {
    id: crypto.randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
