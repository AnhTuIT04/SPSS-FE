import { SuccessIcon } from '@/constants/icons';

interface FormSuccessProps {
  message: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-emerald-500">
      <SuccessIcon stroke="#10B981" className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};
