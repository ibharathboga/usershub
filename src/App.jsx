import { useEffect, useState } from 'react';
import './App.css';
import iaxios from './utils/axios';

function App() {
  const [count, setCount] = useState(0)

  const axiosDemo = async () => {
    try {
      const response = await iaxios.get("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => { axiosDemo(); }, []);

  return (
    <div className='border-2 border-red-500 flex flex-col max-w-[500px] mx-auto'>
      <p className='text-center'>{count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>incrasdfasdfement</button>
      <button onClick={() => setCount(prev => prev - 1)}>decrement</button>
    </div>
  )
}

export default App
