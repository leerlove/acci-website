-- news 테이블
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('학회소식', '보도자료', '공지사항')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  author TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- gallery_items 테이블
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT '일반',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (published만)
CREATE POLICY "Allow public read published news" ON news
  FOR SELECT TO anon USING (is_published = TRUE);

CREATE POLICY "Allow public read published gallery" ON gallery_items
  FOR SELECT TO anon USING (is_published = TRUE);

-- authenticated 사용자는 모든 작업 가능
CREATE POLICY "Allow authenticated full access news" ON news
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Allow authenticated full access gallery" ON gallery_items
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- Supabase Storage 버킷 (Dashboard에서 수동 생성 필요)
-- 버킷 이름: gallery
-- Public: true
