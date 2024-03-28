import React from 'react';
import area1 from '../../assets/images/area1.jpg'
import area2 from '../../assets/images/area2.jpg'
import area3 from '../../assets/images/area3.jpg'

const PopularAreas = () => {
    return (
        <div>
            <section
                className="lg:w-[95%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-20 px-6 py-20 gap-20">
                <div id='top' className='w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8'>
                    <div>
                        <h1 data-aos="zoom-in" className='text-red-500 dark:text-white'>POPULAR AREAS</h1>
                        <h1 data-aos="zoom-in" data-aos-delay="200"
                            className='text-black text-[40px] font-semibold leading-10 mt-4 dark:text-white'>Explore
                            most<br></br>
                            popular areas</h1>
                    </div>
                    <div className='grid lg:grid-cols-3 col-span-2 grid-cols-1 justify-center items-center gap-6'>
                        <div data-aos="zoom-in" data-aos-delay="400" style={{backgroundImage: `url(${area1})`}}
                             className='h-[400px] bg-cover bg-center rounded-xl'></div>
                        <div data-aos="zoom-in" data-aos-delay="600" style={{backgroundImage: `url(${area2})`}}
                             className='h-[400px] bg-cover bg-center rounded-xl'></div>
                        <div data-aos="zoom-in" data-aos-delay="800" style={{backgroundImage: `url(${area3})`}}
                             className='h-[400px] bg-cover bg-center rounded-xl'></div>
                    </div>
                </div>
                <div id='bottom'
                     className='w-full grid lg:grid-cols-3 grid-cols-1 lg:justify-center justify-start items-start gap-6'>
                    <div data-aos="slide-up" data-aos-delay="200"
                         className='flex justify-center lg:items-center gap-8 w-full'>
                        <h1 className='text-black text-7xl font-semibold dark:text-white'>5K</h1>
                        <h1 className='text-lg text-gray-600 dark:text-white'>ACTIVE <br></br>LISTINGS</h1>
                    </div>
                    <div data-aos="slide-up" data-aos-delay="400"
                         className='flex justify-center lg:items-center gap-8 w-full'>
                        <h1 className='text-black text-7xl font-semibold dark:text-white'>9K</h1>
                        <h1 className='text-lg text-gray-600 dark:text-white'>SOLID <br></br>LISTINGS</h1>
                    </div>
                    <div data-aos="slide-up" data-aos-delay="600"
                         className='flex justify-center lg:items-center gap-8 w-full'>
                        <h1 className='text-black text-7xl font-semibold dark:text-white'>6K</h1>
                        <h1 className='text-lg text-gray-600 dark:text-white'>CLIENTS <br></br>WE'VE SERVED</h1>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PopularAreas;