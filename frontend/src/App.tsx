import { useState, type JSX } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App(): JSX.Element {
  // TypeScript infers count as a number automatically
  const [count, setCount] = useState<number>(0)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-6 md:p-12 font-sans selection:bg-emerald-500 selection:text-slate-900">
      
      {/* Center Section */}
      <section id="center" className="flex flex-col items-center text-center max-w-xl w-full mt-10 space-y-6">
        <div className="hero relative flex items-center justify-center w-48 h-48">
          {/* Main Hero Graphic */}
          <img src={heroImg} className="base animate-pulse" width="170" height="179" alt="" />
          {/* Floating Framework Logos */}
          <img src={reactLogo} className="framework absolute top-0 -right-4 w-12 h-12 animate-[spin_20s_linear_infinite]" alt="React logo" />
          <img src={viteLogo} className="vite absolute -top-4 -left-4 w-12 h-12 hover:scale-110 transition-transform" alt="Vite logo" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400 bg-clip-text text-transparent">
            Get started
          </h1>
          <p className="text-slate-400 text-lg">
            Edit <code className="bg-slate-800 text-pink-400 px-1.5 py-0.5 rounded font-mono text-sm">src/App.tsx</code> and save to test <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-sm">HMR</code>
          </p>
        </div>
        
        <button
          type="button"
          className="counter bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all text-base border border-indigo-400/20"
          onClick={() => setCount((prevCount: number) => prevCount + 1)}
        >
          Count is <span className="font-mono bg-slate-900/40 px-2 py-0.5 rounded ml-1">{count}</span>
        </button>
      </section>

      {/* Decorative Ticks Separator */}
      <div className="ticks w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-12"></div>

      {/* Next Steps Section */}
      <section id="next-steps" className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Documentation Block */}
        <div id="docs" className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl flex flex-col space-y-4 hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center space-x-3">
            <svg className="icon w-6 h-6 text-indigo-400" role="presentation" aria-hidden="true">
              <use href="/icons.svg#documentation-icon"></use>
            </svg>
            <h2 className="text-xl font-bold">Documentation</h2>
          </div>
          <p className="text-slate-400 text-sm">Your questions, answered</p>
          <ul className="flex flex-wrap gap-3 pt-2">
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <img className="logo w-4 h-4" src={viteLogo} alt="" />
                <span>Explore Vite</span>
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <img className="button-icon w-4 h-4" src={reactLogo} alt="" />
                <span>Learn more</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Social Connect Block */}
        <div id="social" className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl flex flex-col space-y-4 hover:border-purple-500/40 transition-colors">
          <div className="flex items-center space-x-3">
            <svg className="icon w-6 h-6 text-purple-400" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2 className="text-xl font-bold">Connect with us</h2>
          </div>
          <p className="text-slate-400 text-sm">Join the Vite community</p>
          <ul className="grid grid-cols-2 gap-2 pt-2">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <svg className="button-icon w-4 h-4 text-slate-300" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <svg className="button-icon w-4 h-4 text-indigo-400" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                <span>Discord</span>
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <svg className="button-icon w-4 h-4 text-slate-200" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                <span>X.com</span>
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm transition-colors border border-slate-700">
                <svg className="button-icon w-4 h-4 text-blue-400" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                <span>Bluesky</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-20"></div>
    </div>
  )
}

export default App
