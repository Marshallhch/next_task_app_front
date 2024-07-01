'use client';

import React, { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

import { postTasks } from '../../redux/slices/apiSlice';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';
import Button from '../Button/Button';
import { add } from '@/app/utils/Icons';

const CreateContent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const { userId } = useAuth();

  const { theme, closeModal } = useGlobalState();

  const dispatch: Dispatch<any> = useDispatch(); // Explicitly type the dispatch function with 'Dispatch<any>'
  const taskData = useSelector((item: any) => item.apis.postTasksData);

  useEffect(() => {
    if (taskData === null) {
      // taskData is null, do nothing
      return;
    }

    if (taskData) {
      toast.success('Task created successfully');
    } else {
      toast.error('Failed to create task');
    }
  }, [taskData]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
      case 'completed':
        setCompleted(e.target.checked);
        break;
      case 'important':
        setImportant(e.target.checked);
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId) {
      toast.error('Unauthorized User. Please login to create a task');
      return;
    }

    if (!title) {
      toast.error('Title is required');
      return;
    }

    if (!description) {
      toast.error('Description is required');
      return;
    }

    if (!date) {
      toast.error('Date is required');
      return;
    }

    const task = {
      title,
      description,
      date,
      completed,
      important,
      userId,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    };

    // @ts-ignore
    dispatch(postTasks(options));
    closeModal();
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange('title')}
          placeholder="Title..."
          className="text-gray-950"
        />
      </div>

      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          onChange={handleChange('description')}
          placeholder="description ..."
          rows={4}
          className="text-gray-950"
        ></textarea>
      </div>

      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange('date')}
          className="text-gray-950"
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange('completed')}
          className="text-gray-950"
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange('important')}
          className="text-gray-950"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={add}
          padding={'.5rem 1rem'}
          border-radius={'0.25rem'}
          fw={'500'}
          fs={'0.875rem'}
          color={theme.colorGrey1}
          background={theme.colorGreenDark}
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.4rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    input,
    textarea {
      width: 100%;
      border: none;
      padding: 0.5rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.25rem;
    }
  }

  .submit-btn button {
    color: ${(props) => props.theme.colorGrey1};

    i {
      font-size: 0.875rem;
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
