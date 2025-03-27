// import { Spinner } from "@heroui/react";


const loading = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div>
            <p className="text-3xl text-[#E10101] font-serif animate-bounce">Recipe Hunt...</p>
            </div>
           {/* <Spinner classNames={{label: "text-foreground mt-4"}} label="Recipe Hunt Loading" color="secondary" variant="wave" /> */}
          
        </div>
    );
};

export default loading;