import React from 'react'
import Title from './Title.jsx'
import assets from '../../assets/assets'
import { motion } from "motion/react"
const Aboutme = () => {
    const aboutMeData = [
        {
            title: 'Sứ mệnh của chúng tôi',
            description: 'Cung cấp dịch vụ bảo trì và sửa chữa hàng đầu cho xe điện, đảm bảo xe hoạt động trơn tru và góp phần vào tương lai bền vững..',
            image: assets.our_mission,
        },
        {
            title: 'Tầm nhìn của chúng tôi',
            description: 'Trở thành trung tâm dịch vụ xe điện hàng đầu được biết đến với dịch vụ khách hàng đặc biệt, chuyên môn kỹ thuật và cam kết về trách nhiệm với môi trường.',
            image: assets.our_vision,
        },
    ]
  return (
    <motion.div 
    initial="hidden"
    whileInView="visible"
    transition={{staggerChildren: 0.2}}
    viewport={{once:true}}
    id='about-me' className='flex flex-col items-center gap-7 px-4 sm:px-12 
    lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
        <Title title='Về EV Service' desc='Chúng tôi cung cấp dịch vụ bảo trì và sửa chữa xe điện an toàn, đảm bảo xe điện của bạn hoạt động trơn tru và góp phần vào một tương lai bền vững.'/>

        <motion.div 
        initial={{opacity: 0,y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5 , delay: 1}}
        viewport={{once:true}}
        className='w-full max-w-5xl flex flex-col md:flex-row gap-6'>
            {
                aboutMeData.map((work, index) => (
                    <div key={index} className={`flex-1 flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center bg-white/60 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 gap-6 shadow-md hover:scale-102 transition-transform duration-300`}>
                        <img src={work.image} className='w-full md:w-1/2 h-48 md:h-56 rounded-lg object-cover' alt=''/>
                        <div className='md:w-1/2'>
                            <h3 className='mt-1 mb-2 text-lg font-semibold text-gray-800 dark:text-white'>{work.title}</h3>
                            <p className='text-sm opacity-80 text-gray-700 dark:text-gray-200'>{work.description}</p>
                        </div>
                    </div>
                ))
            }
        </motion.div>
      
    </motion.div>
  )
}

export default Aboutme
