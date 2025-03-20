
export default About;
import React from "react";

function About () {
  return (
    <div
      
      className="w-full h-screen  md:min-h-screen  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
    >
      <div className="max-w-screen-lg p-4 h-full w-full mx-auto flex flex-col justify-center items-center text-white md:items-start">
        <div className="py-6 sm:text-center">
          <h2 className="text-4xl sm:text-5xl font-bold inline border-b-4 border-gray-500 ">
            About Me
          </h2>
        </div>

        <p className="text-xl sm:text-2xl mt-4">
          I'm Mishu Dhar Chando, a dedicated educator and technology enthusiast
          passionate about sharing my knowledge of Machine Learning, Deep
          Learning, and Natural Language Processing. As the CEO of Knowledge
          Doctor, I've created a platform where learners can explore these
          complex topics in a fun and accessible way. With a strong foundation
          in computer science from the University of Science and Technology,
          Chittagong, Bangladesh, I've been dedicated to bridging the gap
          between theory and practical application. My goal is to empower
          individuals to harness the potential of AI and data science to solve
          real-world problems. Join me on this exciting journey as we explore
          the fascinating world of AI together.
        </p>
      </div>
    </div>
  );
};
