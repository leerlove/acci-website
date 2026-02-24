import { Crown, Star, Award, Users, BookOpen, UserCog } from 'lucide-react';
import SubpageLayout from '../../components/common/SubpageLayout';

const ExecutivesPage = () => {
  const sections = [
    {
      category: '학회장',
      icon: Crown,
      members: [
        {
          name: '유광석',
          role: '학회장',
          affiliation: '경희대학교',
          photo: null,
          bio: []
        }
      ]
    },
    {
      category: '부회장',
      icon: Star,
      members: [
        {
          name: '토마스 김성은',
          role: '부회장',
          affiliation: '동국대학교',
          photo: null,
          bio: []
        }
      ]
    },
    {
      category: '고문',
      icon: Award,
      members: [
        {
          name: '우희종',
          role: '고문',
          affiliation: '서울대학교',
          photo: null,
          bio: []
        },
        {
          name: '함태성',
          role: '고문',
          affiliation: '강원대학교',
          photo: null,
          bio: []
        },
        {
          name: '이명권',
          role: '고문',
          affiliation: '서울신학대학교',
          photo: null,
          bio: []
        }
      ]
    },
    {
      category: '상임이사',
      icon: Users,
      members: [
        {
          name: '주소연',
          role: '연구이사',
          affiliation: '대진대학교',
          photo: null,
          bio: []
        },
        {
          name: '이수현',
          role: '총무이사',
          affiliation: '경희대학교',
          photo: null,
          bio: []
        },
        {
          name: '김현석',
          role: '편집이사',
          affiliation: '부산디지털대학교',
          photo: null,
          bio: []
        },
        {
          name: '김덕삼',
          role: '학술이사',
          affiliation: '대진대학교',
          photo: null,
          bio: []
        },
        {
          name: '강성일',
          role: '대외협력이사',
          affiliation: '한국반려동물장례연구소',
          photo: null,
          bio: []
        },
        {
          name: '김지연',
          role: '산업이사',
          affiliation: '주식회사반려동물',
          photo: null,
          bio: []
        },
        {
          name: '문진희',
          role: '산업이사',
          affiliation: '정진바이오사이언스',
          photo: null,
          bio: []
        },
        {
          name: '이광식',
          role: 'AI 기술이사',
          affiliation: '고려대학교',
          photo: null,
          bio: []
        },
        {
          name: '이대섭',
          role: 'AI 기술이사',
          affiliation: '주식회사 이너벳',
          photo: null,
          bio: []
        }
      ]
    },
    {
      category: '위원회 위원장',
      icon: BookOpen,
      members: [
        {
          name: '김종만',
          role: '편집위원회 위원장',
          affiliation: '경희대학교',
          photo: null,
          bio: []
        },
        {
          name: '김태수',
          role: '학술연구위원회 위원장',
          affiliation: '서울대학교',
          photo: null,
          bio: []
        },
        {
          name: '서동은',
          role: '연구윤리위원회 위원장',
          affiliation: '경희대학교',
          photo: null,
          bio: []
        },
        {
          name: '이경원',
          role: '연구윤리위원회 위원장',
          affiliation: '대진대학교',
          photo: null,
          bio: []
        },
        {
          name: '김은기',
          role: '대외협력위원회 위원장',
          affiliation: '고려대학교',
          photo: null,
          bio: []
        }
      ]
    },
    {
      category: '행정간사',
      icon: UserCog,
      members: [
        {
          name: '장헤연',
          role: '행정간사',
          affiliation: '경희대학교',
          photo: null,
          bio: []
        }
      ]
    }
  ];

  const MemberRow = ({ member }) => {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
        <div className="flex items-start gap-5">
          {/* Photo/Avatar */}
          <div className="flex-shrink-0">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
              <span className="px-2 py-0.5 bg-primary-50 text-primary text-xs font-medium rounded-full">
                {member.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{member.affiliation}</p>

            {/* Bio / Career */}
            {member.bio.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                이력사항이 등록되지 않았습니다.
              </p>
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
  };

  return (
    <SubpageLayout
      sectionPath="/about"
      title="임원단"
      subtitle="학회 임원진을 소개합니다"
    >
      {/* Info Note */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          임원 사진 및 이력사항은 순차적으로 업데이트됩니다.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section, sectionIdx) => {
          const Icon = section.icon;
          return (
            <div key={sectionIdx}>
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.category}
                </h2>
              </div>

              {/* Member List */}
              <div className="space-y-3">
                {section.members.map((member, memberIdx) => (
                  <MemberRow key={memberIdx} member={member} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SubpageLayout>
  );
};

export default ExecutivesPage;
