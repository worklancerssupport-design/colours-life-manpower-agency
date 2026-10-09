'use client';

import { AuthProvider } from '@/lib/edit/useAuth';
import EditShell from './EditShell';

export default function EditConsole() {
  return (
    <AuthProvider>
      <EditShell />
    </AuthProvider>
  );
}
