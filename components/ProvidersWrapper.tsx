import { PropsWithChildren } from 'react';
import SupabaseProvider from '@/providers/SupabaseProvider';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

const ProvidersWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <Toaster position="top-right" />
      <SupabaseProvider>{children}</SupabaseProvider>
    </QueryProvider>
  );
};

export default ProvidersWrapper;
