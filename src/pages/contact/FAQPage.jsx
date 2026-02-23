import SubpageLayout from '../../components/common/SubpageLayout';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: '회원가입은 어떻게 하나요?', a: '학회 홈페이지의 회원가입 안내 페이지에서 자격요건을 확인하신 후, 가입신청서를 contact@kacci.or.kr로 보내주시면 됩니다. 이사회 심사 후 승인 여부를 안내드립니다.' },
    { q: '회비 납부 방법은 무엇인가요?', a: '현재 계좌이체를 통한 납부가 가능합니다. 납부 후 사무국(contact@kacci.or.kr)으로 납부 확인을 요청해 주세요.' },
    { q: '학술대회에 참가하려면 어떻게 해야 하나요?', a: '학술대회 일정은 공지사항을 통해 안내됩니다. 회원은 할인된 등록비로 참가하실 수 있으며, 비회원도 일반 등록비로 참가 가능합니다.' },
    { q: '논문 투고는 어떻게 하나요?', a: '학회지 투고안내 페이지에서 투고 규정과 절차를 확인하실 수 있습니다. 학회지 창간호 투고 일정은 공지사항을 참고해 주세요.' },
    { q: '학회 사무실 방문이 가능한가요?', a: '평일 09:00~18:00 사이에 방문 가능합니다. 사전에 전화(02-961-0481)나 이메일로 방문 일정을 잡아주시면 더욱 원활한 상담이 가능합니다.' },
    { q: '비회원도 학회 행사에 참여할 수 있나요?', a: '네, 학술대회 및 공개 세미나는 비회원도 참가하실 수 있습니다. 다만 회원 할인 혜택은 적용되지 않습니다.' },
  ];

  return (
    <SubpageLayout title="FAQ" subtitle="자주 묻는 질문" sectionPath="/contact">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {faqs.map((faq, index) => (
          <div key={index} className={index !== faqs.length - 1 ? 'border-b border-gray-100' : ''}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">
                <span className="text-primary font-bold mr-2">Q.</span>
                {faq.q}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`} />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5">
                <div className="bg-gray-50 rounded-xl p-4">
                  <span className="text-secondary-dark font-bold mr-2">A.</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{faq.a}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
};

export default FAQPage;
