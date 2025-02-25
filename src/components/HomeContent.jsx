import { title, electricCarInfo } from '../copyContent/mainPageCopy';

const HomeContent = () => {
    return (
        <>
            <div className="flex items-center align-middle flex-grow flex-col justify-center mt-[400px] md:mt-[464px] bg-standardBlue1 text-white z-20">
                <div className="text-2xl font-semibold p-4">{title.title}</div>
                <div className="p-4 flex flex-col gap-8 md:gap-20 w-10/12 align-middle ">
                    <div>
                    <h1 className="font-semibold py-2">{electricCarInfo.title}</h1>
                    <p>{electricCarInfo.description}</p>
                    </div>
                    

          
                    {electricCarInfo.benefits.map((benefit, idx) => (
                        <div key={idx}>
                            <h2 className="font-semibold py-2">{benefit.title}</h2>
                            <p>{benefit.content}</p>
                        </div>
                    ))}

                 
                    <div>
                        <strong>Conclusion:</strong>
                        <p>{electricCarInfo.conclusion}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeContent;
