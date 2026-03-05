import { useState, useEffect } from 'react';
import { Crown, Star, Award, Users, BookOpen, UserCog, Loader2 } from 'lucide-react';
import SubpageLayout from '../../components/common/SubpageLayout';
import { supabase } from '../../lib/supabase';

const CATEGORY_ORDER = ['학회장', '부회장', '고문', '상임이사', '위원회 위원장', '행정간사'];

const CATEGORY_ICON = {
  '학회장': Crown,
  '부회장': Star,
  '고문': Award,
  '상임이사': Users,
  '위원회 위원장': BookOpen,
  '행정간사': UserCog,
};

const MemberRow = ({ member }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
    <div className="flex items-start gap-5">
      <div className="flex-shrink-0">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
          <span className="px-2 py-0.5 bg-primary-50 text-primary text-xs font-medium rounded-full">
            {member.role}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{member.affiliation}</p>
        {(!member.bio || member.bio.length === 0) ? (
          <p className="text-sm text-gray-400 italic">이력사항이 등록되지 않았습니다.</p>
        ) : (
          <ul className="text-sm text-gray-600 space-y-0.5">
            {member.bio.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

const ExecutivesPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExecutives = async () => {
      const { data, error } = await supabase
        .from('executives')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        const grouped = CATEGORY_ORDER
          .map((cat) => ({
            category: cat,
            icon: CATEGORY_ICON[cat],
            members: data.filter((m) => m.category === cat),
          }))
          .filter((s) => s.members.length > 0);
        setSections(grouped);
      }
      setLoading(false);
    };
    fetchExecutives();
  }, []);

  return (
    <SubpageLayout sectionPath="/about" title="임원단" subtitle="학회 임원진을 소개합니다">
      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          임원 사진 및 이력사항은 순차적으로 업데이트됩니다.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-12">
          {sections.map((section, sectionIdx) => {
            const Icon = section.icon;
            return (
              <div key={sectionIdx}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.category}</h2>
                </div>
                <div className="space-y-3">
                  {section.members.map((member) => (
                    <MemberRow key={member.id} member={member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SubpageLayout>
  );
};

export default ExecutivesPage;
