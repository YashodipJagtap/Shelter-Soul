import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import dog from '../assets/images/login/sad-dog.jpg';
import Auth from '../utils/auth';
import { ImEnter } from 'react-icons/im';

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [login, { data }] = useMutation(LOGIN_USER);
  const [error, setError] = useState('');

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      setError('Invalid email or password. Please try again.');
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="section">
      <div className="flex justify-end items-center container  mx-auto relative">
        <img
          src={dog}
          alt="sad dog"
          className="contain h-[1200px] mask mask-squircle absolute right-1/4 -z-10 opacity-50"
        />
        <div className="max-w-md w-full px-4 ">
          <div className="flex flex-col justify-center bg-base-300 shadow-md rounded-xl px-8 py-8 -mt-12 min-h-[600px] ">
            <h4 className="text-2x1 mb-8 mt-1 font-bold text-center text-[34px] border-b py-1">
              LOGIN
            </h4>
            {data ? (
              <p className="text-green-500 mb-4 text-center font-bold">
                Logged in successfully!
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="email" className="block text-neutral mb-2">
                  Email
                </label>
                <div className="mb-4">
                  <input
                    id="email"
                    className="w-full px-3 py-2 border rounded text-black"
                    placeholder="Enter email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-neutral mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    className="w-full px-3 py-2 border rounded text-black"
                    placeholder="*****"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  className="w-full py-2 btn btn-accent mt-2 text-[16px] rounded-xl"
                  type="submit"
                >
                  <ImEnter />
                  LOGIN
                </button>
              </form>
            )}
            {error && (
              <div className="text-red-500 mt-4 text-center">{error}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
