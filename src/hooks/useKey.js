import { useEffect } from 'react'

export const useKey = (key, action) => {
  useEffect(() => {
    const callback = e => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action()
      }
    }
    document.addEventListener('keydown', callback)
    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [action, key])
}