import React, { useState } from 'react';

function Cursos() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Web Development',
      description: 'Learn to build web applications using modern technologies.',
      price: 199.99,
      contact: 'contact@webdev.com',
      image: 'https://placeimg.com/640/480/tech/1',
    },
    {
      id: 2,
      name: 'Data Science',
      description: 'Learn to analyze and visualize data using Python and R.',
      price: 249.99,
      contact: 'contact@datascience.com',
      image: 'https://placeimg.com/640/480/tech/2',
    },
    {
      id: 3,
      name: 'Mobile App Development',
      description: 'Learn to build native mobile apps for iOS and Android.',
      price: 299.99,
      contact: 'contact@mobiledev.com',
      image: 'https://placeimg.com/640/480/tech/3',
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className='contenedor'>
      <h1 className='h1'>Cursos</h1>
      <div className='courses'>
        {courses.map((course) => (
          <div key={course.id} className='course' onClick={() => handleCourseClick(course)}>
            <h2>{course.name}</h2>
            <img className='course-image' src={course.image} alt={course.name} />
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h2>{selectedCourse.name}</h2>
            <p>{selectedCourse.description}</p>
            <p>Price: {selectedCourse.price}</p>
            <p>Contact: {selectedCourse.contact}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cursos;

