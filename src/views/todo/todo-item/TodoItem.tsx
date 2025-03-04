import { TodoResponse } from "@/types/todo";
import { cn } from "@/utils/cn";

import { TodoCheckbox } from "../todo-checkbox/TodoCheckbox";
import { ActionIcon } from "./action-icon/ActionIcon";
import { TodoTitle } from "./todo-title/TodoTitle";

interface TodoItemProps {
  todo: TodoResponse["todos"][number];
  handleToggleTodo: (todoId: number, isDone: boolean) => void;
  onOpenNoteDetail: (noteId: TodoResponse["todos"][number]["noteId"]) => void;
  onOpenTodoModal: () => void;
  onOpenDeletePopup: (todoId: number) => void;
  setSelectedTodoId: (id: number | null) => void;
  isShowGoal?: boolean;
  isNew?: boolean;
}

export function TodoItem({
  todo,
  handleToggleTodo,
  onOpenNoteDetail,
  onOpenTodoModal,
  onOpenDeletePopup,
  setSelectedTodoId,
  isShowGoal = false,
  isNew = false,
}: TodoItemProps) {
  return (
    <li
      className={cn(
        "group mb-2 w-full last:mb-0",
        isNew && "animate-slideUp will-change-[transform,opacity]",
      )}
    >
      <div className="flex h-6 items-center">
        <TodoCheckbox
          checked={todo.done}
          onToggle={() => handleToggleTodo(todo.id, todo.done)}
        />

        <div className="flex w-full min-w-0 items-center justify-between">
          <TodoTitle title={todo.title} done={todo.done} />
          <ActionIcon
            todo={todo}
            onOpenNoteDetail={onOpenNoteDetail}
            onOpenTodoModal={onOpenTodoModal}
            onOpenDeletePopup={onOpenDeletePopup}
            setSelectedTodoId={setSelectedTodoId}
          />
        </div>
      </div>

      {todo.goal && isShowGoal && (
        <span className="ml-8 flex h-6 items-center gap-[6px] truncate text-sm font-normal text-slate-500">
          <img src="/icons/goal.png" alt="goal" width={24} />
          {todo.goal?.title}
        </span>
      )}
    </li>
  );
}
