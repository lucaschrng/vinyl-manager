'use client';

import { QueryClient } from '@tanstack/query-core';
import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
