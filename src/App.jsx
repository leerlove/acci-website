import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';

// Eager load - always needed
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load - sub-pages
const GreetingPage = lazy(() => import('./pages/about/GreetingPage'));
const PurposePage = lazy(() => import('./pages/about/PurposePage'));
const HistoryPage = lazy(() => import('./pages/about/HistoryPage'));
const OrganizationPage = lazy(() => import('./pages/about/OrganizationPage'));
const BylawsPage = lazy(() => import('./pages/about/BylawsPage'));
const LocationPage = lazy(() => import('./pages/about/LocationPage'));
const ConferencePage = lazy(() => import('./pages/academic/ConferencePage'));
const PresentationPage = lazy(() => import('./pages/academic/PresentationPage'));
const PolicyPage = lazy(() => import('./pages/academic/PolicyPage'));
const SubmissionPage = lazy(() => import('./pages/journal/SubmissionPage'));
const SearchPage = lazy(() => import('./pages/journal/SearchPage'));
const LatestPage = lazy(() => import('./pages/journal/LatestPage'));
const EthicsPage = lazy(() => import('./pages/journal/EthicsPage'));
const NoticePage = lazy(() => import('./pages/news/NoticePage'));
const NewsListPage = lazy(() => import('./pages/news/NewsListPage'));
const PressPage = lazy(() => import('./pages/news/PressPage'));
const GuidePage = lazy(() => import('./pages/membership/GuidePage'));
const BenefitsPage = lazy(() => import('./pages/membership/BenefitsPage'));
const FeePage = lazy(() => import('./pages/membership/FeePage'));
const PublicationsPage = lazy(() => import('./pages/resources/PublicationsPage'));
const ResearchPage = lazy(() => import('./pages/resources/ResearchPage'));
const GalleryPage = lazy(() => import('./pages/resources/GalleryPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const FAQPage = lazy(() => import('./pages/contact/FAQPage'));

const App = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    }>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* 학회소개 */}
          <Route path="/about" element={<Navigate to="/about/greeting" replace />} />
          <Route path="/about/greeting" element={<GreetingPage />} />
          <Route path="/about/purpose" element={<PurposePage />} />
          <Route path="/about/history" element={<HistoryPage />} />
          <Route path="/about/organization" element={<OrganizationPage />} />
          <Route path="/about/bylaws" element={<BylawsPage />} />
          <Route path="/about/location" element={<LocationPage />} />

          {/* 학술활동 */}
          <Route path="/academic" element={<Navigate to="/academic/conference" replace />} />
          <Route path="/academic/conference" element={<ConferencePage />} />
          <Route path="/academic/presentation" element={<PresentationPage />} />
          <Route path="/academic/policy" element={<PolicyPage />} />

          {/* 학회지 */}
          <Route path="/journal" element={<Navigate to="/journal/submission" replace />} />
          <Route path="/journal/submission" element={<SubmissionPage />} />
          <Route path="/journal/search" element={<SearchPage />} />
          <Route path="/journal/latest" element={<LatestPage />} />
          <Route path="/journal/ethics" element={<EthicsPage />} />

          {/* 소식 */}
          <Route path="/news" element={<Navigate to="/news/notice" replace />} />
          <Route path="/news/notice" element={<NoticePage />} />
          <Route path="/news/updates" element={<NewsListPage />} />
          <Route path="/news/press" element={<PressPage />} />

          {/* 회원 */}
          <Route path="/membership" element={<Navigate to="/membership/guide" replace />} />
          <Route path="/membership/guide" element={<GuidePage />} />
          <Route path="/membership/benefits" element={<BenefitsPage />} />
          <Route path="/membership/fee" element={<FeePage />} />

          {/* 자료실 */}
          <Route path="/resources" element={<Navigate to="/resources/publications" replace />} />
          <Route path="/resources/publications" element={<PublicationsPage />} />
          <Route path="/resources/research" element={<ResearchPage />} />
          <Route path="/resources/gallery" element={<GalleryPage />} />

          {/* 문의 */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/faq" element={<FAQPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
