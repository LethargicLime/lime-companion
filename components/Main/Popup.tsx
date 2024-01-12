import { FC } from "react";

interface Props {
    left: any;
    top: any;
}

export const Popup: FC<Props> = ({ left, top }) => {

    return (
        <div style={{
            position: "absolute",
            left: left,
            top: top,
            backgroundColor: "#82807c"
        }}>
            Test
        </div>
    )
}