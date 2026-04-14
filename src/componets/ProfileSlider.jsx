import React, { useState, useEffect } from 'react';

const ProfileSlider = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const profileSlides = [
    {
      title: "About Me",
      icon: "👤",
      content: user.bio || "Creative professional passionate about building amazing digital experiences.",
      stats: [
        { label: "Years Exp", value: user.experience || 5 },
        { label: "Projects", value: user.projects || 42 },
        { label: "Rating", value: user.rating || 4.9 }
      ]
    },
    {
      title: "Skills & Expertise",
      icon: "💼",
      content: user.skills || "React, Next.js, Tailwind, Node.js, Figma, Animation",
      stats: [
        { label: "Clients", value: user.clients || 28 },
        { label: "Success Rate", value: `${user.successRate || 98}%` },
        { label: "Response Time", value: "24h" }
      ]
    },
    {
      title: "Achievements",
      icon: "🏆",
      content: user.achievements || "Top 1% Freelancer • 500+ Happy Clients • Clutch Award Winner",
      stats: [
        { label: "Followers", value: user.followers || "2.4K" },
        { label: "Reviews", value: user.reviews || 156 },
        { label: "Level", value: "Elite" }
      ]
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % profileSlides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, profileSlides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const togglePause = () => setIsPaused(!isPaused);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-28 h-28 mx-auto mb-6 relative">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-3xl p-2 shadow-2xl">
            <img 
              src={user.avatar || "https://ui-avatars.com/api/?name=Alex+Rivera&background=6366f1&color=fff&size=200&bold=true&font-size=0.6"}
              alt={user.name}
              className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-slate-900"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg text-yellow-400 text-xl font-bold">
            ★
          </div>
        </div>
        
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          {user.name || "Alex Rivera"}
        </h2>
        <p className="text-xl text-slate-400 font-medium">{user.role || "Full Stack Developer"}</p>
      </div>

      {/* Slider Container */}
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-1 shadow-2xl border border-slate-700/50 backdrop-blur-xl">
        <div className="bg-gradient-to-b from-slate-900/80 to-slate-900/90 rounded-3xl p-10 h-[420px] overflow-hidden relative">
          <div 
            className="flex h-full transition-transform duration-[1200ms] ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {profileSlides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 flex items-center justify-center p-8">
                <div className="text-center max-w-md mx-auto">
                  {/* Slide Icon */}
                  <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-slate-700/50 shadow-xl hover:scale-110 transition-all duration-500 text-4xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl text-3xl">
                      {slide.icon}
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                    {slide.title}
                  </h3>

                  <p className="text-xl text-slate-300 leading-relaxed mb-10 px-6 py-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
                    {slide.content}
                  </p>

                  <div className="grid grid-cols-3 gap-6">
                    {slide.stats.map((stat, sIndex) => (
                      <div key={sIndex} className="group">
                        <div className="text-3xl font-bold bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.value}
                        </div>
                        <div className="text-slate-500 text-sm font-medium uppercase tracking-wider group-hover:text-slate-400 transition-colors">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-3 mt-10">
        {profileSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 shadow-lg ${
              index === currentSlide
                ? 'w-12 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 scale-110'
                : 'bg-slate-600 hover:bg-slate-500 hover:scale-125'
            }`}
          />
        ))}
      </div>

      {/* Play/Pause */}
      <div className="flex justify-center mt-8">
        <button
          onClick={togglePause}
          className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 hover:from-slate-700/70 hover:to-slate-800/70 backdrop-blur-xl text-slate-300 font-semibold rounded-2xl border border-slate-700/50 hover:border-slate-600/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
        >
          {isPaused ? (
            <>
              <span className="text-xl">▶</span>
              <span>Play</span>
            </>
          ) : (
            <>
              <span className="text-xl">⏸</span>
              <span>Pause</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ✅ ZERO DEPENDENCIES - Works immediately!
export default ProfileSlider;