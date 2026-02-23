// 학회 네비게이션 데이터 (Single Source of Truth)
// Header, Footer, SubpageSidebar, Breadcrumbs에서 공유

export const navigation = [
  {
    name: '학회소개',
    path: '/about',
    children: [
      { name: '인사말', path: '/about/greeting' },
      { name: '설립목적 및 비전', path: '/about/purpose' },
      { name: '연혁', path: '/about/history' },
      { name: '조직도', path: '/about/organization' },
      { name: '임원단', path: '/about/executives' },
      { name: '정관', path: '/about/bylaws' },
      { name: '오시는 길', path: '/about/location' },
    ],
  },
  {
    name: '학술활동',
    path: '/academic',
    children: [
      { name: '학술대회', path: '/academic/conference' },
      { name: '연구발표회', path: '/academic/presentation' },
      { name: '정책간담회', path: '/academic/policy' },
    ],
  },
  {
    name: '학회지 <반려문화>',
    path: '/journal',
    children: [
      { name: '투고안내', path: '/journal/submission' },
      { name: '논문검색', path: '/journal/search' },
      { name: '최신호', path: '/journal/latest' },
      { name: '연구윤리규정', path: '/journal/ethics' },
    ],
  },
  {
    name: '소식',
    path: '/news',
    children: [
      { name: '공지사항', path: '/news/notice' },
      { name: '학회소식', path: '/news/updates' },
      { name: '보도자료', path: '/news/press' },
    ],
  },
  {
    name: '회원',
    path: '/membership',
    children: [
      { name: '회원가입 안내', path: '/membership/guide' },
      { name: '회원혜택', path: '/membership/benefits' },
      { name: '회비안내', path: '/membership/fee' },
    ],
  },
  {
    name: '자료실',
    path: '/resources',
    children: [
      { name: '간행물', path: '/resources/publications' },
      { name: '연구자료', path: '/resources/research' },
      { name: '갤러리', path: '/resources/gallery' },
    ],
  },
  {
    name: '문의',
    path: '/contact',
    children: [
      { name: '문의하기', path: '/contact' },
      { name: 'FAQ', path: '/contact/faq' },
    ],
  },
];

// 특정 섹션의 네비게이션 데이터 가져오기
export const getSection = (sectionPath) => {
  return navigation.find((item) => sectionPath.startsWith(item.path));
};

// 현재 경로에서 브레드크럼 데이터 생성
export const getBreadcrumbs = (pathname) => {
  const crumbs = [{ name: '홈', path: '/' }];

  const section = navigation.find((item) => pathname.startsWith(item.path));
  if (!section) return crumbs;

  crumbs.push({ name: section.name, path: section.children?.[0]?.path || section.path });

  if (section.children) {
    const child = section.children.find((c) => c.path === pathname);
    if (child) {
      crumbs.push({ name: child.name, path: child.path });
    }
  }

  return crumbs;
};
