import { WarnIcon } from '@/constants/icons';

interface FormErrorProps {
  message: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-destructive">
      <WarnIcon stroke="#EF4444" className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};
