import React from 'react';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  return (
    <Tasks
      pageTitle="Completed Items"
      filterCompleted={true}
      isImportant={null}
    />
  );
};

export default page;
