import React from 'react';
import { ArrowRight, Users, BookOpen, Globe, Heart } from 'lucide-react';

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

          {/* Right Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-2" />
                  <span className="text-sm font-semibold text-primary">공존</span>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
                <div className="text-center">
                  <Users className="w-8 h-8 text-secondary mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-600">연결</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float animation-delay-200">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-600">연구</span>
                </div>
              </div>

              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float animation-delay-300">
                <div className="text-center">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-600">소통</span>
                </div>
              </div>

              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float animation-delay-400">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-secondary mx-auto mb-1" />
                  <span className="text-xs font-medium text-gray-600">포용</span>
                </div>
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="150" fill="none" stroke="#D98BA3" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
              </svg>
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
