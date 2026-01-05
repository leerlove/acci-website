import { ArrowRight, BookOpen, Globe, Heart, Sparkles, Zap, Network } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/10 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary">2026년 1월 출범</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-gradient">평화적 공존</span>의 시대,
              <br />
              함께 사는 내일을 연구합니다
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              반려동물, 반려식물, 반려로봇과 인간이 조화롭게 공존하는
              새로운 반려문화 패러다임을 제시합니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#about" className="btn-primary gap-2 group">
                학회 소개
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#membership" className="btn-secondary">
                회원가입 안내
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary">4대</div>
                  <div className="text-sm text-gray-500 mt-1">핵심 가치</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary">8개</div>
                  <div className="text-sm text-gray-500 mt-1">주요 사업</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary">5개</div>
                  <div className="text-sm text-gray-500 mt-1">위원회</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual - Futuristic Design */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-xl mx-auto">

              {/* Animated Background Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[500px] h-[500px] border border-primary/10 rounded-full animate-[spin_30s_linear_infinite]" />
                <div className="absolute w-[400px] h-[400px] border border-secondary/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute w-[300px] h-[300px] border border-primary/15 rounded-full animate-[spin_20s_linear_infinite]" />
              </div>

              {/* Glowing Particles */}
              <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_20px_rgba(217,139,163,0.8)]" />
              <div className="absolute top-[25%] right-[15%] w-3 h-3 bg-primary/60 rounded-full animate-pulse shadow-[0_0_25px_rgba(107,45,74,0.6)]" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(242,196,208,0.9)]" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_12px_rgba(217,139,163,0.7)]" style={{ animationDelay: '1.5s' }} />

              {/* Central Hexagon Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Outer Glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 rounded-full blur-2xl animate-pulse" />

                {/* Main Core */}
                <div className="relative w-40 h-40 bg-gradient-to-br from-white via-white to-primary-50 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-45 border border-white/50">
                  <div className="transform -rotate-45 text-center">
                    <div className="relative">
                      <Heart className="w-14 h-14 text-primary mx-auto mb-2" />
                      <Sparkles className="w-5 h-5 text-secondary absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">공존</span>
                    <p className="text-[10px] text-gray-400 mt-1">COEXISTENCE</p>
                  </div>
                </div>
              </div>

              {/* Floating Value Cards - Futuristic Style */}
              {/* Top - 연결 */}
              <div className="absolute top-[5%] left-1/2 -translate-x-1/2 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="relative w-28 h-28 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/50 hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl flex items-center justify-center">
                        <Network className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="text-sm font-bold text-gray-800">연결</span>
                      <p className="text-[9px] text-gray-400 mt-0.5">CONNECTION</p>
                    </div>
                  </div>
                </div>
                {/* Connection Line */}
                <div className="absolute top-full left-1/2 w-px h-16 bg-gradient-to-b from-secondary/50 to-transparent" />
              </div>

              {/* Bottom - 연구 */}
              <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="relative w-28 h-28 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/50 hover:scale-110 hover:translate-y-2 transition-all duration-500 cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-gray-800">연구</span>
                      <p className="text-[9px] text-gray-400 mt-0.5">RESEARCH</p>
                    </div>
                  </div>
                </div>
                {/* Connection Line */}
                <div className="absolute bottom-full left-1/2 w-px h-16 bg-gradient-to-t from-primary/50 to-transparent" />
              </div>

              {/* Left - 소통 */}
              <div className="absolute top-1/2 left-[5%] -translate-y-1/2 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="relative w-28 h-28 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/50 hover:scale-110 hover:-translate-x-2 transition-all duration-500 cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-primary/15 to-accent/30 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-gray-800">소통</span>
                      <p className="text-[9px] text-gray-400 mt-0.5">COMMUNICATION</p>
                    </div>
                  </div>
                </div>
                {/* Connection Line */}
                <div className="absolute left-full top-1/2 w-16 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Right - 포용 */}
              <div className="absolute top-1/2 right-[5%] -translate-y-1/2 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity" />
                  <div className="relative w-28 h-28 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/50 hover:scale-110 hover:translate-x-2 transition-all duration-500 cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-secondary/20 to-accent/30 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="text-sm font-bold text-gray-800">포용</span>
                      <p className="text-[9px] text-gray-400 mt-0.5">INCLUSION</p>
                    </div>
                  </div>
                </div>
                {/* Connection Line */}
                <div className="absolute right-full top-1/2 w-16 h-px bg-gradient-to-l from-secondary/50 to-transparent" />
              </div>

              {/* Data Flow Lines - Animated */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6B2D4A" stopOpacity="0" />
                    <stop offset="50%" stopColor="#D98BA3" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#6B2D4A" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Animated flowing dots on paths */}
                <circle r="3" fill="#D98BA3" filter="url(#glow)">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href="#topPath" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#6B2D4A" filter="url(#glow)">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
                    <mpath href="#bottomPath" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#D98BA3" filter="url(#glow)">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="2s">
                    <mpath href="#leftPath" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#6B2D4A" filter="url(#glow)">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="3s">
                    <mpath href="#rightPath" />
                  </animateMotion>
                </circle>

                {/* Hidden paths for animation */}
                <path id="topPath" d="M250,80 Q250,180 250,200" fill="none" stroke="none" />
                <path id="bottomPath" d="M250,420 Q250,320 250,300" fill="none" stroke="none" />
                <path id="leftPath" d="M80,250 Q180,250 200,250" fill="none" stroke="none" />
                <path id="rightPath" d="M420,250 Q320,250 300,250" fill="none" stroke="none" />
              </svg>

              {/* Floating Tech Elements */}
              <div className="absolute top-[35%] left-[25%] animate-float">
                <Zap className="w-4 h-4 text-secondary/40" />
              </div>
              <div className="absolute bottom-[35%] right-[25%] animate-float" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-4 h-4 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
