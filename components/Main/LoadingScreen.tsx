import Ghost from "@/public/ghost";

export const LoadingScreen = () => {
    return (
        <div style={{
            backgroundColor: "#363636",
            height: "100vh"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
                overflow: "visible",
                backgroundColor: "#363636",
            }}>
                <div style={{ marginTop: "calc(50vh - 150px)" }}>
                    <Ghost />
                    <div style={{
                        marginTop: "20px",
                        color: "white",
                        fontWeight: 500,
                        fontSize: "16px",
                        marginLeft: ""
                    }}>
                    </div>
                </div>
            </div>
        </div>
    )
}