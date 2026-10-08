import { Scroll } from '@react-three/drei'
import { motion } from 'framer-motion'

// Анимированный контейнер секции
const ContentSection = ({ children }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: '50%',
        left: '75%',
        transform: 'translate(-50%, -50%)',
      }}
      className="w-full max-w-xl px-6 text-left"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.8 }} // Анимация срабатывает, когда блок на 50% в зоне видимости
        transition={{ duration: 0.8 }} // Плавный и мягкий кубический Безье
      >
        {children}
      </motion.div>
    </div>
  )
}

export const HtmlContent = () => {
  return (
    <>
    <Scroll html style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100vw', height: '300vh', position: 'relative' }}>
        
        {/* Секция 1 */}
        <div style={{ height: '100vh', position: 'relative' }}>
          <ContentSection>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/50 border border-cyan-800/50 rounded-full">
                PORTFOLIO 2026 • DUALES STUDIUM APPLICANT
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Artur <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Yediharov</span>
              </h1>
              <p className="text-lg text-zinc-400 font-light">
                Software Developer & Engineer with <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">1+ year of commercial experience</strong>, building high-performance web applications, backend architectures, and automated IoT systems.
              </p>
            </div>
          </ContentSection>
        </div>

        {/* Секция 2 */}
        <div style={{ height: '100vh', position: 'relative' }}>
  <ContentSection>
    <div className="space-y-6 max-w-2xl">
      <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-950/50 border border-purple-800/50 rounded-full">
        EXPERTISE & BACKGROUND
      </span>
      
      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
        Software-<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Entwicklung</span>
      </h2>

      {/* Структурированный и красивый блок описания */}
      <div className="space-y-4 text-zinc-300 font-light text-base md:text-lg">
        
        {/* Коммерческий опыт */}
        <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
          <div className="w-2 h-2 mt-2 rounded-full bg-purple-400 shrink-0 shadow-[0_0_10px_#c084fc]" />
          <div>
            <strong className="text-white font-semibold block mb-0.5">Commercial Experience</strong>
            <span className="text-zinc-400 text-sm md:text-base">
              1+ year as Software Developer at <span className="text-white font-medium">SOL Webservice & Consulting</span> (React, TypeScript, PHP, Laravel, Go).
            </span>
          </div>
        </div>

        {/* Стек технологий */}
        <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
          <div className="w-2 h-2 mt-2 rounded-full bg-pink-500 shrink-0 shadow-[0_0_10px_#ec4899]" />
          <div>
            <strong className="text-white font-semibold block mb-0.5">Core Stack & Systems</strong>
            <span className="text-zinc-400 text-sm md:text-base">
              Frontend (React, TS, Tailwind) & Backend (PHP, Laravel, Go, Appwrite), plus IoT & Admin architectures.
            </span>
          </div>
        </div>

        {/* Образование */}
        <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
          <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_10px_#22d3ee]" />
          <div>
            <strong className="text-white font-semibold block mb-0.5">Education & Academic Background</strong>
            <span className="text-zinc-400 text-sm md:text-base block">
              • Schiller-Gymnasium Hameln (Bilingual / Math focus)
            </span>
            <span className="text-zinc-400 text-sm md:text-base block mt-2">
              • Lyceum 150 (Abitur-equivalent, Grade: <span className="text-cyan-400 font-medium">1,66</span>)
            </span>
            <span className="text-zinc-400 text-sm md:text-base block mt-2">
              • IT STEP Computer Academy (Frontend Engineering).
            </span>
          </div>
        </div>
        {/* <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
          <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_10px_#22d3ee]" />
          <div>
            <strong className="text-white font-semibold block mb-0.5">Education</strong>
            <span className="text-zinc-400 text-sm md:text-base">
              Schiller-Gymnasium Hameln (Bilingual / Math focus) + IT STEP Academy.
            </span>
          </div>
        </div> */}

      </div>
    </div>
  </ContentSection>
</div>

        {/* <div style={{ height: '100vh', position: 'relative' }}>
          <ContentSection>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-950/50 border border-purple-800/50 rounded-full">
                EXPERTISE & BACKGROUND
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Software-<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Entwicklung</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Commercial Experience: 1 year as Software Developer at SOL Webservice & Consulting (React, TypeScript, PHP, Laravel, Go). 

                Education: Schiller-Gymnasium Hameln (Bilingual / Math focus) + IT STEP Academy.

                Core Stack: Frontend (React, TS, Tailwind) & Backend (PHP, Laravel, Go, Appwrite).
              </p>
            </div>
          </ContentSection>
        </div> */}

        {/* Секция 3 */}
        <div style={{ height: '100vh', position: 'relative' }}>
          <ContentSection>
            <div className="space-y-6 max-w-2xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950/50 border border-emerald-800/50 rounded-full">
                FEATURED PROJECTS
              </span>
              
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Commercial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">& Shipped Products</span>
              </h2>

              {/* Структурированный список ключевых проектов */}
              <div className="space-y-4 text-zinc-300 font-light text-base md:text-lg">
                
                {/* Проект 1: Real Estate */}
                <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_10px_#34d399]" />
                  <div>
                    <strong className="text-white font-semibold block mb-0.5">Real Estate Admin Panel</strong>
                    <span className="text-zinc-400 text-sm md:text-base">
                      Large-scale commercial admin panel for a real estate rental management service (SOL Webservice & Consulting)..
                    </span>
                  </div>
                </div>

                {/* Проект 2: Industrial IoT */}
                <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 mt-2 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_10px_#22d3ee]" />
                  <div>
                    <strong className="text-white font-semibold block mb-0.5">Industrial Cocktail IoT System</strong>
                    <span className="text-zinc-400 text-sm md:text-base">
                      Industrial software for automated systems with a custom admin panel, web ordering, and barcode-based drink dispensing.
                    </span>
                  </div>
                </div>

                {/* Проект 3: Social Platform */}
                <div className="flex items-start space-x-3 bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_10px_#6366f1]" />
                  <div>
                    <strong className="text-white font-semibold block mb-0.5">Garov-Custom Social Platform</strong>
                    <span className="text-zinc-400 text-sm md:text-base">
                      Full-stack social media platform (React, TypeScript, Appwrite, PWA) featuring authentication, CRUD, and infinite scroll.
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </ContentSection>
        </div>
        {/* <div style={{ height: '100vh', position: 'relative' }}>
          <ContentSection>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950/50 border border-emerald-800/50 rounded-full">
                Next Step
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                Дальнейший <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">функционал...</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Интерактивные проекты, код и погружение в рабочую среду макбука.
              </p>
            </div>
          </ContentSection>
        </div> */}

      </div>
    </Scroll>
    </>
  )
}