import { useEffect, useRef } from 'react'

/**
 * Subtle, dark, looping canvas animation evoking a neural network /
 * flowing dataset: drifting nodes, distance-based connective lines,
 * occasional binary digits, and a gentle mouse-parallax drift.
 * Intentionally low-opacity so it never competes with the typography.
 */
export default function BackgroundAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, DPR
    let nodes = []
    let rafId
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const maxDist = 130

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      initNodes()
    }

    function initNodes() {
      const count = Math.max(38, Math.min(90, Math.floor((W * H) / 22000)))
      nodes = []
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.6,
          isBit: Math.random() < 0.16,
          bit: Math.random() < 0.5 ? '0' : '1',
          blink: Math.random() * Math.PI * 2,
        })
      }
    }

    function onMouseMove(e) {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = e.clientY / window.innerHeight - 0.5
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      mouse.x += (mouse.tx - mouse.x) * 0.03
      mouse.y += (mouse.ty - mouse.y) * 0.03
      const px = mouse.x * 26
      const py = mouse.y * 18

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = W + 20
        if (n.x > W + 20) n.x = -20
        if (n.y < -20) n.y = H + 20
        if (n.y > H + 20) n.y = -20
        n.blink += 0.02
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28
            ctx.strokeStyle = `rgba(255,90,31,${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x + px, a.y + py)
            ctx.lineTo(b.x + px, b.y + py)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        const flicker = (Math.sin(n.blink) + 1) / 2
        if (n.isBit) {
          ctx.fillStyle = `rgba(245,245,243,${0.18 + flicker * 0.2})`
          ctx.font = '10px JetBrains Mono, monospace'
          ctx.fillText(n.bit, n.x + px, n.y + py)
        } else {
          ctx.beginPath()
          ctx.fillStyle = `rgba(255,90,31,${0.4 + flicker * 0.45})`
          ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas id="bgCanvas" ref={canvasRef} />
}
