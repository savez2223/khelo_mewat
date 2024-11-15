import React, { useEffect, useState } from 'react';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';
import InstructorCard from './InstructorCard';
import Container from '../../../components/Container/Container';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getInstructor } from "../../../api/users";

const InstructorsList = () => {
  const [instructors, setInstructors] = useState([]);
  
    useEffect(() => {
      getInstructor().then((data) => {
        setInstructors(data);
      });
    }, []);
 
  /* show only 6 data first */
  const visibleInstructors = instructors.slice(0, 6);

  return (
    <div className="dark:bg-gray-800 pb-10 lg:pb-20" id="instructors">
      <Container>
        <SectionHeader heading={"Our Instructors"}></SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-3  md:gap-10 lg:gap-7 gap-y-10 gap-x-5">
          {visibleInstructors.map((instructor, index) => (
            <FadeInAnimation key={instructor.id} custom={index}>
              <InstructorCard instructor={instructor}></InstructorCard>
            </FadeInAnimation>
          ))}
        </div>
        <FadeInAnimation custom={1}>
          <div className="text-center">
              <Link to='/instructors'
                className="btn bg-amber-500 mt-8 text-white custom-btn"
              >
                See More
              </Link>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
}

export default InstructorsList;