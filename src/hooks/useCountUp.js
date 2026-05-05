import { useState, useEffect, useRef } from 'react'

export function useCountUp(target, duration = 1000, delay = 0) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!target) return
    const timer = setTimeout(() => {
      const start = performance.now()
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) rafRef.current = requestAnimationFrame(animate)
        else setCount(target)
      }
      rafRef.current = requestAnimationFrame(animate)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current) }
  }, [target, duration, delay])

  return count
}
