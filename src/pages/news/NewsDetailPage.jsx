import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import SubpageLayout from '../../components/common/SubpageLayout';
import { ArrowLeft, Calendar, User, Eye, Loader2, AlertCircle, Paperclip } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CATEGORY_MAP = {
  '/news/notice': { label: '공지사항', listPath: '/news/notice' },
  '/news/updates': { label: '학회소식', listPath: '/news/updates' },
  '/news/press': { label: '보도자료', listPath: '/news/press' },
};

const NewsDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Determine category from URL path prefix
  const pathPrefix = Object.keys(CATEGORY_MAP).find((p) =>
    location.pathname.startsWith(p + '/')
  );
  const meta = pathPrefix ? CATEGORY_MAP[pathPrefix] : null;

  useEffect(() => {
    if (!meta || !id) {
      // Use async wrapper to avoid synchronous setState in effect
      const setInvalid = async () => { setNotFound(true); setLoading(false); };
      setInvalid();
      return;
    }

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, category, title, content, summary, image_url, attachments, author, view_count, created_at')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setArticle(data);
        supabase.rpc('increment_view_count', { article_id: id });
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id, meta]);

  const isHTML = (str) => /<[a-z][\s\S]*>/i.test(str);

  const renderContent = (text) => {
    if (!text) return null;
    if (isHTML(text)) {
      return <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: text }} />;
    }
    return text.split(/\n\n+/).map((para, i) => (
      <p key={i} className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
        {para}
      </p>
    ));
  };

  if (loading) {
    return (
      <SubpageLayout title={meta?.label || '소식'} subtitle="" sectionPath="/news">
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </SubpageLayout>
    );
  }

  if (notFound) {
    return (
      <SubpageLayout title={meta?.label || '소식'} subtitle="" sectionPath="/news">
        <div className="text-center py-24">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-6">게시글을 찾을 수 없습니다.</p>
          <Link
            to={meta?.listPath || '/news/notice'}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로 돌아가기
          </Link>
        </div>
      </SubpageLayout>
    );
  }

  return (
    <SubpageLayout title={meta.label} subtitle="" sectionPath="/news">
      <Link
        to={meta.listPath}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        목록으로 돌아가기
      </Link>

      <article
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-8 border-b border-gray-100">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary mb-4 inline-block">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.created_at).toLocaleDateString('ko-KR')}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              조회 {article.view_count ?? 0}
            </span>
          </div>
        </div>

        {/* Image */}
        {article.image_url && (
          <div className="border-b border-gray-100">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        )}

        {/* Body */}
        <div className="px-6 sm:px-8 py-8">
          {renderContent(article.content)}
        </div>

        {/* Attachments */}
        {article.attachments?.length > 0 && (
          <div className="px-6 sm:px-8 py-5 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
              <Paperclip className="w-4 h-4" />
              첨부파일
            </h3>
            <div className="space-y-2">
              {article.attachments.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Paperclip className="w-3.5 h-3.5 flex-shrink-0" />
                  {file.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 border-t border-gray-100 bg-gray-50/50">
          <Link
            to={meta.listPath}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {meta.label} 목록
          </Link>
        </div>
      </article>
    </SubpageLayout>
  );
};

export default NewsDetailPage;
