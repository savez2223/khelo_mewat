// import React from "react";
// import Container from "../../components/Container/Container";
// import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
// import SectionHeader from "../../components/SectionHeader/SectionHeader";
// import { useQuery } from "react-query";
// import axios from "axios";
// import EmptyData from "../../components/EmptyData/EmptyData";
// import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
// // import CourseCard from "../Home/Courses/CourseCard";
// import Loader from "../../components/Loader/Loader"; // Import your loader component
// import { Helmet } from "react-helmet-async";

// const CoursesPage = () => {
//   /* get all course data */
//   const {
//     data: courses = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryFn: async () => {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
//       console.log(res.data);
//       return res.data;
//     },
//   });

//   return (
//     <div className="dark:bg-gray-800 pb-10 lg:pb-20 md:pt-20" id="courses">
//       <Helmet>
//         <title>Course</title>
//       </Helmet>
//       <ScrollPageTop />
//       <Container>
//         <SectionHeader heading={"Our Courses"}></SectionHeader>
//         {isLoading ? (
//           // Show loader while data is loading
//           <Loader height={"h-[50vh]"} />
//         ) : (
//           <>
//             {courses && Array.isArray(courses) && courses.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-3  md:gap-10 lg:gap-7 gap-5 ">
//                 {courses.map((course, index) => (
//                   <FadeInAnimation custom={index} key={course.id}>
//                     <CourseCard course={course}></CourseCard>
//                   </FadeInAnimation>
//                 ))}
//               </div>
//             ) : (
//               <EmptyData message={"No Course Data Found"} />
//             )}
//           </>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default CoursesPage;
