import Header from "@/components/Lore/Header";

export const Lore = () => {
    return (
        <div className={"flex flex-col bg-[#363636] h-screen"}>
            <Header />
            <div className="flex flex-row">                    
                <div className="mt-8 ml- w-[200px] rounded bg-[#595959] flex items-center">
                    <div className="pl-2">
                        Testing
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lore;