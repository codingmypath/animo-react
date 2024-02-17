import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';



export default function SignIn() {
  const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.id]: e.target.value,
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
        //   setLoading(false);
        //   setError(data.message);
        dispatch(signInFailure(data.message));
          return;
        }
        // setLoading(false);
        // setError(null);
        dispatch(signInSuccess(data));
        navigate('/');
    } catch (error) {
        // setLoading(false);
        // setError(error.message);
        dispatch(signInFailure(data.message))
    }
   
  }

  console.log(formData)

  return (
    <div className='p-4 py-40 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-darkGreen'>Sign In</h1>
      <p className='text-center text-darkGreen'>Email: demo@animo.com</p>
      <p className='text-center text-darkGreen'>Password: demo1</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} 
              className='bg-darkGreen text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                {loading ? 'Loading...' : 'Sign In' }
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-darkGreen hover:text-middleGreen'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
