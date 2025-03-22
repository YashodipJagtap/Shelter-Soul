import { useState, useEffect } from 'react';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { EMAIL_EXISTS } from '../utils/queries';
import Auth from '../utils/auth';
import pet from '../assets/images/signup/sad-dog.webp';
import {
  FaCalendarDay,
  FaNewspaper,
  FaUnlockAlt,
  FaSave,
} from 'react-icons/fa';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { GiArchiveRegister } from 'react-icons/gi';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    birthday: '',
    favoritePet: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser] = useMutation(ADD_USER);
  const { data: emailExistsData, refetch: refetchEmailExists } = useQuery(
    EMAIL_EXISTS,
    {
      variables: { email: formState.email },
      skip: !formState.email, // Skip query execution if email is not provided
    },
  );
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    if (emailExistsData && emailExistsData.emailExists) {
      setError('Email already exists!');
    } else {
      setError('');
    }
  }, [emailExistsData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    if (name === 'email') {
      refetchEmailExists({ email: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (error) {
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      setSignupSuccess(true);
    } catch (e) {
      console.error(e);
      setError('Email already exists. Please try again!');
    }
  };

  return (
    <main className="section relative">
      <div className="container px-4 mt-20 relative">
        <div className="absolute -top-48 -right-44 hidden lg:block opacity-45 -z-10">
          <img
            src={pet}
            alt="sad dog"
            className="mask mask-heart max-h-[800px]"
          />
        </div>
        <div className="flex flex-col items-center lg:items-stretch lg:justify-start z-10 lg:flex-row">
          <div className="max-w-md w-full">
            <div className="bg-base-300 shadow-md px-8 py-8 border-r-2 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl relative">
              <h4 className="text-2x1 mb-8 mt-1 font-bold text-center text-[34px] border-b py-1">
                SIGN UP
              </h4>
              {signupSuccess ? (
                <p className="text-green-500 mb-4">
                  Success! Your account has been created!
                </p>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="mb-4 col-span-2 lg:col-span-1">
                    <label htmlFor="name" className="block text-neutral mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border rounded text-black"
                      placeholder="Enter full name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4 col-span-2 lg:col-span-1">
                    <label
                      htmlFor="birthday"
                      className="block text-neutral mb-2"
                    >
                      Birthday
                    </label>
                    <input
                      id="birthday"
                      className="w-full px-3 py-2 border rounded uppercase text-black"
                      placeholder="Enter birthday"
                      name="birthday"
                      type="date"
                      value={formState.birthday}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4 col-span-2 lg:col-span-1">
                    <label
                      htmlFor="favoritePet"
                      className="block text-neutral mb-2"
                    >
                      Favorite Pet
                    </label>
                    <select
                      id="favoritePet"
                      className="w-full px-3 py-2 border rounded text-black"
                      name="favoritePet"
                      value={formState.favoritePet}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a pet</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4 col-span-2 lg:col-span-1">
                    <label htmlFor="email" className="block text-neutral mb-2">
                      Email
                    </label>
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
                  <div className="mb-2 col-span-2 lg:col-span-1">
                    <label
                      htmlFor="password"
                      className="block text-neutral mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="w-full px-3 py-2 border rounded text-black"
                      placeholder="At least 5 characters"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-2 col-span-2 lg:col-span-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-neutral mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      className="w-full px-3 py-2 border rounded text-black"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formState.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    className="col-span-2 w-full py-2 btn btn-accent mt-2 text-[16px] rounded-xl"
                    type="submit"
                  >
                    <GiArchiveRegister />
                    REGISTER
                  </button>
                </form>
              )}
              {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
          </div>
          <div className="max-w-md w-full px-6 bg-neutral text-black lg:min-w-max rounded-r-xl">
            <h3>Get instant access to our services by joining us today!</h3>
            <ul className="space-y-2">
              <li className="flex gap-4 items-center">
                <FaUnlockAlt /> Get access to all our exclusive contents
              </li>
              <li className="flex gap-4 items-center">
                <FaSave />
                Save the pets you like to your favourite list
              </li>
              <li className="flex gap-4 items-center">
                <FaNewspaper />
                You can opt in to our quarterly newsletter
              </li>
              <li className="flex gap-4 items-center">
                <FaCalendarDay />
                You can make a booking to visit our shelters
              </li>
              <li className="flex gap-4 items-center">
                <BiSolidDonateHeart />
                When you donate, we send you a free gift pack
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
