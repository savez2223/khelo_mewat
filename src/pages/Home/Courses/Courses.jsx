import React from "react";
import { Link } from "react-router-dom";
import Container from "../../../components/Container/Container";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import cricket from "../../../assets/banner images/cricket.jpg";
import vollyball from "../../../assets/banner images/volleyball.jpg";
import Tugofwars from "../../../assets/banner images/Tugofwars.jpg";
import runner from "../../../assets/banner images/runner.jpg";
import Wrestling from "../../../assets/banner images/wrestling.jpg";

const Courses = () => {
  /* Sample course data */
  const courses = [
    {
      id: 1,
      course_name: "Cricket",
      description: "Master the art of cricket with our comprehensive courses.",
      image: cricket,
      seats: 10,
      enrolled: 5,
    },
    {
      id: 2,
      course_name: "Volley Ball",
      description: "Learn volleyball techniques and strategies for all levels.",
      image: vollyball,
      seats: 15,
      enrolled: 10,
    },
    {
      id: 3,
      course_name: "Tug of War",
      description: "Enhance your teamwork and strength with expert coaching.",
      image: Tugofwars,
      seats: 8,
      enrolled: 8,
    },
    {
      id: 4,
      course_name: "Wrestling",
      description:
        "Experience the thrill of wrestling with specialized training.",
      image: Wrestling,
      seats: 12,
      enrolled: 6,
    },
    {
      id: 5,
      course_name: "Athletics (Race)",
      description:
        "Improve your speed and endurance with professional training.",
      image: runner,
      seats: 20,
      enrolled: 18,
    },
  ];

  /* Show only 5 data first */
  const visibleCourses = courses.slice(0, 5);

  return (
    <div className="dark:bg-gray-800 pb:10 md:pb-20" id="programmes">
      <Container>
        <SectionHeader heading={"Games"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleCourses.map((course, index) => (
            <FadeInAnimation custom={index} key={course.id}>
              <CourseCard course={course} />
            </FadeInAnimation>
          ))}
        </div>
        <FadeInAnimation custom={1}>
          <div className="text-center pb-10 md:pb-0">
            <Link
              to="/"
              className="btn bg-amber-500 custom-btn mt-8 text-white"
            >
              See More
            </Link>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const { id, course_name, image, seats, enrolled } = course;
  return (
    <Link to={`/`}>
      <div className="relative max-w-96 h-96 bg-cover bg-center bg-no-repeat hover:shadow-xl transition-transform transform hover:bg-black hover:bg-opacity-70 group rounded-xl">
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div
          className={`absolute inset-0 flex flex-col justify-end p-4 ${
            seats - enrolled <= 0
              ? "group-hover:bg-gradient-to-t from-red-500 to-transparent"
              : "group-hover:bg-gradient-to-t from-black to-transparent"
          } transition-transform group-hover:opacity-100 rounded-xl`}
        >
          <h2 className="card_effect text-white text-2xl md:text-3xl font-bold translate-y-2 group-hover:-translate-y-4">
            {course_name}
          </h2>
          <Link
            to={`/course/details/${id}`}
            className="card_effect text-white hover:text-amber-500 font-semibold mt-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4"
          >
            Fill Form
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default Courses;
