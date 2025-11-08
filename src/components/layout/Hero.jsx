import React from 'react'
import assets from '../../assets/assets'
import { motion } from "motion/react"
const Hero = () => {
  return (
    <div id='layout'className='flex flex-col items-center gap-6 py-20 px-4 sm:px-12
    lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700
    dark:text-white'>
        <motion.h1 
        initial={{opacity: 0,y: 40}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.6 , delay: 0.8}}
        viewport={{once:true}}
        className='text-4xl sm:text-5x1 md:text:6x1 x1:text-[84px] font-medium
        x1:leading-[95px] max-w-5x1'>Phần mềm quản lý <span className='bg-gradient-to-r from-[#1505ee] to-[#0066ff] bg-clip-text 
        text-transparent'> bảo dưỡng xe điện </span> cho trung tâm dịch vụ.</motion.h1>
        <motion.p 
        initial={{opacity: 0,y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5 , delay: 1}}
        viewport={{once:true}}
        className='text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75
         max-w-4/5 sm:max-w-lg pb-3'>Giải pháp toàn diện cho các trung tâm dịch vụ xe điện: theo dõi khách hàng,
        lập lịch bảo trì, quản lý hàng tồn kho và điều phối nhân viên.</motion.p>
        <motion.div 
        initial={{opacity: 0,scale: 0.9}}
        whileInView={{opacity: 1, y: 1}}
        transition={{duration: 0.6 , delay: 2}}
        viewport={{once:true}}
        className='relative'>
          <img src={assets.hero_img} alt="" className='w-full max-w-6xl'/>
          <img src={assets.bgImage1} alt="" className='absolute -top-40 -right-40
           sm:-top-100 sm:-right-70 -z-1 dark:hidden'/>
        </motion.div>
      
    </div>
  )
}

export default Hero
