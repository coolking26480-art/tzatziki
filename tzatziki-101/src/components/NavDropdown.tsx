import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const pages = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'recipe', label: 'Recipe', path: '/recipe' },
  { id: 'capture', label: 'Capture', path: '/capture' },
]

export function NavDropdown() {
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentPage = pages.find(p => p.path === location.pathname)?.id || 'home'

  return (
    <div ref={ref} className="fixed top-4 right-4 z-[1000]">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
        style={{
          background: 'rgba(10, 46, 28, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(232, 240, 227, 0.2)',
          color: '#E8F0E3',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="2" y1="4" x2="12" y2="4" />
          <line x1="2" y1="7" x2="12" y2="7" />
          <line x1="2" y1="10" x2="12" y2="10" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-11 right-0 rounded-xl overflow-hidden"
          style={{
            background: 'rgba(10, 46, 28, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(232, 240, 227, 0.12)',
            minWidth: 130,
            animation: 'navSlide 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                nav(page.path)
                setOpen(false)
              }}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 transition-all duration-200 hover:pl-5"
              style={{
                borderLeft: currentPage === page.id ? '2px solid #C4A35A' : '2px solid transparent',
                color: currentPage === page.id ? '#C4A35A' : '#E8F0E3',
                fontSize: 13,
                fontWeight: currentPage === page.id ? 600 : 400,
                background: currentPage === page.id ? 'rgba(196, 163, 90, 0.08)' : 'transparent',
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes navSlide {
          from { opacity: 0; transform: translateY(-6px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}