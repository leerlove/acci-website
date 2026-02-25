-- ============================================
-- KACCI Homepage - Initial Database Schema
-- Supabase Dashboard > SQL Editor 에서 실행
-- ============================================

-- 1. 문의하기 (Contact Inquiries)
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('일반문의', '회원가입', '학술대회', '논문투고', '기타')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 뉴스레터 구독자 (Newsletter Subscribers)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- 3. Row Level Security 활성화
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 4. RLS 정책
-- anon: INSERT만 가능 (읽기/수정/삭제 불가)
-- 주의: Supabase JS client에서 .insert() 사용 시 .select() 체이닝 금지
--       (return=representation 시 SELECT 정책 부재로 401 발생)
CREATE POLICY "anon_insert_contact" ON contact_inquiries
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

-- authenticated: 모든 작업 가능
CREATE POLICY "auth_all_contact" ON contact_inquiries
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth_all_newsletter" ON newsletter_subscribers
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. service_role은 RLS를 자동 bypass하므로 별도 정책 불필요
