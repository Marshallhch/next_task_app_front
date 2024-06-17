'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/slices/apiSlice';

import { Dispatch } from 'redux';
import { useAuth } from '@clerk/nextjs';
import TaskItem from './TaskItem';
import { plus } from '@/app/utils/Icons';
import CreateContent from '../Modals/CreateContent';
import toast from 'react-hot-toast';

const Tasks = ({ pageTitle }: { pageTitle: string }) => {
  const { theme } = useGlobalState();
  const dispatch: Dispatch<any> = useDispatch(); // Explicitly type the dispatch function with 'Dispatch<any>'
  const taskData = useSelector((item: any) => item.apis.getTasksData);
  const status = useSelector((state: any) => state.apis.deleteTaskData);
  const updateCompletedStatus = useSelector(
    (state: any) => state.apis.updateCompletedTaskData
  );

  const { userId } = useAuth();

  useEffect(() => {
    if (status !== null) {
      toast.success('Task Deleted Successfully');
      // @ts-ignore
      dispatch(getTasks(userId));
    }
  }, [status, dispatch, userId]);

  useEffect(() => {
    if (updateCompletedStatus !== null) {
      toast.success('Task Updated Successfully');
      // @ts-ignore
      dispatch(getTasks(userId));
    }
  }, [updateCompletedStatus, dispatch, userId]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getTasks(userId));
  }, [dispatch]);

  // console.log(taskData);

  return (
    <TaskStyled theme={theme}>
      <CreateContent />
      <h1>{pageTitle}</h1>
      <div className="tasks grid">
        {taskData &&
          taskData.map((task: any) => <TaskItem key={task._id} task={task} />)}
        <button className="create-task">
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
