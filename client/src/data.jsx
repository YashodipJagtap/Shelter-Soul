// Description: This file contains all the data that is used in the application.
//donation logo
import { BiSolidDonateHeart } from 'react-icons/bi';

//paw icon
import { MdPets } from 'react-icons/md';

//header logos
import { FaUserCheck } from 'react-icons/fa6';
import { FaUserLock } from 'react-icons/fa6';
//brand logo
import logo from './assets/images/logo.gif';

//contact us icons
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsSendArrowUpFill } from 'react-icons/bs';

//error page photo
import dog from './assets/images/error/adopt-me-pet.png';

//about hero photos
import hero1 from './assets/images/about/hero/hero1.jpg';
import hero2 from './assets/images/about/hero/hero2.jpg';
import hero3 from './assets/images/about/hero/hero3.jpg';
import hero4 from './assets/images/about/hero/hero4.jpg';

//about staff photos
import suyash from './assets/images/about/suyash.jpg';
import yukitoshi from './assets/images/about/Yuki.jpg';
import jodie from './assets/images/about/jodie.jpg';

//about sponsors photos
import myer from './assets/images/about/myer_logo.jpg';
import nova from './assets/images/about/nova.png';
import nsw from './assets/images/about/nsw-gov.png';
import smh from './assets/images/about/smh.jpg';
import coles from './assets/images/about/coles.jpg';
import staff from './assets/images/about/StaffGroup.jpg';

//home photos
import hero from './assets/images/home/pet-adoption.png';
import rego1 from './assets/images/home/acnc.png';
import rego2 from './assets/images/home/ACNC-1.png';

export const about = {
  heros: [hero1, hero2, hero3, hero4],
  title: 'ABOUT US',
  heading:
    'For the past decades, Shelter Soul has been embracing a brighter future for animals in need.',
  paragraphs: [
    'Shelter Soul is a non-profit organization dedicated to creating a better future for animals. We work tirelessly to provide a safe and loving environment for them, ensuring they receive the care and support they need to thrive.',
    'I believe every animal deserves a second chance at life, and I am committed to helping them find it. We collaborate with local shelters and rescue groups to find homes for animals in need, providing medical care and support to help them recover and flourish.',
    'A key focus of Shelter Soul is to raise the value of animals in society so that the intrinsic needs of each species are recognised, respected and met.Just as importantly, we will:'
  ],

  commitments: [
    'Ensure that no healthy, sociable, or treatable animal under our care is ever euthanized.',
    'Provide a fresh start for stray and homeless animals through innovative rehoming programs.',
    'Control the population of unwanted kittens and puppies through our National Desexing Network.',
    'Expand partnerships with Councils to strengthen our Cooperative Desexing Programs.',
    'Work alongside Councils to improve animal welfare and implement our Getting to Zero model.',
    'Offer charitable assistance at our Community Vet Clinics to help families stay together with their pets.',
    'Support seniors in responsible pet ownership through our Golden Hearts™ Program.',
    'Promote positive community attitudes toward animals through educational initiatives.',
    'Advocate for humane solutions to address the welfare of un-owned cats.'
  ],
  team: {
    heading: 'Our Commitment to Change',
    description:
      'At Shelter Soul, we believe that every animal deserves a second chance at happiness. Our efforts are focused on promoting compassion, responsible pet ownership, and providing a safe haven for animals in need. Join us in making a difference, one life at a time.',
  },
  rehoming: {
    heading: 'Rehoming Program',
    paragraphs: [
      'Shelter Soul collaborates with local municipal councils and communities across Maharashtra to improve the lives of abandoned and homeless animals. Our mission is to give every animal a second chance at life, ensuring that no healthy, sociable, or treatable animal in our care is ever euthanized. As a result, we maintain one of the lowest euthanasia rates in the state for a shelter of our scale.',

      'Our Rehoming Program is among the most effective in Maharashtra, with an average of over 120 animals finding new homes each week through our Animal Rehoming Centres. Dedicated volunteers and trained animal-care staff provide personalized care, ensuring that each animal receives training, enrichment, and medical support as needed. Over the past year, we successfully rehomed 6,115 animals through adoptions and partnerships with rescue groups, while 3,791 lost pets were joyfully reunited with their families.',

      'Every animal in our care undergoes a thorough health check by our veterinary team, including desexing, vaccination, and microchipping before being placed for adoption. Animals requiring additional medical attention receive the necessary treatment before being placed in foster care until they are ready for their forever homes.',

      'At Shelter Soul, no animal is ever placed under a time limit for adoption. Once they arrive at our rehoming centre, they become part of our family until they find a loving permanent home. We take extra steps to ensure that no animal is left waiting for too long by organizing innovative adoption campaigns and promotional initiatives.',

      'Our rehoming efforts are not limited to our own facilities. We actively work with external rehoming partners and animal rescue groups throughout Maharashtra, allowing us to achieve even greater positive outcomes for the animals under our care.'
    ]
  }
};

