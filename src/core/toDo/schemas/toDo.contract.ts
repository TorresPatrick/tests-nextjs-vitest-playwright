export type Todo = {
  id: string;
  description: string;
  createdAt: string;
};

export type InvalidToDo = {
  success: false;
  errors: string[];
};

export type ValidToDo = {
  success: true;
  todo: Todo;
};

export type TodoPresenter = InvalidToDo | ValidToDo;
