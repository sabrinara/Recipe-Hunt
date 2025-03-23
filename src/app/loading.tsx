import { Spinner } from "@heroui/react";


const loading = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
           <Spinner classNames={{label: "text-foreground mt-4"}} label="Recipe Hunt Loading" color="secondary" variant="wave" />
          
        </div>
    );
};

export default loading;