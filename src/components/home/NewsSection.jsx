import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Bell, Newspaper, FileText } from 'lucide-react';

const NewsSection = () => {
  const notices = [
    {
      id: 1,
      category: '공지',
      title: '한국반려문화산업학회 창립총회 개최 안내',
      date: '2026.01.15',
      isNew: true,
    },
    {
      id: 2,
      category: '공지',
      title: '창립회원 모집 안내 (~ 2026.02.28)',
      date: '2026.01.10',
      isNew: true,
    },
    {
      id: 3,
      category: '학술',
      title: '2026년 상반기 학술대회 일정 공고',
      date: '2026.01.08',
      isNew: false,
    },
    {
      id: 4,
      category: '공지',
      title: '학회지 창간호 논문 투고 안내',
      date: '2026.01.05',
      isNew: false,
    },
    {
      id: 5,
      category: '소식',
      title: '학회 사무국 운영 안내',
      date: '2026.01.02',
      isNew: false,
    },
  ];

  const events = [
    {
      id: 1,
      title: '창립총회 및 기념 심포지엄',
      date: '2026.02.15',
      location: '경희대학교',
      status: '접수중',
    },
    {
      id: 2,
      title: '제1회 정기 학술대회',
      date: '2026.06.20',
      location: '미정',
      status: '예정',
    },
  ];

  return (
    <section id="news" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary text-sm font-semibold rounded-full mb-4">
            소식
          </span>
          <h2 className="section-title">
            학회 <span className="text-gradient">최신 소식</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notices */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">공지사항</h3>
              </div>
              <Link to="/news/notice" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
                더보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              {notices.map((notice, index) => (
                <Link
                  key={notice.id}
                  to="/news/notice"
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-primary-50/50 transition-colors ${
                    index !== notices.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    notice.category === '공지' ? 'bg-primary-100 text-primary' :
                    notice.category === '학술' ? 'bg-secondary/20 text-secondary-dark' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {notice.category}
                  </span>
                  <span className="flex-1 text-gray-800 font-medium truncate">
                    {notice.title}
                    {notice.isNew && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded">N</span>
                    )}
                  </span>
                  <span className="text-sm text-gray-400 hidden sm:block">{notice.date}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-gray-900">학술 행사</h3>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gradient-soft rounded-2xl p-5 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      event.status === '접수중' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-sm text-primary font-semibold">{event.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
              ))}

              <Link
                to="/academic/conference"
                className="block text-center py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                전체 일정 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          <Link to="/news/notice" className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:bg-primary transition-colors">
              <Bell className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">공지사항</h4>
              <p className="text-sm text-gray-500">학회 주요 공지</p>
            </div>
          </Link>
          <Link to="/news/updates" className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:bg-primary transition-colors">
              <Newspaper className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">학회소식</h4>
              <p className="text-sm text-gray-500">활동 및 소식</p>
            </div>
          </Link>
          <Link to="/news/press" className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:bg-primary transition-colors">
              <FileText className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">보도자료</h4>
              <p className="text-sm text-gray-500">언론 보도</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
