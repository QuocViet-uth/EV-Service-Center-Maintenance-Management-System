import React from 'react'
import assets from '../../assets/assets'
import Title from './Title.jsx'
import ServiceCard from './ServiceCard.jsx'
import { motion } from "motion/react"
const Services = () => {
    const servicesData = [
        {
            title: 'Bảo trì xe điện toàn diện',
            description: 'Cung cấp đầy đủ các dịch vụ bảo dưỡng dành riêng cho xe điện, bao gồm kiểm tra tình trạng pin, cập nhật phần mềm và kiểm tra định kỳ để đảm bảo hiệu suất tối ưu.',
            icon: assets.content_icon,
        },
        {
            title: 'Nhắc nhở theo dõi và bảo dưỡng xe',
            description: 'Tự động nhắc nhở bảo dưỡng theo lịch trình dựa trên số dặm hoặc thời gian đã trôi qua, cùng với thông báo thanh toán kịp thời cho các gói dịch vụ đang hoạt động hoặc sắp tới.',
            icon: assets.ads_icon,
        },
        {
            title: 'Lịch sử dịch vụ & Quản lý thanh toán',
            description: 'Theo dõi lịch sử bảo trì, quản lý chi phí dịch vụ và thanh toán trực tuyến với nhiều tùy chọn thanh toán.',
            icon: assets.marketing_icon,
        },
        {
            title: 'Lên lịch dịch vụ dễ dàng',
            description: 'Đặt lịch bảo trì và sửa chữa trực tuyến, chọn trung tâm dịch vụ và loại dịch vụ với cập nhật trạng thái theo thời gian thực.',
            icon: assets.social_icon,
        },
        
    ]
  return (
    <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{once:true}}
    transition={{staggerChildren: 0.2}}
    
    id='services' className='relative flex flex-col items-center gap-7 px-4 
    sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
        <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 -z-1 dark:hidden'/>
    <Title title='Các trung tâm dịch vụ' desc='Giải pháp toàn diện cho Quản lý Trung tâm Dịch vụ'/>
    <div className='flex flex-col md:grid grid-cols-2'>
        {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index}/>
        ))}
    </div>
    </motion.div>
  )
}

export default Services
