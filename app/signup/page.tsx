'use client';

import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div>
      <SignUp routing="hash" />
    </div>
  );
};

export default page;
