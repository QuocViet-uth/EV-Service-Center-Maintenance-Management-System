import React from 'react'
import assets from '../../assets/assets'
import { motion } from "motion/react"
const Footer = ({theme}) => {
  return (
    <motion.div 
    initial={{opacity: 0,y: 50}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.8 }}
    viewport={{once:true}}
    className='bg-slate-50 dark:bg-gray-900 pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40'>
        {/* Top Section */}
        <div className='flex justify-between lg:items-center max-lg:flex-col gap-10'>

            <motion.div 
            initial={{opacity: 0,y: -30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6 , delay: 0.2}}
            viewport={{once:true}}
            className='space y-5 text-sm text-gray-700 dark:text-gray-400'>
                <img src={theme ==='dark' ? assets.logo_dark : assets.logo} className='w-32 sm:w-44' alt=""/>
                <p className='max-w-md'>Giải pháp hoàn chỉnh cho các trung tâm dịch vụ xe điện: theo dõi khách hàng, lập lịch bảo trì, quản lý hàng tồn kho và điều phối nhân viên.</p>
                <ul className='flex gap-8'>
                    <li><a className='hover:text-primary' href="#hero">Trang chủ</a></li>
                    <li><a className='hover:text-primary' href="#services">Dịch vụ</a></li>
                    <li><a className='hover:text-primary' href="#about-me">Về chúng tôi</a></li>
                    <li><a className='hover:text-primary' href="#contact">Liên hệ</a></li>
                </ul>
            </motion.div>
            <motion.div 
            initial={{opacity: 0,y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6 , delay: 0.3}}
            viewport={{once:true}}
            className='text-gray-600 dark:text-gray-400'>
                <h3 className='font-semibold'>Sẵn sàng nâng tầm vụ xe điện của bạn?</h3>
                <p className='text-sm mt-2 mb-6'>Đăng ký nhận bản tin của chúng tôi để nhận thông tin cập nhật và ưu đãi mới nhất.</p>
                <div className='flex gap-2 text-sm'>
                    <input type="email" placeholder='Your email address' className='w-full p-3 text-sm outline-none rounded dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-500'/>
                    <button className='bg-primary text-white rounded px-6'>Đăng kí</button>
                </div>
            </motion.div>
        </div>
      <hr  className='border-gray-300 dark:border-gray-600 my-6'/>
      {/* Bottom Section */}
        <motion.div 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.5 , delay: 0.4}}
        viewport={{once:true}}
        className='pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap'>
            <p>Copyright 2025 ©Flazzer Team - All Right Reserved.</p>
            <div className='flex items-center justify-between gap-4'>
                <img src={assets.facebook_icon} alt=""/>
                <img src={assets.instagram_icon} alt=""/>
            </div>
        </motion.div>
    </motion.div>
  )
}
export default Footer
