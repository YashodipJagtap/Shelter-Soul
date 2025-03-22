import { Link } from 'react-router-dom';
import { error } from '../data';

export default function ErrorPage() {
  const { logo, img, heading, paragraphs, btn } = { ...error };
  return (
    <div
      id="error-page"
      className={`lg:bg-[url('./assets/images/error/adopt-me-pet.png')]  bg-no-repeat bg-left bg-contain h-[100vh] relative bg-base-100`}
    >
      <img
        src={logo}
        alt="logo"
        className="w-[10dvw]  rounded-full absolute top-5 right-5"
      />

      <div className=" ml-[15dvw] lg:px-12">
        <h1 className="text-[18dvw] flex justify-center  ">{heading}</h1>
        <div className="flex-col ">
          {paragraphs.map((paragraph, index) => {
            return (
              <p
                key={index}
                className="flex justify-center text-4xl text-center "
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="flex justify-center mt-16 ">
          <Link to="/pets" className="btn btn-accent ">
            {btn.icon}
            {btn.text}
          </Link>
        </div>

        <img
          src={img}
          alt="dog's wallpaper"
          className=" max-h-[60dvh] lg:hidden"
        />
      </div>
    </div>
  );
}
