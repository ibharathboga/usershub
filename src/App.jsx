import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const axiosDemo = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts/1"
    try {
      const response = await axios.get(url);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { axiosDemo(); }, []);

  return (
    <div className='border-2 border-red-500 flex flex-col max-w-[500px] mx-auto'>
      <p className='text-center'>{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>decrement</button>
    </div>
  )
}

export default App
