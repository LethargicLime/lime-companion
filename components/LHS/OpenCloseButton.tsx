import { IconArrowBarLeft, IconArrowBarRight } from "@tabler/icons-react";

interface Props {
    onClick?: any;
}

export const CloseSidebarButton = ({ onClick }: Props) => {
    return (
        <>
            <button className="fixed top-[42px] left-[335px] z-50 h-7 w-7"onClick={onClick}>
                <IconArrowBarLeft />
            </button>
            <div onClick={onClick} className="absolute top-0 left-0 z-10 w-full bg-black opacity-70 sm:hidden"></div>
        </>
    );
};

export const OpenSidebarButton = ({ onClick }: Props) => {
    return (
        <>
            <button className="fixed top-[5px] left-2 z-50 h-7 w-7"onClick={onClick}>
                <IconArrowBarRight />
            </button>
            <div onClick={onClick} className="absolute top-0 left-0 z-10 w-full bg-black opacity-70 sm:hidden"></div>
        </>
    );
};