import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/common/SubpageLayout';
import { Crown, Award, Users, BookOpen, UserCog } from 'lucide-react';

const OrganizationPage = () => {
  const orgData = {
    president: {
      name: '유광석',
      affiliation: '경희대',
    },
    vicePresidents: [
      { name: '토마스 김성은', affiliation: '동국대' },
    ],
    advisors: [
      { name: '우희종', affiliation: '서울대' },
      { name: '함태성', affiliation: '강원대' },
      { name: '이명권', affiliation: '서울신학대' },
    ],
    directors: [
      { role: '연구이사', name: '주소연', affiliation: '대진대' },
      { role: '총무이사', name: '이수현', affiliation: '경희대' },
      { role: '편집이사', name: '김현석', affiliation: '부산디지털대' },
      { role: '학술이사', name: '김덕삼', affiliation: '대진대' },
      { role: '대외협력이사', name: '강성일', affiliation: '한국반려동물장례연구소장' },
      { role: '산업이사', name: '김지연', affiliation: '주식회사반려동물' },
      { role: '산업이사', name: '문진희', affiliation: '정진바이오사이언스' },
      { role: 'AI 기술이사', name: '이광식', affiliation: '고려대' },
      { role: 'AI 기술이사', name: '이대섭', affiliation: '주식회사 이너벳' },
    ],
    committees: [
      { name: '편집위원회', chair: '김종만', affiliation: '경희대' },
      { name: '학술연구위원회', chair: '김태수', affiliation: '서울대' },
      { name: '연구윤리위원회', chair: '서동은, 이경원', affiliation: '경희대, 대진대' },
      { name: '대외협력위원회', chair: '김은기', affiliation: '고려대' },
    ],
    admin: {
      name: '장헤연',
      affiliation: '경희대',
    },
  };

  return (
    <SubpageLayout title="조직도" subtitle="학회의 조직 구성을 소개합니다" sectionPath="/about">
      <div className="space-y-12">
        {/* Link to detailed executives page */}
        <div className="flex justify-center">
          <Link
            to="/about/executives"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">임원단 상세보기</span>
          </Link>
        </div>

        {/* Organizational Chart */}
        <div className="relative">
          {/* President + Vice Presidents & Advisors - Top Row */}
          <div className="flex flex-col items-center mb-12">
            {/* 데스크탑: 회장단 중앙 + 고문단 오른쪽 연결 */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* 회장단 박스 - 중앙 */}
                <div className="bg-white rounded-2xl border-2 border-primary shadow-lg px-14 py-8 text-center">
                  {/* 회장단 타이틀 */}
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">회장단</h3>
                  </div>
                  <div className="flex items-center justify-center gap-12">
                    {/* 학회장 */}
                    <div className="text-center">
                      <h4 className="text-sm font-bold text-gray-900 mb-1">학회장</h4>
                      <p className="text-base font-semibold text-primary">{orgData.president.name}</p>
                      <p className="text-sm text-gray-500">{orgData.president.affiliation}</p>
                    </div>
                    {/* 부회장들 */}
                    {orgData.vicePresidents.map((vp, idx) => (
                      <div key={idx} className="text-center">
                        <h4 className="text-sm font-bold text-gray-900 mb-1">부회장</h4>
                        <p className="text-base font-semibold text-primary">{vp.name}</p>
                        <p className="text-sm text-gray-500">{vp.affiliation}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 가로 연결선 + 고문단 박스 (회장단 바로 오른쪽) */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-10 h-0.5 bg-gray-300"></div>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">고문단</h4>
                    </div>
                    <div className="flex gap-5">
                      {orgData.advisors.map((advisor, idx) => (
                        <div key={idx} className="text-center">
                          <p className="font-semibold text-primary text-sm">{advisor.name}</p>
                          <p className="text-xs text-gray-500">{advisor.affiliation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 모바일: 회장단 → 고문단 세로 배치 */}
            <div className="lg:hidden flex flex-col items-center">
              {/* 회장단 박스 */}
              <div className="bg-white rounded-2xl border-2 border-primary shadow-lg px-10 py-8 text-center">
                {/* 회장단 타이틀 */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">회장단</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  {/* 학회장 */}
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">학회장</h4>
                    <p className="text-base font-semibold text-primary">{orgData.president.name}</p>
                    <p className="text-sm text-gray-500">{orgData.president.affiliation}</p>
                  </div>
                  {/* 부회장들 */}
                  {orgData.vicePresidents.map((vp, idx) => (
                    <div key={idx} className="text-center">
                      <h4 className="text-sm font-bold text-gray-900 mb-1">부회장</h4>
                      <p className="text-base font-semibold text-primary">{vp.name}</p>
                      <p className="text-sm text-gray-500">{vp.affiliation}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* 세로 연결선 */}
              <div className="w-0.5 h-6 bg-gray-300"></div>
              {/* 고문단 박스 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">고문단</h4>
                </div>
                <div className="flex gap-5 justify-center">
                  {orgData.advisors.map((advisor, idx) => (
                    <div key={idx} className="text-center">
                      <p className="font-semibold text-primary text-sm">{advisor.name}</p>
                      <p className="text-xs text-gray-500">{advisor.affiliation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 세로 연결선 (상임이사로) */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
          </div>

          {/* Standing Directors */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">상임이사</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {orgData.directors.map((director, idx) => (
                  <div key={idx} className="p-4 bg-primary/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="font-bold text-primary text-sm mb-2">{director.role}</div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{director.name}</div>
                    <div className="text-xs text-gray-500">{director.affiliation}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Connecting line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
          </div>

          {/* Committees */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">위원회</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {orgData.committees.map((committee, idx) => (
                  <div key={idx} className="p-5 border border-gray-200 rounded-xl hover:border-primary/30 transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">{committee.name}</h4>
                    <div className="text-sm">
                      <span className="text-gray-600">위원장: </span>
                      <span className="font-semibold text-primary">{committee.chair}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{committee.affiliation}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Connecting line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
          </div>

          {/* Administrative Assistant */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xs w-full text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                <UserCog className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">행정간사</h4>
              <p className="font-semibold text-primary text-sm mb-1">{orgData.admin.name}</p>
              <p className="text-xs text-gray-500">{orgData.admin.affiliation}</p>
            </div>
          </div>
        </div>

        {/* Bottom Link */}
        <div className="flex justify-center pt-8 border-t border-gray-100">
          <Link
            to="/about/executives"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">임원단 상세보기</span>
          </Link>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default OrganizationPage;
