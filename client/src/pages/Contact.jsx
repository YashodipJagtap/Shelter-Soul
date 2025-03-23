import { useRef, useState, useEffect } from 'react';
import { contact } from '../data';
import { validateEmail } from '../utils/helpers';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';
import Alert from '../components/Alert';

const Contact = () => {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const form = useRef();

  useEffect(() => {
    // Log environment variables to verify they are being loaded correctly
    console.log('SERVICE ID:', import.meta.env.VITE_SERVICE_ID);
    console.log('TEMPLATE ID:', import.meta.env.VITE_TEMPLATE_ID);
    console.log('USER ID:', import.meta.env.VITE_USER_ID);
  }, []);

  //handle input blur
  const handleInputBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        if (!email) {
          setErrorMessage('Email is required');
        } else if (!validateEmail(email)) {
          setErrorMessage('Invalid email');
        } else {
          setErrorMessage('');
        }
        break;
      case 'firstName':
        if (!firstName) {
          setErrorMessage('First name is required');
        } else {
          setErrorMessage('');
        }
        break;
      case 'lastName':
        if (!lastName) {
          setErrorMessage('Last name is required');
        } else {
          setErrorMessage('');
        }
        break;
      case 'message':
        if (!message) {
          setErrorMessage('Message is required');
        } else {
          setErrorMessage('');
        }
        break;
      default:
        break;
    }
  };

  //based on the name of the input field, update the corresponding state variable
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'subject':
        setSubject(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  };

  // Handle the form submission
  const handleFormSubmit = async (e) => {
    if (!email || !firstName || !lastName || !message) {
      alert('Please fill in all required fields');
      setErrorMessage('Please fill in all required fields');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email');
      return;
    }
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_USER_ID,
      );
      if (result.text === 'OK') {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <section
      onLoad={focusInput}
      className="section flex-col justify-between"
      id="contact"
    >
      <Alert
        message={contact.successMessage}
        type="success"
        show={showSuccess}
      />
      <Alert message={contact.errorMessage} type="error" show={showError} />
      <div>
        {/* section title  */}
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <h2 className=" section-title before:content-contact relative before:absolute before:opacity-25 before:-top-7 before:-left-40 before:hidden before:lg:block">
              {contact.title}
            </h2>
            <p className="subtitle">{contact.subtitle}</p>
          </div>
          <div className="flex flex-col lg:gap-x-8 lg:flex-row ">
            {/* contact info */}
            <div className="flex flex-1 flex-col items-start space-y-8 mb-12 lg:mb-0 lg:pt-2">
              <div className=" flex items-center justify-center gap-4">
                <span className="text-accent text-4xl">{contact.icon.map}</span>
                <h4 className=" text-2xl m-0">{contact.location.title}</h4>
              </div>
              <div className="divide-y-2">
                {contact.location.locations.map((location, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3">
                    <h5 className="text-xl m-0">{location.location}</h5>
                    <div className="text-lg m-0 flex items-center gap-2">
                      {contact.icon.mail}
                      <a href={`mailto:${location.email}`}>{location.email}</a>
                    </div>
                    <div className="text-lg m-0 flex items-center gap-2">
                      {contact.icon.phone}
                      <a href={`tel:${location.number}`}>{location.number}</a>
                    </div>
                    <div className="text-lg m-0 flex items-center gap-2 italic">
                      <a
                        href={`http://maps.google.com/?q= ${location.address}`}
                        target="_blank"
                      >
                        {location.address}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* contact form */}
            <form ref={form} className="space-y-8 w-full max-w-[780px]">
              <span className="italic text-sm">
                Fields marked with * are required
              </span>
              <div className="flex gap-8">
                <input
                  type="text"
                  className="input"
                  placeholder="First name *"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  ref={inputRef}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Last name *"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className="flex gap-8">
                <input
                  type="email"
                  className="input"
                  placeholder="Your email *"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <input
                  type="tel"
                  className="input"
                  placeholder="Your phone (optional)"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="text"
                className="input"
                placeholder="Subject *"
                name="subject"
                value={subject}
                onChange={handleInputChange}
              />
              <textarea
                className="textarea"
                placeholder="Your message *"
                name="message"
                value={message}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              ></textarea>
              {errorMessage && (
                <p className="text-red-500 text-md italic">{errorMessage}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-md btn-accent rounded-xl"
                  onClick={handleFormSubmit}
                >
                  {contact.icon.send}SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
