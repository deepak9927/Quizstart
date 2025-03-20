import React from "react";
import p1 from "../assets/p1.png";
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.png';
import p5 from '../assets/p5.jpg'
import p6 from '../assets/p6.png'
import p7 from '../assets/p7.png'
import p8 from '../assets/p8.png'
import p9 from '../assets/p9.png'
import { FaGithub, FaYoutube } from "react-icons/fa";

export const Portfolio = () => {
  const projects = [
    {
      id: 1,
      image: p1,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 2,
      image: p2,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 3,
      image: p3,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 4,
      image: p4,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 5,
      image: p5,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 6,
      image: p6,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 7,
      image: p7,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 8,
      image: p8,
      github: "https://github.com",
      demo: "https://youtube.com",
    },

    {
      id: 9,
      image: p9,
      github: "https://github.com",
      demo: "https://youtube.com",
    },
  ];

  return (
    <div
      name="portfolio"
      className="w-full md:min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
    >
      <div className="max-w-screen-lg p-4 h-full w-full mx-auto text-white flex flex-col justify-center items-center md:items-start">
        <div className="pb-8">
          <h2 className="text-4xl sm:text-5xl font-bold inline border-b-4 border-gray-500">
            Portfolio
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0">
          {projects.map(({ id, image, title, github, demo }) => (
            <div key={id} className="shadow-md shadow-gray-600 rounded-lg">
              <img src={image}></img>
              <div className="flex items-center justify-evenly p-2">
                <a href={github} className="hover:scale-110 duration-200"><FaGithub size={30}></FaGithub></a>
                <a href={demo}  className="hover:scale-110 duration-200"> <FaYoutube size={30}></FaYoutube> </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
