import React from 'react';
import { ArrowRight, Users, BookOpen, Award, Calendar } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: '학술자료 열람',
      description: '학회지 및 연구자료 무료 이용',
    },
    {
      icon: Calendar,
      title: '학술대회 참가',
      description: '정기 학술대회 할인 등록',
    },
    {
      icon: Users,
      title: '네트워크 구축',
      description: '전문가 네트워크 참여 기회',
    },
    {
      icon: Award,
      title: '연구 지원',
      description: '공동연구 및 발표 기회 제공',
    },
  ];

  return (
    <section className="section-padding bg-gradient-primary relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
              회원가입
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              함께 사는 내일을<br />
              연구하는 학회에<br />
              <span className="text-secondary-light">참여하세요</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              한국반려문화산업학회는 반려문화와 산업의 발전을 위해
              연구하는 전문가들의 학술 커뮤니티입니다.
              창립회원으로 참여하시면 학회 발전에 기여하실 수 있습니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#join"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                창립회원 가입하기
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#benefits"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                회원혜택 보기
              </a>
            </div>

            {/* Membership Info */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm mb-2">창립회원 모집 기간</p>
              <p className="text-white font-semibold">2026년 1월 1일 ~ 2026년 2월 28일</p>
            </div>
          </div>

          {/* Right Content - Benefits */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Types Summary */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
            <p className="text-white/60 text-sm mb-1">정회원 (개인)</p>
            <p className="text-white text-2xl font-bold">연 5만원</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
            <p className="text-white/60 text-sm mb-1">정회원 (기관)</p>
            <p className="text-white text-2xl font-bold">연 10만원</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
            <p className="text-white/60 text-sm mb-1">평생회원 (개인)</p>
            <p className="text-white text-2xl font-bold">50만원</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
            <p className="text-white/60 text-sm mb-1">평생회원 (기관)</p>
            <p className="text-white text-2xl font-bold">100만원</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
