import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../modal";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone, MdRemoveDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const markDone = (todoId: number) => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== todoId);
      return [
        ...newTodos,
        { id: todo.id, todo: todo.todo, isDone: !todo.isDone },
      ];
    });
  };

  const markUnDone = (todoId: number) => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== todoId);
      return [
        { id: todo.id, todo: todo.todo, isDone: !todo.isDone },
        ...newTodos,
      ];
    });
  };

  const handleDelete = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleEdit = (todoId: number) => {
    if (edit) {
      setTodos((prev) => {
        return prev.map((todo) => {
          if (todo.id === todoId) todo.todo = editTodo;
          return todo;
        });
      });
    }
    setEdit((prev) => !prev);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          className="todos__single"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <p className="todos__single--text">{todo.todo}</p>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                handleEdit(todo.id);
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            {todo.isDone ? (
              <span className="icon" onClick={() => markUnDone(todo.id)}>
                <MdRemoveDone />
              </span>
            ) : (
              <span className="icon" onClick={() => markDone(todo.id)}>
                <MdDone />
              </span>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default SingleTodo;
