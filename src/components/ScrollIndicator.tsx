import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ScrollIndicator = () => {
  // Отслеживаем скролл страницы (от 0 до 100 пикселей прокрутки)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center"
    >
      <motion.div
        animate={{ 
          y: [0, 4, 0],
          // Дополнительно анимируем прозрачность и масштаб внутри цикла пульсации
          opacity: [1, 0.4, 1],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 1.8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-0 rounded-full"
      >
        <ChevronDown 
            className="w-7 h-7 text-cyan-400 " 
            style={{ 
                filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))' 
            }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ScrollIndicator