function Projects() {
  return (
    <section className="py-16">
      <div className="container text-center">
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Project 1</h3>
            <p className="text-gray-600">A cool project description goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Project 2</h3>
            <p className="text-gray-600">Another awesome project description.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Projects;