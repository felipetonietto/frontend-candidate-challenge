import React, { Dispatch, SetStateAction, useState } from "react";

import { AddButton } from "../AddButton";
import { Modal } from "../Modal/Modal";

import { Container, ListTitle, ListContainer, ListButton } from "./styles";

type TodoListProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TodoList = ({ show, setShow }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Buy milk", done: true, id: 0 },
    { text: "Buy bread", done: false, id: 1 },
  ]);

  const [currentItem, setCurrentItem] = useState<Todo | undefined>(undefined);
  const doneTodos = todos.filter((item) => item.done === true);
  const undoneTodos = todos.filter((item) => item.done === false);

  function Actions(props: ActionsProps) {
    return (
      <div data-testid="buttonsWrapper">
        <ListButton data-testid="editButton" onClick={props.onEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 20, height: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </ListButton>
        <ListButton data-testid="deleteButton" onClick={props.onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 20, height: 20 }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </ListButton>
      </div>
    );
  }

  const ListComponent = ({
    label,
    items,
  }: {
    label: string;
    items: Todo[];
  }) => {
    return (
      <ListContainer>
        <ListTitle>{label}</ListTitle>
        <ol className="todoList">
          {!!items.length &&
            items.map((item: Todo, i: number) => (
              <li key={i}>
                <span data-testid={`todo${i}`}>{item.text}</span>
                <Actions
                  onEdit={() => {
                    setCurrentItem(item);
                    setShow(true);
                  }}
                  onDelete={() => {
                    return setTodos(
                      todos.filter((todo) => todo.id !== item.id)
                    );
                  }}
                />
              </li>
            ))}
        </ol>
      </ListContainer>
    );
  };

  return (
    <>
      <AddButton setShow={setShow}></AddButton>
      <Modal
        todos={todos}
        setTodos={setTodos}
        show={show}
        setShow={setShow}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      ></Modal>
      <Container>
        <ListComponent label="To do" items={undoneTodos}></ListComponent>
        <ListComponent label="Done" items={doneTodos}></ListComponent>
      </Container>
    </>
  );
};
