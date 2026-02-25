import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText, Phone, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PressPage = () => {
  const [pressItems, setPressItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPress = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, category, title, summary, created_at')
        .eq('is_published', true)
        .eq('category', '보도자료')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPressItems(data);
      }
      setLoading(false);
    };
    fetchPress();
  }, []);

  const fallbackItems = [
    {
      id: 1, category: '보도자료', created_at: '2026-01-16',
      title: '한국반려문화산업학회 창립총회 개최',
      summary: '한국반려문화산업학회(KACCI)는 2026년 1월 16일 창립총회를 개최하고 공식 출범하였습니다. 이번 창립을 통해 반려문화산업 분야의 학술 연구 활성화와 산업 발전을 선도하는 전문 학술단체로서의 역할을 시작하게 되었습니다.',
    },
  ];

  const displayItems = pressItems.length > 0 ? pressItems : (loading ? [] : fallbackItems);

  return (
    <SubpageLayout title="보도자료" subtitle="언론 보도자료" sectionPath="/news">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {displayItems.map((item) => (
            <Link
              key={item.id}
              to={`/news/press/${item.id}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                  {item.category}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(item.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.summary}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {displayItems.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">등록된 보도자료가 없습니다.</div>
          )}
        </div>
      )}

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
