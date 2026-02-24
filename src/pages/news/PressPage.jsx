import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText, Phone, Mail } from 'lucide-react';

const PressPage = () => {
  const pressItems = [
    {
      id: 1,
      category: '학회 보도자료',
      date: '2026.01.16',
      title: '한국반려문화산업학회 창립총회 개최',
      summary:
        '한국반려문화산업학회(KACCI)는 2026년 1월 16일 창립총회를 개최하고 공식 출범하였습니다. 이번 창립을 통해 반려문화산업 분야의 학술 연구 활성화와 산업 발전을 선도하는 전문 학술단체로서의 역할을 시작하게 되었습니다.',
    },
  ];

  return (
    <SubpageLayout title="보도자료" subtitle="언론 보도자료" sectionPath="/news">
      <div className="space-y-4">
        {pressItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                {item.category}
              </span>
              <span className="text-sm text-gray-400">{item.date}</span>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4">언론 문의</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">
              이메일:{' '}
              <a href="mailto:contact@kacci.or.kr" className="text-primary underline underline-offset-2">
                contact@kacci.or.kr
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">
              전화:{' '}
              <a href="tel:0296100481" className="text-primary underline underline-offset-2">
                02-961-0481
              </a>
            </span>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default PressPage;
