import { useEffect } from 'react'

export const useLocalStorageState = watched => {
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])
}