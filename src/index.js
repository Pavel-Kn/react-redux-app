import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  createTask,
  getTasks,
  getTasksLoadingStatus,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(loadTasks());
  }, [dispatch]);

  const changeTitle = (taskId) => {
      dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
      dispatch(taskDeleted(taskId));
  };

  const createNewTask = () => {
    dispatch(createTask({userId: 1, title: "New task", completed: false}))
  };

  if (isLoading) {
      return <h1>Loading</h1>;
  }
  if (error) {
      return <p>{error}</p>;
  }

  return (
      <>
          <h1> App</h1>
          <button onClick={createNewTask}>Create new task</button>
          <ul>
              {state.map((el) => (
                  <li key={el.id}>
                      <p>{el.title}</p>
                      <p> {`Completed: ${el.completed}`}</p>
                      <button onClick={() => dispatch(completeTask(el.id))}>
                          Complete
                      </button>
                      <button onClick={() => changeTitle(el.id)}>
                          Change title
                      </button>
                      <button onClick={() => deleteTask(el.id)}>
                          Delete
                      </button>
                      <hr />
                  </li>
              ))}
          </ul>
      </>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
    
);
