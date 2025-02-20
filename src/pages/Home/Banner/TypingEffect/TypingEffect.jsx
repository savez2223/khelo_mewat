import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypingEffect = () => {
  const [texts] = useTypewriter({
    words: [
      "Cricket",
      "Volley Ball",
      "Tug of war",
      "Wrestling",
      "Athletics (Race)",
    ],
    loop: {},
    typeSpeed: 300,
    delaySpeed: 80,
  });

  return (
    <div className="text-white">
      <h2 className="md:text-6xl text-4xl font-bold">Khelo Mewat</h2>
      <h4 className="md:text-4xl text-3xl my-5 font-semibold bg-red-500 md:w-4/6 w-11/12 rounded mx-auto py-2.5 px-1">
        National Programme For Development Of Sports.
      </h4>
      <div className="md:text-3xl text-2xl font-semibold">
        <span>{texts}</span>
        <Cursor cursorStyle="." cursorColor="white" />
      </div>
      <p className="my-3">
        Unlock the true potential of sports in Mewat! Khelo Mewat is dedicated
        to nurturing young talent with world-class training, infrastructure, and
        opportunities. Join us in building a strong sports culture and
        empowering athletes to achieve greatness. Your journey to excellence
        starts here!
      </p>
      <Link
        to="/aboutus"
        className="btn custom-btn bg-transparent border-2  text-white px-5  "
      >
        Learn More
      </Link>
    </div>
  );
};

export default TypingEffect;
