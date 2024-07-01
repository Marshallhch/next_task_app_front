'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/slices/apiSlice';

import { Dispatch } from 'redux';
import { useAuth } from '@clerk/nextjs';
import TaskItem from './TaskItem';
import { plus } from '@/app/utils/Icons';
import CreateContent from '../Modals/CreateContent';
import toast from 'react-hot-toast';
import Modal from '../Modals/Modal';

const Tasks = ({
  pageTitle,
  filterCompleted,
  isImportant,
}: {
  pageTitle: string;
  filterCompleted?: boolean | null;
  isImportant?: boolean | null;
}) => {
  const { theme, openModal, modal } = useGlobalState();
  const dispatch: Dispatch<any> = useDispatch(); // Explicitly type the dispatch function with 'Dispatch<any>'
  const taskData = useSelector((item: any) => item.apis.getTasksData);
  const status = useSelector((state: any) => state.apis.deleteTaskData);
  const postTaskData = useSelector((state: any) => state.apis.postTasksData);
  const updateCompletedStatus = useSelector(
    (state: any) => state.apis.updateCompletedTaskData
  );
  const prevDeleteTaskData = useRef(status);
  const prevPostTaskData = useRef(postTaskData);
  const prevUpdateCompletedStatus = useRef(updateCompletedStatus);
  const { userId } = useAuth();

  useEffect(() => {
    if (prevDeleteTaskData.current !== status) {
      prevDeleteTaskData.current = status;

      if (prevDeleteTaskData !== null) {
        // @ts-ignore
        dispatch(getTasks(userId));
        toast.success('Task Deleted Successfully');
      }
    }
  }, [status, dispatch, userId]);

  // updateCompletedStatus 값이 null에서 non-null로 변경될 때만 useEffect 내의 코드가 실행. 이는 useEffect가 두 번 실행되는 문제를 해결.
  useEffect(() => {
    if (prevUpdateCompletedStatus.current !== updateCompletedStatus) {
      prevUpdateCompletedStatus.current = updateCompletedStatus;

      if (updateCompletedStatus !== null) {
        // @ts-ignore
        dispatch(getTasks(userId));
        toast.success('Task Updated Successfully');
      }
    }
  }, [updateCompletedStatus, dispatch, userId]);

  useEffect(() => {
    if (prevPostTaskData.current !== postTaskData) {
      prevPostTaskData.current = postTaskData;

      if (prevPostTaskData !== null) {
        // @ts-ignore
        dispatch(getTasks(userId));
        toast.success('Task Posted Successfully');
      }
    }
  }, [postTaskData]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getTasks(userId));
  }, [dispatch]);

  // console.log(taskData);

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{pageTitle}</h1>
      <div className="tasks grid">
        {taskData &&
          taskData
            .filter(
              (task: any) =>
                (filterCompleted === null ||
                  task.is_completed === filterCompleted) &&
                (isImportant === null || task.is_important === isImportant)
            )
            .map((task: any) => <TaskItem key={task._id} task={task} />)}
        <button className="create-task" onClick={openModal}>
          {plus}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
};

const TaskStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 0.25rem;
  overflow-y: auto;
  padding: 1.25rem;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.25rem, 1.5vw, 1.5rem);
    font-weight: 600;
    position: relative;
    margin: 2rem 0;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 2.5rem;
      height: 0.25rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.25rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 500;
    cursor: pointer;
    border-radius: 0.25rem;
    border: 1px solid ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
