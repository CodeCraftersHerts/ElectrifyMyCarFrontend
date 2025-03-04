import { title, electricCarInfo } from '../copyContent/mainPageCopy';
import ContentCard  from './ContentCard';

const HomeContent = () => {
    return (
        <>
            <div className="flex items-center align-middle flex-grow flex-col justify-center mt-[250px] sm:mt-[300px] md:mt-[400px] lg:mt-[500px] xl:mt-[600px] text-white z-20">
        
                <div className="flex flex-col gap-36 md:gap-40 w-full align-middle bg-transparent justify-around items-center">

                    {electricCarInfo.benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-standardBlue1 w-full min-h-64 lg:min-h-96 flex flex-col text-center justify-center bg-opacity-95 my-8">
                            <h2 className="underline underline-offset-[10px] decoration-wavy  decoration-teal-400 font-semibold py-2 text-2xl sm:text-4xl sm:w-4/5 self-center mt-8">{benefit.title}</h2>
                            <p className=" p-4 sm:w-4/5 self-center mt-4 mb-8">{benefit.content}</p>


                            {idx === 2 && (
                                <div className="flex flex-wrap justify-center mb-12">
                                {/* Example of a card container - just an idea we could add some images or icons */}
                                <div className='flex flex-col sm:flex-row gap-8'>
                                    <ContentCard/>
                                    <ContentCard/>
                                    <ContentCard/>
                                </div>

                              </div>
                            )}

                            {idx === 3 && (
                                                            <div className="flex flex-wrap justify-center mb-12">
                                                            {/* Example of a card container - just an idea we could add some images or icons */}
                                                            <div className='flex flex-col sm:flex-row gap-8'>
                                                                <ContentCard/>
                                                                <ContentCard/>
                                                                <ContentCard/>
                                                            </div>

                                                        </div>
                                                        )}
                                                    </div>
                                                ))}

                                            
                                            
                                            </div>
                                        </div>
                                    </>
                                );
                            }

export default HomeContent;
