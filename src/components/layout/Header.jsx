import React from 'react'
import assets from '../../assets/assets'
import ThemeToggleBtn from './ThemeToggleBtn.jsx'
import { motion } from "motion/react"
import { useNavigate, useLocation } from "react-router-dom";
const Header = ({theme, setTheme}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const isHomePage = location.pathname === '/';
    
    const handleBookingClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/customer");  
      } else {
        navigate("/login"); 
      }
  };

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setSidebarOpen(false); // Đóng sidebar
    
    if (isHomePage) {
      // Nếu đang ở trang Home, chỉ cần scroll đến phần tương ứng
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Update URL hash
        window.history.pushState(null, '', hash);
      } else {
        // Scroll về đầu trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Remove hash from URL
        window.history.pushState(null, '', '/');
      }
    } else {
      // Nếu đang ở trang khác, navigate về Home với hash
      if (hash) {
        navigate('/');
        // Set hash after navigation
        setTimeout(() => {
          window.location.hash = hash;
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  };
  return (
      <motion.div
      initial={{opacity: 0, y:-50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6, ease: 'easeOut'}} 
      className="flex justify-between items-center px-4sm:px-12 lg:px-24 
      xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-x1 font-medium bg-white/50 
      dark:bg-gray-900/70">
        <img 
          src={theme ==='dark' ? assets.logo_dark: assets.logo} 
          className='w-32 sm:w-20 cursor-pointer' 
          alt='' 
          onClick={() => {
            if (!isHomePage) {
              navigate('/');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
        <div className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ?'max-sm:w-0 overflow-hidden' :'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white 
        max-sm:pt-20 flex sm:items-center gap-5 transition-all`}>

          <img src={assets.close_icon} alt="" className='w-5 absolute right-4
          top-4 sm:hidden' onClick={()=> setSidebarOpen(false)}/>

          <a onClick={(e) => handleNavClick(e, '')} href="#" className='sm:hover:border-b cursor-pointer'>Trang chủ</a>
          <a onClick={(e) => handleNavClick(e, '#services')} href="#services" className='sm:hover:border-b cursor-pointer'>Dịch vụ</a>
          <a onClick={(e) => handleNavClick(e, '#about-me')} href="#about-me" className='sm:hover:border-b cursor-pointer'>Về chúng tôi</a>
          <a onClick={(e) => handleNavClick(e, '#contact')} href="#contact" className='sm:hover:border-b cursor-pointer'>Liên hệ</a>
        </div>
        <div className='flex items-center gap-2 sm:gap-4'>

        <ThemeToggleBtn theme={theme} setTheme={setTheme}/>

          <img src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon}
          alt="" onClick={()=> setSidebarOpen(true)} className='w-8 sm:hidden'/>
          <button onClick={handleBookingClick} className='text-sm max-sm:hidden flex
          items-center gap-2 bg-primary text-white px-6 py-2 rounded-full 
          cursor-pointer hover:scale-103 transition-all'>
            Đặt lịch <img src={assets.arrow_icon} width={14} alt=""/>
          </button>
        </div>
      </motion.div>
  )

}

export default Header
