import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={"/img.jpeg"} className="logo" alt="Vite logo" />
      </div>
    </>
  )
}

export default App
