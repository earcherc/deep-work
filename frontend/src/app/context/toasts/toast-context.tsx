import { ToastContext } from './toast-provider';
import { useContext } from 'react';

const useToast = (): ToastContext => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export default useToast;
