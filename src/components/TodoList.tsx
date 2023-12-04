import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../modal";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="Active Todos">
        {(provided) => (
          <ul
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todos__heading">Active Tasks</h2>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <Droppable droppableId="Completed Todos">
        {(provided) => (
          <ul
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="todos__heading">Completed Tasks</h2>
            {completedTodos.map((todo, index) => {
              return (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
