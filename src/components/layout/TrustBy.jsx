import React from 'react'
import { company_logos } from '../../assets/assets'
import { motion } from "motion/react"

const TrustBy = () => {
  const logos = (company_logos || []).filter(logo => {
    if (typeof logo !== 'string') return false
    const filename = logo.split('/').pop() || ''
    return filename.toLowerCase().endsWith('logo.png')
  })

  const loopLogos = [...logos, ...logos]

  return (
    <motion.div 
    initial={{opacity: 0,y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6 }}
    viewport={{once:true}}
    
    className='w-full overflow-hidden px-4 sm:px-12 lg:px-24 xl:px-40 py-6 text-gray-700 dark:text-white/80'>
      <motion.h3 
      initial={{opacity: 0,y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5 }}
      viewport={{once:true}}
      
      className='font-semibold mb-4 text-center'>
        Được các công ty hàng đầu tin cậy
      </motion.h3>

      {/* Marquee CSS */}
      <style>{`
        .marquee-track {
          display: flex;
          gap: 3.5rem;
          width: max-content;
          animation: scroll 18s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

      `}</style>

      <motion.div 
      initial="hidden"
      whileInView="visible"
      transition={{staggerChildren: 0.1 }}
      viewport={{once:true}}
      
      className='marquee-container relative overflow-hidden'>
        <div className='marquee-track'>
          {loopLogos.map((logo, index) => (
            <motion.img
            variants={{
              hidden: {opacity:0, y:10 },
              visible: {opacity: 1, y:0 },
            }}
            transition={{duration: 0.4 }}
              key={index}
              src={logo}
              alt={`company-logo-${index}`}
              className='h-10 sm:h-14 md:h-20 object-contain opacity-90 hover:opacity-100 transition'
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TrustBy
