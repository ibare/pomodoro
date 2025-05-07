import React from 'react';

interface MaybeProps {
  test: boolean;
  children: React.ReactNode;
}

const Maybe: React.FC<MaybeProps> = ({ test, children }) => test ? children : null;

export default Maybe;
