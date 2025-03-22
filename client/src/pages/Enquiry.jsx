import { useRef, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { contact } from '../data';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import bonding from '../assets/images/enquiry/pet-bonding.jpg';
import cuddling from '../assets/images/enquiry/cuddling.webp';
import { useParams } from 'react-router-dom';
import { QUERY_PET_FOR_ENQUIRY } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { QUERY_ME } from '../utils/queries';

const Enquiry = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [previousPets, setPreviousPets] = useState('');
  const [numberOfPets, setNumberOfPets] = useState(1);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const enquiryForm = useRef();
  const { petId } = useParams();

  const { data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  const { data } = useQuery(QUERY_PET_FOR_ENQUIRY, {
    variables: { petId: petId },
  });
  const pet = data?.pet || {};
  const {
    _id,
    name,
    breed,
    species,
    age,
    color,
    description,
    gender,
    location,
  } = pet;

  const [address, setAddress] = useState({
    street: '',
    city: '',
    stateProvince: '',
    postalCode: '',
  });

  const australiaStates = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Function to generate time options
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>,
        );
      }
    }
    return options;
  };

  // not complete yet
  const handleInputBlur = (e) => {
    switch (e.target.name) {
      case 'phoneNumber':
        if (!phoneNumber) {
          setErrorMessage('Phone number is required');
        } else if (!/^0(2|4)\d{8}$/.test(phoneNumber)) {
          setErrorMessage('Invalid phone number');
        } else {
          setErrorMessage('');
        }
        break;

      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'previousPets':
        setPreviousPets(e.target.value);
        break;
      case 'numberOfPets':
        setNumberOfPets(Math.max(1, parseInt(e.target.value)));
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (e) => {
    alert('Your enquiry has been sent successfully');
    //redirect to pets page
    window.location.assign('/pets');
  };
  const focusInput = () => {
    inputRef.current.focus();
  };
  const handleUserAndPetDataChange = (e) => {};

  return (
    <section
      className="section flex-col justify-between"
      id="enquiry"
      onLoad={focusInput}
    >
      <Alert
        message={contact.successMessage}
        type="success"
        show={showSuccess}
      />
      <Alert message={contact.errorMessage} type="error" show={showError} />
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="section-title before:content-enquiry relative before:absolute before:opacity-25 before:-top-7 before:-left-40 before:hidden before:lg:block ">
            Enquiry Form
          </h2>
          <h3 className="text-lg text-gray-600 mb-4">
            Please provide your additional details in the form below.
          </h3>
        </div>
        <div className="flex flex-col-reverse lg:gap-x-8 lg:flex-row">
          {/* -----------------form----------------- */}
          <form ref={enquiryForm} className="space-y-4 min-w-[450px]">
            <div className="italic text-sm text-center">
              Fields marked with * are required
            </div>

            {/* user related data that are needed to send the enquiry
            but not needed to be filled by the user */}
            <div className="hidden">
              <input
                className="input"
                type="text"
                value={_id}
                name="petId"
                onChange={handleUserAndPetDataChange}
              />
              <input
                className="input"
                type="text"
                value={user?.name}
                name="name"
                onChange={handleUserAndPetDataChange}
              />
              <input
                className="input"
                type="text"
                value={user?.email}
                name="email"
                onChange={handleUserAndPetDataChange}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <input
                type="tel"
                className="input"
                placeholder="Phone Number *"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                ref={inputRef}
              />
              <select
                className="input"
                value={previousPets}
                onChange={handleInputChange}
                name="previousPets"
                required
              >
                <option value="">Did you have any pets before?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {previousPets === 'yes' && (
                <input
                  type="number"
                  className="input"
                  placeholder="How many pets do you have in your house?"
                  name="numberOfPets"
                  value={numberOfPets}
                  onChange={handleInputChange}
                />
              )}
            </div>

            <div className="flex flex-col items-center gap-2 ">
              <div className="flex flex-col w-full items-center space-y-2 gap-">
                <h4 className="block font-semibold text-center mt-2 mb-0">
                  Address *
                </h4>
                <input
                  type="text"
                  className="input"
                  placeholder="Street Address"
                  name="street"
                  value={address.streetAddress}
                  onChange={handleAddressChange}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="City"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="flex flex-col  w-full items-center space-y-2">
                <select
                  className="input"
                  name="state"
                  value={address.stateProvince}
                  onChange={handleAddressChange}
                >
                  <option value="">Select State/Province *</option>
                  {australiaStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="input"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="block font-semibold mt-2">
                Your appointment will be at:
              </h4>
              <div className="flex justify-center w-full">
                {location === 'Sydney' && (
                  <input
                    className="input"
                    type="text"
                    value={contact.location.locations[0].address}
                    name="branchSyd"
                    disabled
                  />
                )}
                {location === 'Melbourne' && (
                  <input
                    className="input"
                    type="text"
                    name="branchMel"
                    value={contact.location.locations[1].address}
                    disabled
                  />
                )}
                {location === 'Brisbane' && (
                  <input
                    className="input"
                    type="text"
                    name="branchBrisb"
                    value={contact.location.locations[2].address}
                    disabled
                  />
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-col  w-full  items-center ">
              <div className="flex flex-col  w-full items-center">
                <h4 className="block font-semibold mt-0">
                  Select Appointment Date:
                </h4>
                <input
                  type="date"
                  className="input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  name="appointmentDate"
                />
              </div>
              <div className="flex flex-col  w-full items-center">
                <h4 className="block font-semibold mt-2">
                  Select Appointment Time:
                </h4>
                <select
                  className="input"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  name="appointmentTime"
                >
                  <option value="">Select Time *</option>
                  {generateTimeOptions()}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {errorMessage && (
                <p className="text-red-500 text-md italic">{errorMessage}</p>
              )}
            </div>
            <div className="flex justify-center">
              <div className="card card-compact w-96 bg-base-200 shadow-xl">
                <div className="card-body divide-y divide-dashed divide-neutral">
                  <div className="bg-base-100 w-full">
                    <h2 className="card-title">
                      {name}
                      <div className="badge badge-secondary text-neutral">
                        {breed}
                        {species}
                      </div>
                    </h2>
                    <p className="line-clamp-3 text-sm">{description}</p>
                    <div className="card-actions flex-col items-end">
                      <div className="space-x-1">
                        <div className="badge badge-outline">
                          {age}year{age > 1 && 's'}
                        </div>
                        <div className="badge badge-outline">{color}</div>
                      </div>
                      <div>
                        <div className="badge badge-outline">{location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center pt-4">
                    <span className="flex">Hi, {user.name}!</span>

                    <ul className="text-sm italic ">
                      <li>
                        While you are visiting with <code>{name}</code>, our
                        main goal will be to introduce, and showcase you to{' '}
                        {gender === 'Male' ? 'him' : 'her'}. However, feel free
                        to explore other pets available for adoption.
                      </li>
                      <li>
                        Kindly be aware that the appointment is allocated for a
                        30-minute duration during which one of our staff
                        members, responsible for the pet, will assist you. Feel
                        free to extend your stay if you'd like to interact
                        further with the pets at the shelter.
                      </li>
                      <li>
                        Depending on your personal circumstances, our expert
                        staff may recommend alternative pets that better suit
                        your needs.
                      </li>
                      <li>
                        Our staff will be in touch with you to confirm your
                        booking.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="btn  btn-accent"
                onClick={handleFormSubmit}
              >
                {contact.icon.send}Send Enquiry
              </button>
            </div>
          </form>
          <div className="xl:block">
            <img
              src={bonding}
              alt="Dog"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Enquiry;
