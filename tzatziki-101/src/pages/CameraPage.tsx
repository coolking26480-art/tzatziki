import { useRef, useState, useEffect, useCallback } from 'react'
import { useCamera } from '@/hooks/useCamera'

export function CameraPage() {
  const { videoRef, state, error, start, stop } = useCamera()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [flashing, setFlashing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Start camera when page mounts
  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || state !== 'granted') return

    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Flip horizontally for natural feel
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
    setCapturedImage(dataUrl)

    // Flash effect
    setFlashing(true)
    setTimeout(() => setFlashing(false), 120)
  }, [videoRef, state])

  const retake = useCallback(() => {
    setCapturedImage(null)
  }, [])

  const savePhoto = useCallback(() => {
    if (!capturedImage) return
    const a = document.createElement('a')
    a.href = capturedImage
    a.download = `tzatziki-moment-${Date.now()}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [capturedImage])

  const showCamera = state === 'granted' && !capturedImage
  const showFallback = state === 'denied' || state === 'unsupported'

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera feed */}
      {showCamera && (
        <div
          className="relative w-full max-w-[480px] mx-auto"
          style={{ aspectRatio: '3/4', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(232, 240, 227, 0.1)' }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
            playsInline
            muted
            autoPlay
          />
        </div>
      )}

      {/* Fallback / Error */}
      {showFallback && (
        <div
          className="flex flex-col items-center justify-center gap-4 px-8"
          style={{
            width: '100%',
            maxWidth: 480,
            aspectRatio: '3/4',
            borderRadius: 16,
            background: '#0A2E1C',
            border: '1px solid rgba(232, 240, 227, 0.08)',
          }}
        >
          <span style={{ fontSize: 48, opacity: 0.3 }}>📷</span>
          <span
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '1.2rem',
              color: '#E8F0E3',
              opacity: 0.5,
              textAlign: 'center',
            }}
          >
            {error || 'Camera not available'}
          </span>
          {state === 'denied' && (
            <button
              onClick={start}
              className="mt-2 select-none"
              style={{
                padding: '10px 28px',
                borderRadius: 50,
                border: '1px solid rgba(232, 240, 227, 0.2)',
                background: 'rgba(45, 106, 63, 0.3)',
                color: '#E8F0E3',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(45, 106, 63, 0.5)'
                e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(45, 106, 63, 0.3)'
                e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.2)'
              }}
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {/* Shutter button */}
      {showCamera && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={capturePhoto}
            className="select-none"
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '3px solid #E8F0E3',
              background: 'transparent',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.borderColor = '#C4A35A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.borderColor = '#E8F0E3'
            }}
            onMouseDown={(e) => {
              const inner = e.currentTarget.querySelector('div') as HTMLElement
              if (inner) inner.style.inset = '10px'
              e.currentTarget.style.transform = 'scale(0.92)'
            }}
            onMouseUp={(e) => {
              const inner = e.currentTarget.querySelector('div') as HTMLElement
              if (inner) inner.style.inset = '6px'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
          >
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: 6,
                background: '#E8F0E3',
                transition: 'all 0.2s ease',
              }}
            />
          </button>
          <span
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '1rem',
              color: '#E8F0E3',
              opacity: 0.5,
            }}
          >
            snap it
          </span>
        </div>
      )}

      {/* Flash overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'white',
          opacity: flashing ? 1 : 0,
          transition: 'opacity 0.05s ease',
          zIndex: 9999,
        }}
      />

      {/* Photo Preview Overlay */}
      {capturedImage && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center gap-6 px-6"
          style={{
            background: 'rgba(0, 0, 0, 0.92)',
            zIndex: 2000,
            animation: 'previewFade 0.3s ease forwards',
          }}
        >
          <img
            src={capturedImage}
            alt="Captured"
            className="max-w-full max-h-[60vh] rounded-xl"
            style={{ border: '2px solid rgba(232, 240, 227, 0.15)' }}
          />
          <div className="flex gap-4">
            <button
              onClick={retake}
              className="select-none"
              style={{
                padding: '12px 28px',
                borderRadius: 50,
                border: '1px solid rgba(232, 240, 227, 0.2)',
                background: 'rgba(10, 46, 28, 0.6)',
                backdropFilter: 'blur(12px)',
                color: '#E8F0E3',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(27, 77, 46, 0.8)'
                e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 46, 28, 0.6)'
                e.currentTarget.style.borderColor = 'rgba(232, 240, 227, 0.2)'
              }}
            >
              Retake
            </button>
            <button
              onClick={savePhoto}
              className="select-none"
              style={{
                padding: '12px 28px',
                borderRadius: 50,
                border: '1px solid rgba(45, 106, 63, 0.5)',
                background: 'rgba(45, 106, 63, 0.4)',
                backdropFilter: 'blur(12px)',
                color: '#E8F0E3',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(45, 106, 63, 0.6)'
                e.currentTarget.style.borderColor = 'rgba(45, 106, 63, 0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(45, 106, 63, 0.4)'
                e.currentTarget.style.borderColor = 'rgba(45, 106, 63, 0.5)'
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes previewFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}