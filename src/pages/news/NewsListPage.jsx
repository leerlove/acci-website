import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/common/SubpageLayout';
import { Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const NewsListPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, category, title, summary, created_at')
        .eq('is_published', true)
        .eq('category', '학회소식')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setNewsItems(data);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  const fallbackItems = [
    {
      id: 1, category: '학회소식', created_at: '2026-01-16',
      title: '한국반려문화산업학회 창립, 반려문화산업의 새 장을 열다',
      summary: '한국반려문화산업학회(KACCI)가 2026년 1월 16일 창립총회를 개최하고 공식 출범하였습니다. 반려문화산업의 학술적 연구와 산업 발전을 선도하는 학술단체로서 새로운 여정을 시작합니다.',
    },
    {
      id: 2, category: '학회소식', created_at: '2026-01-20',
      title: '창립회원 모집 안내 - 함께 만드는 반려문화의 미래',
      summary: '한국반려문화산업학회 창립회원 모집이 시작되었습니다. 반려문화산업의 발전을 함께 이끌어 나갈 연구자, 전문가, 실무자 여러분의 많은 참여와 관심을 부탁드립니다.',
    },
    {
      id: 3, category: '학회소식', created_at: '2026-02-01',
      title: '학회지 <반려문화> 창간호 논문 투고 안내',
      summary: '한국반려문화산업학회 공식 학회지 <반려문화> 창간호 논문 투고를 안내드립니다. 반려동물, 반려식물, 반려문화산업 전반에 걸친 연구 논문을 적극 모집합니다.',
    },
  ];

  const displayItems = newsItems.length > 0 ? newsItems : (loading ? [] : fallbackItems);

  const categoryStyle = (category) => {
    if (category === '학회소식') return 'bg-primary-100 text-primary';
    if (category === '회원모집') return 'bg-secondary/20 text-secondary-dark';
    if (category === '학회지') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <SubpageLayout title="학회소식" subtitle="학회의 최신 소식" sectionPath="/news">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {displayItems.map((item) => (
            <Link
              key={item.id}
              to={`/news/updates/${item.id}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${categoryStyle(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(item.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              {item.summary && (
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.summary}</p>
              )}
            </Link>
          ))}
          {displayItems.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">등록된 소식이 없습니다.</div>
          )}
        </div>
      )}

      <div className="mt-8 bg-primary-50 rounded-2xl border border-primary-100 shadow-sm p-6 flex items-start gap-4">
        <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-900 mb-1">학회 소식 뉴스레터 구독</p>
          <p className="text-sm text-gray-600">
            학회의 최신 소식과 공지사항을 이메일로 받아보세요. 뉴스레터 구독 신청은{' '}
            하단 뉴스레터 구독 폼을 이용해 주시기 바랍니다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default NewsListPage;
