export default function About() {
    return (
      <div className="p-6 max-w-5xl mx-auto pt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">About the Project</h2>
  
        <section className="mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            This project is a fun and interactive way to explore the wonders of the universe. 
            Using NASA's API, users can discover celestial bodies, stars, planets, and even space missions 
            by navigating through categories. Each category reveals fascinating information and imagery, 
            bringing the cosmos closer to you.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            The goal of this project is to make learning about space accessible and visually engaging, 
            combining modern web development practices with a passion for science and discovery.
          </p>
        </section>
  
        <h3 className="text-2xl font-bold mb-4 text-gray-900">About Me</h3>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
            
            <img
              src="./me.png"
              alt="Your profile"
              className="w-full h-full object-cover"
              width={40}
            />
          </div>
          <div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Need to work on this section... 
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              maybe two paragraphs are good enough
            </p>
          </div>
        </div>
      </div>
    );
  }
  