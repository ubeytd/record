'use client'

import { useEffect, useRef } from 'react'

interface AudioWaveProps {
  isRecording: boolean
  audioStream?: MediaStream
  color?: string
}

export function AudioWave({ isRecording, audioStream, color = '#FFFFFF' }: AudioWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const analyzerRef = useRef<AnalyserNode>()
  const dataArrayRef = useRef<Uint8Array>()
  const previousDataRef = useRef<number[]>([])

  useEffect(() => {
    if (!isRecording || !audioStream || !canvasRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyzer = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(audioStream)
    
    analyzer.fftSize = 1024
    analyzer.smoothingTimeConstant = 0.85
    source.connect(analyzer)
    
    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    
    analyzerRef.current = analyzer
    dataArrayRef.current = dataArray

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    
    // Initialize previous data array
    if (previousDataRef.current.length === 0) {
      previousDataRef.current = new Array(bufferLength).fill(128)
    }

    const draw = () => {
      if (!isRecording || !analyzerRef.current || !dataArrayRef.current || !previousDataRef.current) return
      
      const width = canvas.width
      const height = canvas.height
      const centerY = height / 2
      const data = dataArrayRef.current
      const previousData: number[] = previousDataRef.current
      
      analyzerRef.current.getByteTimeDomainData(data)
      
      // Clear canvas with transparency
      ctx.clearRect(0, 0, width, height)
      
      ctx.lineWidth = 2
      ctx.strokeStyle = color
      ctx.beginPath()

      // Number of points to draw
      const drawPoints = 100
      const step = Math.floor(bufferLength / drawPoints)
      
      for (let i = 0; i < drawPoints; i++) {
        const dataIndex = i * step
        const x = (i / drawPoints) * width

        // Get current value and smooth it with previous value
        const currentValue = data[dataIndex] || 128
        const prevValue = previousData[i] || 128
        previousData[i] = prevValue * 0.7 + currentValue * 0.3

        // Calculate y position with smoothing and scaling
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const normalizedValue = (previousData[i]! - 128) / 128
        const y = centerY + normalizedValue * (height / 3)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          // Use quadratic curves for smoother lines
          const prevX = ((i - 1) / drawPoints) * width
          const prevY = centerY + ((previousData[i - 1]! - 128) / 128) * (height / 3)
          const cpX = (x + prevX) / 2
          ctx.quadraticCurveTo(cpX, prevY, x, y)
        }
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
      }
      
      ctx.stroke()
      
      animationRef.current = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      audioContext.close()
    }
  }, [isRecording, audioStream, color])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      width={800}
      height={128}
      style={{ background: 'transparent' }}
    />
  )
}

