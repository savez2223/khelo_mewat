import axios from "axios";
import { useQuery } from "react-query";
import Container from "../../../components/Container/Container";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

const Courses = () => {
  /* get all course data */
  const { data: courses = [], refetch } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback to sample courses in case of an error
        return [
          {
            id: 1,
            course_name: "Football",
            description:
              "Master the art of football with our comprehensive courses.",
            image: "https://i.ibb.co/3MFF6hk/football-5754946-1280.jpg",
          },
          {
            id: 2,
            course_name: "Tennis",
            description:
              "Learn tennis techniques and strategies for all levels.",
            image: "https://i.ibb.co/zPRD7cj/tennis-5782695-1280.jpg",
          },
          {
            id: 3,
            course_name: "Cricket",
            description: "Enhance your cricket skills with expert coaching.",
            image: "https://i.ibb.co/n1Bvng0/cricket-724621-1280.jpg",
          },
          {
            id: 4,
            course_name: "Rugby",
            description:
              "Experience the thrill of rugby with our specialized training.",
            image:
              "https://pixabay.com/photos/runner-track-athlete-relay-race-1544448/",
          },
          {
            id: 5,
            course_name: "Swimming",
            description:
              "Develop swimming skills with professional instructors.",
            image: "https://i.ibb.co/bmJZddy/swimming-821622-1280.jpg",
          },
        ];
      }
    },
  });

  /* Show only 6 data first */
  const visibleCourses = courses.slice(0, 5);

  return (
    <div className="dark:bg-gray-800 pb:10 md:pb-20" id="programmes">
      <Container>
        <SectionHeader heading={"Our Sports Courses"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleCourses.map((course, index) => (
            <FadeInAnimation custom={index} key={course.id}>
              <CourseCard course={course}></CourseCard>
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

export default Courses;
