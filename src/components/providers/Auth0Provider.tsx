'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactNode } from 'react';

export default function Auth0Provider({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
} 