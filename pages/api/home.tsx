import { authorize } from "@/components/Destiny/Fetch";

export default function page() {

    const handleAuthorize = () => {
        if (typeof window !== "undefined") {
            authorize();
        }
    }

    return (
        <div className={""} style={{
            backgroundColor: "#adaca6",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div style={{
                backgroundColor: "#808080",
                padding: "20px",
                borderRadius: "5px",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <div style={{
                    fontWeight: "bold",
                    fontSize: "22px"
                }}>
                    Lime Companion
                </div>
                <div>
                    <br />
                    The Bungie API requires authorization for transacts outside of basic <br />
                    information; because of this, I require that you authorize your <br />
                    account. No account information is collected or stored, but login is <br />
                    required to allow me to collect your character&apos;s information with OAuth <br />
                    access.
                    <br />
                    <br />
                </div>

                <button style={{
                    fontWeight: "bold",
                    backgroundColor: "darkgrey",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    padding: "5px",
                    borderRadius: "5px"
                }} onClick={handleAuthorize}>Authorize</button>
            </div>
        </div>
    )
}