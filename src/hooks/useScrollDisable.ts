import React from 'react'

const useScrollDisable = (disable: boolean) => {
  React.useLayoutEffect(() => {
    if (disable) {
      document.body.style.setProperty('overflow', 'hidden', 'important')
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [disable])

  React.useEffect(() => {
    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [])
}

export default useScrollDisable
