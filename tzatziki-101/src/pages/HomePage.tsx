import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const nav = useNavigate()

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0A2E1C' }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8F0E3' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating leaf decorations */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '12%', left: '8%',
          fontSize: 22,
          opacity: 0.1,
          animation: 'leafDrift 9s ease-in-out infinite',
        }}
      >🌿</div>
      <div
        className="absolute pointer-events-none"
        style={{
          top: '22%', right: '10%',
          fontSize: 18,
          opacity: 0.08,
          animation: 'leafDrift 7s ease-in-out infinite 2s',
        }}
      >🍃</div>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '18%', left: '12%',
          fontSize: 20,
          opacity: 0.09,
          animation: 'leafDrift 8s ease-in-out infinite 4s',
        }}
      >🌿</div>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '28%', right: '8%',
          fontSize: 16,
          opacity: 0.07,
          animation: 'leafDrift 10s ease-in-out infinite 1s',
        }}
      >🍃</div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        {/* Headline */}
        <h1
          className="font-display select-none"
          style={{
            fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
            lineHeight: 1.1,
            color: '#E8F0E3',
            textShadow: '0 2px 40px rgba(45, 106, 63, 0.4)',
            transform: 'rotate(-1.5deg)',
            animation: 'headlineFloat 5s ease-in-out infinite',
            letterSpacing: '-0.01em',
          }}
        >
          Dahi Mein Keera
        </h1>
        <p
          className="font-display mt-2 select-none"
          style={{
            fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
            color: '#4A8C5C',
            opacity: 0.85,
            transform: 'rotate(-0.5deg)',
          }}
        >
          Tzatziki 101
        </p>

        {/* Hand-drawn underline SVG */}
        <svg
          className="mx-auto mt-3"
          style={{ width: '55%', maxWidth: 220, height: 10 }}
          viewBox="0 0 220 10"
          preserveAspectRatio="none"
        >
          <path
            d="M2 6 C 40 2, 90 8, 110 5 S 180 2, 218 6"
            fill="none"
            stroke="#C4A35A"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
            style={{ animation: 'drawLine 1.5s ease-out 0.5s forwards', strokeDasharray: 300, strokeDashoffset: 300 }}
          />
        </svg>

        {/* CTA Button — Glassmorphism */}
        <button
          onClick={() => nav('/recipe')}
          className="mt-12 select-none"
          style={{
            padding: '14px 44px',
            borderRadius: 50,
            border: '1px solid rgba(232, 240, 227, 0.2)',
            background: 'linear-gradient(135deg, rgba(45, 106, 63, 0.25) 0%, rgba(27, 77, 46, 0.15) 50%, rgba(196, 163, 90, 0.06) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#F5F1E8',
            fontFamily: '"Caveat", cursive',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px rgba(45, 106, 63, 0.12)',
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget
            btn.style.transform = 'translateY(-3px) scale(1.03)'
            btn.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 80px rgba(45, 106, 63, 0.2)'
            btn.style.borderColor = 'rgba(232, 240, 227, 0.35)'
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget
            btn.style.transform = 'translateY(0) scale(1)'
            btn.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px rgba(45, 106, 63, 0.12)'
            btn.style.borderColor = 'rgba(232, 240, 227, 0.2)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(1px) scale(0.97)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'
          }}
        >
          Maatchaaa<span style={{ letterSpacing: 3, opacity: 0.7 }}>....</span>
        </button>
      </div>

      <style>{`
        @keyframes headlineFloat {
          0%, 100% { transform: rotate(-1.5deg) translateY(0); }
          50% { transform: rotate(-1.2deg) translateY(-5px); }
        }
        @keyframes leafDrift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(6px, -10px) rotate(4deg); }
          50% { transform: translate(-3px, -5px) rotate(-2deg); }
          75% { transform: translate(5px, 3px) rotate(2deg); }
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}