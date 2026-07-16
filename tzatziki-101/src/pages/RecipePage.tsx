import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ingredients = [
  { name: 'Greek Yogurt', qty: '2 cups' },
  { name: 'Cucumber', qty: '1 large' },
  { name: 'Garlic', qty: '3 cloves' },
  { name: 'Fresh Dill', qty: '2 tbsp' },
  { name: 'Lemon Juice', qty: '1 tbsp' },
  { name: 'Olive Oil', qty: '2 tbsp' },
  { name: 'Salt', qty: 'to taste' },
]

const stepLabels = ['Grate', 'Drain', 'Mince', 'Mix', 'Chill']

function IngredientRow({
  name,
  qty,
  checked,
  onToggle,
}: {
  name: string
  qty: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center gap-3 py-3.5 cursor-pointer select-none transition-all duration-250"
      style={{
        borderBottom: '1px dashed rgba(232, 240, 227, 0.1)',
        opacity: checked ? 0.4 : 1,
        paddingLeft: checked ? 4 : 0,
      }}
    >
      {/* Custom checkbox */}
      <div
        className="flex-shrink-0 flex items-center justify-center transition-all duration-200"
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: `2px solid ${checked ? '#2D6A3F' : '#4A8C5C'}`,
          background: checked ? '#2D6A3F' : 'transparent',
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8F0E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'checkPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
            <polyline points="4 12 9 17 20 6" />
          </svg>
        )}
      </div>

      {/* Name */}
      <span
        className="flex-shrink-0 text-[15px]"
        style={{
          fontWeight: 400,
          color: '#F5F1E8',
          textDecoration: checked ? 'line-through' : 'none',
          textDecorationColor: '#4A8C5C',
          textDecorationThickness: 2,
          transition: 'all 0.3s ease',
        }}
      >
        {name}
      </span>

      {/* Dashed line */}
      <div
        className="flex-1 min-w-[20px]"
        style={{
          height: 1,
          background: 'repeating-linear-gradient(90deg, #4A8C5C 0, #4A8C5C 4px, transparent 4px, transparent 8px)',
          opacity: 0.25,
        }}
      />

      {/* Quantity */}
      <span
        className="flex-shrink-0"
        style={{
          fontFamily: '"Caveat", cursive',
          fontSize: '1.1rem',
          color: '#C4A35A',
          opacity: checked ? 0.5 : 0.85,
          textDecoration: checked ? 'line-through' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {qty}
      </span>
    </div>
  )
}

function PhotoCard({ num, label }: { num: number; label: string }) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: '1',
        borderRadius: 14,
        background: '#1B4D2E',
        border: '1px solid rgba(232, 240, 227, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
        e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.18)'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.08)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span
          className="font-display select-none"
          style={{
            fontSize: '2.5rem',
            color: '#E8F0E3',
            opacity: 0.12,
          }}
        >
          {num}
        </span>
        <span
          className="select-none"
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '0.9rem',
            color: '#E8F0E3',
            opacity: 0.35,
          }}
        >
          {label}
        </span>
        <span
          className="select-none mt-1"
          style={{
            fontSize: 11,
            color: '#4A8C5C',
            opacity: 0.4,
          }}
        >
          your photo here
        </span>
      </div>
    </div>
  )
}

export function RecipePage() {
  const nav = useNavigate()
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleItem = (i: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div
      className="fixed inset-0 overflow-y-auto no-scrollbar"
      style={{ background: '#0A2E1C' }}
    >
      {/* Sticky Header */}
      <div
        className="sticky top-0 z-50"
        style={{
          background: 'linear-gradient(180deg, #0A2E1C 0%, rgba(10, 46, 28, 0.95) 100%)',
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(232, 240, 227, 0.06)',
        }}
      >
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.3rem, 4.5vw, 1.9rem)',
            color: '#E8F0E3',
            letterSpacing: '0.02em',
            lineHeight: 1.2,
          }}
        >
          follow what is written
        </h1>
        <p
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 'clamp(0.85rem, 3vw, 1.05rem)',
            color: '#4A8C5C',
            opacity: 0.65,
            marginTop: 2,
          }}
        >
          Call Sujal if you have a doubt
        </p>
      </div>

      {/* Body */}
      <div className="px-5 pb-32 max-w-lg mx-auto">
        {/* Ingredients */}
        <div className="mt-6 mb-10">
          <h2
            className="font-display mb-4"
            style={{
              fontSize: '1rem',
              color: '#C4A35A',
              opacity: 0.9,
            }}
          >
            what you need
          </h2>
          {ingredients.map((ing, i) => (
            <IngredientRow
              key={i}
              name={ing.name}
              qty={ing.qty}
              checked={checkedItems.has(i)}
              onToggle={() => toggleItem(i)}
            />
          ))}
        </div>

        {/* Photo Grid */}
        <div
          className="grid gap-3 mb-12"
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          {stepLabels.map((label, i) => (
            <PhotoCard key={i} num={i + 1} label={label} />
          ))}
        </div>

        {/* I did it button */}
        <div className="flex justify-center">
          <button
            onClick={() => nav('/capture')}
            className="flex flex-col items-center justify-center select-none"
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              border: '2px solid rgba(232, 240, 227, 0.18)',
              background: 'linear-gradient(135deg, rgba(45, 106, 63, 0.3) 0%, rgba(27, 77, 46, 0.2) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.35)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(45, 106, 63, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.18)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Pulse ring */}
            <div
              className="absolute inset-[-5px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(196, 163, 90, 0.15)',
                animation: 'pulseRing 2.5s ease-in-out infinite',
              }}
            />
            <span style={{ fontSize: 28 }}>📸</span>
            <span
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '0.85rem',
                color: '#E8F0E3',
                opacity: 0.75,
                marginTop: 2,
              }}
            >
              I did it!
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes checkPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}