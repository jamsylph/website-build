import Image from "next/image";

// 个人信息配置
const personalInfo = {
  name: "JamSylph",
  title: "Algorithm Engineer | Data Scientist",
  tagline: "Exploring the boundaries of data, building an intelligent future",
  location: "China · GMT+8",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-50 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAb1JREFUaEPtme0NgjAQhodBGMERGIERHMFRHMFRGMERGIERHMFRHKHvkxRQ0qO9topJ82m4tvfe1WshhLXRCeM/8ZEE9sRDei5hJE2kpAq8pVaGW+6IlLRLFbwYOGUWfSVTsKGD8W9phj0liifVCEj8ndl4KkMHU/xyV2hChUpS8RDqiQOVEIE4RCRhzeDQKcGASlkpUGUUoJrqQlFnZqeEDTUQgshxQS47VYbEITGkZhjlR5gzJEzbKZEiVoaQ2JXYoWKf/VQZLQiJx0AGMYoxk/MRmx5RMQtCYnWoVOQE6SMqpAUhcRr0CmS0TkihAiWICR2Q51gZgsYmJAaEIHKCkLG2zWh8WolSCQQhsYdVzRMCOtVnQUjsYUUIiZ0aFKkEQgKJQRAyNoHcoaIgYCLUySr3ME+c8xbpUlEQZDlBSIziGU/mEz8DKtRkZRAViQmY05UbcxaU3N57XrQKgDQhcZvvOxEHKsQGJDGWd6QiJJ6YnNxNRJxKxIb6ERYpxhJGdZaQMeY58WNyJcYQhLp1cyWUuBmJJWyJGzMlNohTCQ3ilEgjTtGPDkzoDklI8pMR4g3H0NR7T+aFyQAAAABJRU5ErkJggg==')]"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-10"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center">
        <div className="absolute top-28 left-[5%] flex items-center gap-2 text-sm text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{personalInfo.location}</span>
        </div>
        
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#ff2a6d] relative">
              {personalInfo.name}
              <span className="absolute left-0 top-0 text-[#ff00ff] left-[2px] opacity-70 animate-pulse">{personalInfo.name}</span>
              <span className="absolute left-0 top-0 text-[#01c8ee] left-[-2px] opacity-70 animate-pulse">{personalInfo.name}</span>
            </h1>
            <h2 className="text-[#05d9e8] text-xl md:text-2xl mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mb-8">
              {personalInfo.tagline}
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#about" className="inline-block px-6 py-3 bg-[#ff2a6d] text-white font-medium rounded-md shadow-[0_0_15px_rgba(255,42,109,0.5)] transition-all hover:bg-transparent hover:shadow-[0_0_20px_rgba(255,42,109,0.7)]">Learn More</a>
              <a href="#contact" className="inline-block px-6 py-3 border-2 border-[#05d9e8] text-[#05d9e8] font-medium rounded-md transition-all hover:bg-[#05d9e8] hover:text-black hover:shadow-[0_0_15px_rgba(5,217,232,0.7)]">Contact Me</a>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 border-2 border-dashed border-[#05d9e8] rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-[#ff2a6d] shadow-[0_0_20px_rgba(255,42,109,0.7)]">
                <Image
                  src="https://avatars.githubusercontent.com/u/jamsylph"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
