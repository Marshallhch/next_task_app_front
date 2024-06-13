'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

import { postTasks } from '../../redux/slices/apiSlice';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

const CreateContent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const { userId } = useAuth();

  const dispatch: Dispatch<any> = useDispatch(); // Explicitly type the dispatch function with 'Dispatch<any>'
  const taskData = useSelector((item: any) => item.apis.postTasksData);

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a Task{userId}</h1>
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

      <div className="input-control">
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

      <div className="input-control">
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

      <div className="submit-btn">
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default CreateContent;
