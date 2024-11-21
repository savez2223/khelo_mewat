import { Link } from "react-router-dom";
import { useTypewriter,Cursor } from "react-simple-typewriter";

const TypingEffect = () => {
    const [texts] = useTypewriter({
        words:['Football','Cricket','Tennis','Badminton','Rugby','Baseball','Basketball','Swimming'],
        loop:{},
        typeSpeed:300,
        delaySpeed:80
    })
    
    return (
      <div className="text-white">
        <h2 className="md:text-6xl text-4xl font-bold">Mewat Sports Academy</h2>
        <h4 className="md:text-4xl text-3xl my-5 font-semibold bg-red-500 md:w-4/6 w-11/12 rounded mx-auto py-2.5 px-1">
          Explore the world of sports with us.
        </h4>
        <div className="md:text-3xl text-2xl font-semibold">
          <span>{texts}</span>
          <Cursor cursorStyle="." cursorColor="white" />
        </div>
        <p className="my-3">
          We offer flexible and porous educational pathways, and provide
          academic support, both of which are individually personalised to meet
          your unique needs and aspirations. Because your goals are ours too.
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