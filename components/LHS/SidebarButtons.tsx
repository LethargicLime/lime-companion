import { FC } from 'react';
import { IconCaretRight } from '@tabler/icons-react';

interface Props {
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
  className?: string;
}

export const SidebarButton: FC<Props> = ({ text, icon, onClick, className }) => {
  return (
    <button
      className={`flex justify-between w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">{icon}<span>{text}</span></div>
    </button>
  );
};