import Link from "next/link";

const  NotFoundPage =() =>{
    return (
        <div
            className="flex justify-center items-center relative "
            style={{
                backgroundImage: `url('https://i.ibb.co.com/D9xZW9f/not.png')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "80vh",
                width: "90vw",
            }}
        >
            <div className="  p-40 rounded-lg   ml-80 absolute">
                <Link href="/">
                    <button className="border-2 border-[#E10101] px-2 py-2 rounded-none bg-transparent text-[#E10101] mt-4  hover:text-white">
                        Back To Home</button>
                </Link>

            </div>
        </div>
    );
}
export default  NotFoundPage;
