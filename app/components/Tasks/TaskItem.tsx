'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import { edit, trash } from '@/app/utils/Icons';
import styled from 'styled-components';
import formatDate from '@/app/utils/formatDate';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

import { deleteTask, updateCompletedTask } from '../../redux/slices/apiSlice';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

interface Props {
  task: any;
}

const TaskItem = ({ task }: Props) => {
  const { theme } = useGlobalState();
  const { _id, title, description, date, is_important } = task;
  // let is_completed = task.is_completed;
  const [is_completed, setIsCompleted] = useState(task.is_completed);
  const { userId } = useAuth();

  const dispatch: Dispatch<any> = useDispatch(); // Explicitly type the dispatch function with 'Dispatch<any>'
  // const taskData = useSelector((item: any) => item.apis.deleteTaskData);

  const deleteItem = () => {
    if (!userId) {
      toast.error('Unauthorized User. Please login to delete a task');
      return;
    }

    // @ts-ignore
    dispatch(deleteTask(_id));
  };

  const changeCompleted = () => {
    if (!userId) {
      toast.error('Unauthorized User. Please login to delete a task');
      return;
    }

    setIsCompleted(!is_completed);
    console.log(_id);

    const updateCompletedData = {
      id: _id,
      is_completed: !is_completed,
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    // @ts-ignore
    dispatch(updateCompletedTask(options));
  };

  return (
    <TaskItemStyled key={_id} className="task" theme={theme}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {is_completed ? (
          <button className="completed" onClick={() => changeCompleted()}>
            Completed
          </button>
        ) : (
          <button className="incompleted" onClick={changeCompleted}>
            Incompleted
          </button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete" onClick={deleteItem}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 1px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h2 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 0.9375rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
  }

  .edit {
    margin-left: auto;
  }

  .completed,
  .incompleted {
    display: inline-block;
    padding: 0.2rem 1rem;
    background-color: ${(props) => props.theme.colorDanger};
    border-radius: 0.25rem;
  }

  .completed {
    background-color: ${(props) => props.theme.colorGreenDark};
  }
`;

export default TaskItem;
