import { FC } from 'react';
import { IconCaretRight } from '@tabler/icons-react';
import { url } from 'inspector';

interface Props {
  text: string;
  race: string;
  light: any;
  image: string;
  onClick?: () => void;
  className?: string;
}

export const SidebarImageButton: FC<Props> = ({ text, race, light, image,  onClick, className }) => {

  return (
    <button
      className={`flex justify-between w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10 ${className}`}
      onClick={onClick}
      style={{
        height: "64px",
        backgroundImage: `url(${image})`,
        backgroundSize: "314px 64px",
        marginTop: "20px"
      }}
    >
        <div style={{ 
          marginLeft: "65px",
          textAlign: "center"
        }}>
            <div style={{ 
              fontWeight: "700"
            }}>
              {text}
            </div>

            <div style={{ 
              marginTop: "10px"
            }}>
              {race}
            </div>
        </div>
        <div style={{ 
          color: "#f0dc2e",
          fontSize: "19px",
          fontWeight: "700",
          marginRight: "4px"
        }}>
          ✧  {light}
        </div>
    </button>
  );
};