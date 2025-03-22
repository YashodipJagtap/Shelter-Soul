const Rehoming = ({ heading, paragraphs }) => {
  return (
    <div>
      <h3 className="mb-3 mt-8  text-2xl">{heading}</h3>
      {paragraphs.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>;
      })}
    </div>
  );
};

export default Rehoming;