export const footer = {
  logo: {
    brand: 'Shelter Soul',
    pic: logo,
  },
  authors:
    '© 2025 Yashodip Dharmendra Jagtap. All Rights Reserved.',
};

export const header = {
  //logo
  companyLogo: {
    pic: logo,
    name: 'Shelter Soul',
  },
  //navigation
  navigation: [
    {
      name: 'home',
      href: '/',
    },
    {
      name: 'about',
      href: '/about',
    },
    {
      name: 'contact',
      href: '/contact',
    },
  ],
  donationIcon: <BiSolidDonateHeart />,
  adopt: {
    btnTitle: 'ADOPT A PET',
    icon: <MdPets />,
  },
  userIconLoggedOut: (
    <FaUserLock
      style={{
        fontSize: '2em',
        marginRight: 5,
        color: 'A16207',
        marginTop: '0.5rem',
      }}
    />
  ),
  userIconLoggedIn: (
    <FaUserCheck
      style={{
        fontSize: '2em',
        marginRight: 5,
        color: 'A16207',
        marginTop: '0.5rem',
      }}
    />
  ),
};
export const contact = {
  title: 'CONTACT US',
  subtitle:
    'If you have any questions or concerns, please feel free to contact us. We are here to help you and your pet in any way we can. You can reach us by phone, email, or by visiting our office. Our friendly staff are always happy to help and will do their best to answer any questions you may have. We look forward to hearing from you!',
  icon: {
    mail: <FiMail />,
    phone: <FaPhoneAlt />,
    map: <FiMapPin />,
    send: <BsSendArrowUpFill />,
  },
  location: {
    title: "Our Locations",
    locations: [
      {
        location: "Head Office – Dhule, Maharashtra",
        email: "info@dhule.sheltersoul.org.in",
        number: "+91 9158XXXXXX",
        address: "123 Pet Care Street, Near City Hospital, Dhule, Maharashtra – 424001",
      },
      {
        location: "Mumbai Branch",
        email: "info@mumbai.sheltersoul.org.in",
        number: "+91 9168XXXXXX",
        address: "7 Marine Drive, South Mumbai, Maharashtra – 400001",
      },
      {
        location: "Pune Branch",
        email: "info@pune.sheltersoul.org.in",
        number: "+91 9178XXXXXX",
        address: "2 Baner Road, Shivaji Nagar, Pune, Maharashtra – 411005",
      },
    ],
  },
  successMessage:
    'Message received successfully. Thank you for reaching out to us. We will get back to you as soon as possible.',
  errorMessage: 'There was an error sending your message. Please try again.',
};

export const home = {
  hero: hero,
  plea: "More than 500 animals desperately need help at our center. You have the power to change a life. It's a gift they'll never forget",
  donation: 'Donate Now',
  donationIcon: <BiSolidDonateHeart />,
  about: [
    {
      heading: 'Our Mission',
      paragraph:
        'Shelter Soul is a non-profit organization that is dedicated to creating a brighter future for animals in need. We have been working hard to provide a safe and loving environment for animals. Our mission is to help animals find their forever homes and to provide them with the care and support they need to thrive.',
    },
    {
      heading: 'Our Vision',
      paragraph:
        'Our vision is to create a world where every animal is treated with love and respect. We believe that every animal deserves a second chance at life, and we are committed to helping them find it. We work with local shelters and rescue groups to find homes for animals in need, and we provide them with the medical care and support they need to recover and thrive.',
    },
    {
      heading: 'Our Values',
      paragraph:
        'We are committed to creating a safe and loving environment for all animals. We believe that every animal deserves to be treated with kindness and compassion. We are dedicated to providing the best possible care for the animals in our care, and we are proud to be a part of the Shelter Soul family.',
    },
  ],
  registrationHeading:
    'We are a registered charity with the Australian Charities and Not-for-profits Commission (ACNC)',
  regos: [rego1, rego2],
  featured: 'See our featured pets',
  featuredPets: {
    heading: 'Featured Pets',
    tag: 'featured',
    btn: 'VIEW ALL PETS',
    icon: <MdPets />,
  },
};

export const donation = {
  btnTitle: 'donate now',
  icon: <BiSolidDonateHeart />,
};

export const error = {
  img: dog,
  heading: 'Oops!',
  paragraphs: [
    'Sorry the page you are looking for is not available.',
    'But I am available for adoption.',
  ],
  btn: {
    text: 'Adopt Me',
    icon: <MdPets />,
  },
  logo: logo,
};