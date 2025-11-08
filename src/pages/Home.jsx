import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Hero from '../components/layout/Hero.jsx'
import TrustBy from '../components/layout/TrustBy.jsx'
import Services from '../components/layout/services.jsx'
import Aboutme from '../components/layout/aboutme.jsx'
import Contact from '../components/layout/Contact.jsx'
import Footer from '../components/layout/Footer.jsx'
import {Toaster} from 'react-hot-toast'

const Home = () =>{
  const location = useLocation();
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const dotRef = React.useRef(null)
  const outlineRef = React.useRef(null)
  const mouse =React.useRef({x:0, y:0})
  const position =React.useRef({x:0, y:0})
  
  // Handle scroll to section when hash is present in URL
  React.useEffect(() => {
    // Wait for page to render completely
    const timer = setTimeout(() => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          // Add offset for sticky header
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else if (location.pathname === '/') {
        // Only scroll to top if we're on home page and no hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

  React.useEffect(()=>{
    const handleMouseMove = (e) =>{
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    document.addEventListener('mousemove', handleMouseMove)
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1
      position.current.y += (mouse.current.y - position.current.y) * 0.1
      if(dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
        outlineRef.current.style.transform = `translate3d(${mouse.current.x - 20}px, ${mouse.current.y - 20}px, 0)`
      }
      requestAnimationFrame(animate)
    }
    animate()
    return ()=>{
      document.removeEventListener('mousemove', handleMouseMove)
    }
  },[])

  return (
    <div className=" dark:bg-black relative">
      <Toaster/>
      <Header theme={theme} setTheme={setTheme}/>
      <Hero/>
      <TrustBy/>
      <Services/>
      <Aboutme/>
      <Contact/>
      <Footer theme={theme} setTheme={setTheme}/>
      {/*Custom cursor*/}
      <div ref={outlineRef} className="cursor-outline fixed top-0 left-0 h-12 w-12 rounded-full border border-primary/70 pointer-events-none z-[9999]"></div>

      <div ref={dotRef} className="cursor-dot fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]"></div>
    </div>
  )


}

export default Home