'use client';
import React from 'react';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  return (
    <Tasks
      pageTitle="Important Items"
      filterCompleted={null}
      isImportant={true}
    />
  );
};

export default page;
