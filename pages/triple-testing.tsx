import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

export default function TripleTest() {
    const [ page, setPage ] = useState(0);
    const props = useSpring({ marginLeft: -page * 100 + 'vw' });

    const handleScroll = (e) => {
        if (e.deltaY > 0) {
            setPage((page + 1) % 3);
        } else {
            setPage((page - 1) % 3);
        }
    }

    return (
        <div style={{ overflow: "hidden", width: "100vw" }} onWheel={handleScroll}>
            <animated.div style={{ ...props, display: "flex", flexDirection: "row", width: "300vw" }}>
                <div style={{ 
                    flexShrink: 0,
                    width: "100vw", 
                    height: "90vh" 
                }}>
                    Page 1
                </div>

                <div style={{ 
                    flexShrink: 0, 
                    width: "100vw",
                    height: "90vh"
                }}>
                    Page 2
                </div>
                <div style={{ 
                    flexShrink: 0,
                    width: "100vw",
                    height: "97vh"
                }}>
                    Page 3
                </div>
            </animated.div>
            <button onClick={() => setPage((page + 1) % 3)}>Next Page</button>
        </div>
    );
}