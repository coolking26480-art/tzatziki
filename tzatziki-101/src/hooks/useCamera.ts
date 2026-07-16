import { useRef, useState, useEffect, useCallback } from 'react'

export type CameraState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<CameraState>('idle')
  const [error, setError] = useState<string>('')
  const streamRef = useRef<MediaStream | null>(null)

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setState('unsupported')
      setError('Camera not supported')
      return
    }

    setState('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setState('granted')
      setError('')
    } catch (err) {
      setState('denied')
      setError(err instanceof Error ? err.message : 'Camera access denied')
    }
  }, [])

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setState('idle')
  }, [])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  return { videoRef, state, error, start, stop }
}