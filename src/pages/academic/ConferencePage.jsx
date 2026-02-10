import SubpageLayout from '../../components/common/SubpageLayout';
import { Calendar, MapPin, Users } from 'lucide-react';

const ConferencePage = () => {
  const events = [
    { title: '창립총회 및 기념 심포지엄', date: '2026.02.15', location: '경희대학교 네오르네상스관', status: '접수중', desc: '한국반려문화산업학회 창립총회 및 기념 학술 심포지엄' },
    { title: '제1회 정기 학술대회', date: '2026.06.20', location: '미정', status: '예정', desc: '제1회 정기 학술대회' },
  ];

  return (
    <SubpageLayout title="학술대회" subtitle="학술대회 일정 및 정보" sectionPath="/academic">
      <div className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                event.status === '접수중' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>{event.status}</span>
              <span className="text-sm text-primary font-semibold">{event.date}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{event.desc}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{event.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
};
export default ConferencePage;
