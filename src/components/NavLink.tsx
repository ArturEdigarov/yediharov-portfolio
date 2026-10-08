import { motion } from 'framer-motion'
import { Mail, FileText, GitFork, MessageSquareText  } from 'lucide-react'

// Фиксированная плавающая панель сверху (всегда на виду)
const NavLink = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Логотип или твое имя (клик возвращает наверх) */}
        <a 
          href="#" 
          className="pointer-events-auto text-white font-bold tracking-wider text-sm md:text-base flex items-center space-x-2  px-4 py-2 rounded-full hover:border-cyan-500/50 transition-all shadow-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
           style={{background: '#0b0b0b'}}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Artur Yediharov</span>
        </a>

        {/* Навигационные кнопки / Ссылки (фиксированные и полупрозрачные) bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md shadow-lg backdrop-blur-md*/}
        <nav 
            className="pointer-events-auto flex items-center space-x-2 md:space-x-3 p-1.5 md:px-4 md:py-2 rounded-full bg-transparent shadow-none border-none backdrop-blur-xs"
            style={{background: 'rgba(11, 11, 11, 0.6)'}}
            // border: '1px solid rgba(40, 40, 40, 0.8)'
        >
          
          {/* GitHub */}
          <a 
            href="https://github.com/ArturEdigarov" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white text-xs md:text-sm px-3 py-1.5 rounded-full hover:bg-zinc-800/50 flex items-center space-x-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
            title="GitHub"
          >
            <GitFork className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/artur-yediharov-0b2524372/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white text-xs md:text-sm px-3 py-1.5 rounded-full hover:bg-zinc-800/50 flex items-center space-x-2  hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
            title="LinkedIn"
          >
            <MessageSquareText className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          {/* Email */}
          <a 
            href="mailto:arturedigarov07@gmail.com"
            className="text-zinc-300 hover:text-white text-xs md:text-sm px-3 py-1.5 rounded-full hover:bg-zinc-800/50 flex items-center space-x-2  hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">Email</span>
          </a>

          {/* Разделитель */}
          <div className="w-[1px] h-4 bg-zinc-800 my-auto hidden sm:block" />

          {/* Кнопка скачивания резюме (выделена акцентом) */}
          <a 
            href="/resume.pdf" 
            download="Artur_Yediharov_Lebenslauf.pdf"
            className="text-xs md:text-sm font-medium px-4 py-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/50 flex items-center space-x-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
          >
            <FileText className="w-4 h-4 text-white/90" />
            <span>Lebenslauf</span>
          </a>

        </nav>
      </div>
    </motion.header>
  )
}

export default NavLink