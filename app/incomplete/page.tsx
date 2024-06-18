import React from 'react';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  return (
    <Tasks
      pageTitle="Incompleted Items"
      filterCompleted={false}
      isImportant={null}
    />
  );
};

export default page;
