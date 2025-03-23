# Shelter Soul: Animal Shelter Management System

## Table of Contents
1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Key Features](#key-features)
5. [Technologies Used](#technologies-used)
6. [Impact](#impact)
7. [Installation](#installation)
8. [Usage](#usage)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction
**Shelter Soul** is a web-based platform designed to streamline the operations of animal shelters and rescue organizations. It provides a centralized system for managing adoptions, donations, volunteer coordination, and animal welfare tracking. The platform also serves as a public-facing tool to raise awareness and engage the community in animal welfare initiatives.

## Problem Statement
Animal shelters and rescue organizations face several challenges in managing their operations effectively, including:
- **Inefficient Adoption Processes**: Manual tracking of animals, their medical history, and adoption status leads to delays and errors.
- **Donation Management Issues**: Lack of transparency and difficulty in tracking donations and their utilization.
- **Poor Volunteer Coordination**: Difficulty in managing volunteers, assigning tasks, and tracking progress.
- **Animal Welfare Tracking**: Challenges in maintaining comprehensive medical records and ensuring timely care for animals.
- **Limited Public Engagement**: Lack of a centralized platform to raise awareness and engage the community in animal welfare initiatives.

## Solution
**Shelter Soul** addresses these challenges by providing a centralized platform that streamlines adoption processes, donation management, volunteer coordination, and animal welfare tracking. The platform also enhances public engagement through educational resources, community events, and social media integration.

## Key Features
- **Adoption Management**: Streamlined online adoption applications, detailed animal profiles, and search/filter functionality.
- **Donation Management**: Secure online donations, transparency in donation utilization, and automated thank-you messages.
- **Volunteer and Staff Coordination**: Easy volunteer registration, task management, and internal communication tools.
- **Animal Health and Welfare Tracking**: Comprehensive medical records, automated reminders, and integration with veterinary services.
- **Public Awareness and Engagement**: Educational resources, community events, and social media integration.

## Technologies Used
### Frontend
- **React.js**: For building a dynamic and responsive user interface.
- **React Router DOM**: For client-side routing and navigation.
- **Framer Motion**: For smooth animations and transitions.
- **Flowbite & Flowbite-React**: For pre-designed UI components and responsive design.
- **FontAwesome & Phosphor Icons**: For scalable vector icons.
- **Stripe.js**: For secure payment processing and donation management.
- **Apollo Client**: For managing GraphQL queries and state management.

### Backend
- **Express.js**: A Node.js framework for building the backend server.
- **MongoDB**: A NoSQL database for storing data related to animals, adoptions, donations, and users.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **GraphQL**: For efficient data querying and manipulation.
- **Apollo Server**: For implementing the GraphQL API.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
- **Bcrypt**: For password hashing and secure storage.
- **Stripe**: For handling payment processing and donations.

### Other Tools
- **Dotenv**: For managing environment variables.
- **CORS**: For enabling cross-origin resource sharing.
- **EmailJS**: For sending automated emails (e.g., donation confirmations, adoption updates).
- **Vitest**: For testing the application.
- **Happy DOM**: For simulating the browser environment during testing.

## Impact
### For Animal Shelters
- **Increased Adoption Rates**: Streamlined adoption processes lead to faster adoptions and reduced time animals spend in shelters.
- **Improved Donor Trust**: Transparent donation tracking and automated thank-you messages enhance donor satisfaction.
- **Better Volunteer Coordination**: Task assignment and progress tracking improve efficiency and collaboration among volunteers and staff.
- **Enhanced Animal Welfare**: Comprehensive medical records and reminders ensure timely care for animals.

### For the Community
- **Increased Awareness**: Educational resources and community events raise awareness about animal welfare.
- **Greater Engagement**: Social media integration and adoption campaigns encourage more people to get involved.
- **Support for Families**: Charitable assistance programs help families stay together with their pets.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YashodipJagtap/Shelter-Soul.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shelter-soul
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add the necessary variables (e.g., MongoDB URI, Stripe API keys).
   - Create a `.env` file in the `frontend` directory and add the necessary variables (e.g., API endpoint).

5. Start the development servers:
   - For the backend and frontend:
     ```bash
     npm run dev
     ```

## Usage
1. **Adoption Management**: Use the platform to manage animal profiles, track adoption applications, and streamline the adoption process.
2. **Donation Management**: Accept and track donations securely through the integrated Stripe payment system.
3. **Volunteer Coordination**: Register volunteers, assign tasks, and track progress using the task management tools.
4. **Animal Welfare Tracking**: Maintain comprehensive medical records and set up automated reminders for vaccinations and treatments.
5. **Public Engagement**: Use the platform to organize community events, share educational resources, and engage with the community on social media.

## Contributing
We welcome contributions to Shelter Soul! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.