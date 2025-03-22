import TeamCard from './TeamCard';

const Team = ({ photo, members, heading, description }) => {
  return (
    <div>
      <h3 className="mb-3 mt-8 text-2xl">{heading}</h3>
      <div className="flex justify-between gap-4 text-yellow-800">
       
      </div>
      <p className="my-4">{description}</p>
      
    </div>
  );
};

export default Team;
