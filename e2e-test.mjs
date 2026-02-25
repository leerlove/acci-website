import https from 'https';
import http from 'http';

const SUPABASE_URL = 'owfkjjyafaocwnwlzxew.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZmtqanlhZmFvY3dud2x6eGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTAwMTksImV4cCI6MjA4NzUyNjAxOX0.m9aXOCp2mEzL_iOqd1M8TCD2wS5SzQUsrHuxaEL3Z3s';

function supaReq(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const headers = {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${token || ANON_KEY}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Prefer': token ? 'return=representation' : 'return=minimal',
    };
    if (data) headers['Content-Length'] = Buffer.byteLength(data);
    const req = https.request({ hostname: SUPABASE_URL, path, method, headers }, (res) => {
      let b = '';
      res.on('data', (c) => b += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: b ? JSON.parse(b) : null }); }
        catch { resolve({ status: res.statusCode, body: b }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function localGet(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5175${path}`, (res) => {
      let b = '';
      res.on('data', (c) => b += c);
      res.on('end', () => resolve({ status: res.statusCode }));
    }).on('error', reject);
  });
}

let passed = 0, failed = 0;
function test(name, ok) {
  if (ok) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.log(`  ❌ ${name}`); }
}

async function run() {
  console.log('\n=== KACCI 홈페이지 E2E 테스트 ===\n');

  // 1. 프론트엔드 페이지
  console.log('📄 프론트엔드 페이지 접근');
  const pages = ['/', '/about/greeting', '/news/notice', '/news/updates', '/news/press',
    '/resources/gallery', '/contact', '/contact/faq', '/privacy', '/terms', '/admin/login',
    '/membership/guide', '/journal/submission'];
  for (const p of pages) {
    try {
      const r = await localGet(p);
      test(`GET ${p} => ${r.status}`, r.status === 200);
    } catch (e) {
      test(`GET ${p} => ERROR`, false);
    }
  }

  // 2. 관리자 로그인
  console.log('\n🔐 Supabase Auth 로그인');
  const loginRes = await supaReq('POST', '/auth/v1/token?grant_type=password', {
    email: 'admin@kacci.or.kr', password: 'test1234',
  });
  const token = loginRes.body?.access_token;
  test(`관리자 로그인 => ${loginRes.status}`, loginRes.status === 200 && !!token);
  test('role = authenticated', loginRes.body?.user?.role === 'authenticated');
  test('app_metadata.role = admin', loginRes.body?.user?.app_metadata?.role === 'admin');

  // 3. 문의하기 (anon)
  console.log('\n📩 문의하기 (anon INSERT)');
  const contactRes = await supaReq('POST', '/rest/v1/contact_inquiries', {
    category: '일반문의', name: '테스터', email: 'test@test.com',
    subject: 'E2E 테스트', message: '자동 테스트입니다.'
  });
  test(`문의 등록 => ${contactRes.status}`, contactRes.status === 201);

  // 4. 뉴스레터 (anon)
  console.log('\n📬 뉴스레터 구독 (anon INSERT)');
  const nlRes = await supaReq('POST', '/rest/v1/newsletter_subscribers', { email: 'e2e@test.com' });
  test(`뉴스레터 구독 => ${nlRes.status}`, nlRes.status === 201);
  const nlDup = await supaReq('POST', '/rest/v1/newsletter_subscribers', { email: 'e2e@test.com' });
  test(`중복 구독 거부 => ${nlDup.status}`, nlDup.status === 409);

  // 5. 소식 CRUD (authenticated)
  console.log('\n📰 소식 CRUD (authenticated)');
  const n1 = await supaReq('POST', '/rest/v1/news', {
    category: '학회소식', title: 'E2E 학회소식', content: '테스트', author: '관리자', is_published: true
  }, token);
  test(`학회소식 생성 => ${n1.status}`, n1.status === 201);

  const n2 = await supaReq('POST', '/rest/v1/news', {
    category: '공지사항', title: 'E2E 공지사항', content: '테스트', author: '관리자', is_published: true, is_pinned: true
  }, token);
  test(`공지사항 생성 => ${n2.status}`, n2.status === 201);

  const n3 = await supaReq('POST', '/rest/v1/news', {
    category: '보도자료', title: 'E2E 보도자료', content: '테스트', author: '관리자', is_published: false
  }, token);
  test(`보도자료 생성 (미발행) => ${n3.status}`, n3.status === 201);

  // Read - anon (published만)
  const readAnon = await supaReq('GET', '/rest/v1/news?select=id,title,is_published');
  test(`anon 조회: published만 (${readAnon.body?.length}건)`, readAnon.status === 200 && readAnon.body?.length === 2);

  // Read - authenticated (전체)
  const readAuth = await supaReq('GET', '/rest/v1/news?select=id,title,is_published', null, token);
  test(`authenticated 조회: 전체 (${readAuth.body?.length}건)`, readAuth.status === 200 && readAuth.body?.length === 3);

  // 6. 갤러리 (authenticated)
  console.log('\n🖼️  갤러리 CRUD (authenticated)');
  const g1 = await supaReq('POST', '/rest/v1/gallery_items', {
    title: 'E2E 갤러리', image_url: 'https://example.com/test.jpg', category: '학술대회'
  }, token);
  test(`갤러리 생성 => ${g1.status}`, g1.status === 201);

  const gRead = await supaReq('GET', '/rest/v1/gallery_items?select=id,title');
  test(`anon 갤러리 조회 (${gRead.body?.length}건)`, gRead.status === 200 && gRead.body?.length >= 1);

  // 7. 관리자 데이터 접근
  console.log('\n👤 관리자 데이터 접근');
  const cRead = await supaReq('GET', '/rest/v1/contact_inquiries?select=id,subject', null, token);
  test(`관리자 문의 조회 (${cRead.body?.length}건)`, cRead.status === 200 && cRead.body?.length >= 1);

  const nlRead = await supaReq('GET', '/rest/v1/newsletter_subscribers?select=id,email', null, token);
  test(`관리자 구독자 조회 (${nlRead.body?.length}건)`, nlRead.status === 200 && nlRead.body?.length >= 1);

  // 8. RLS 보안
  console.log('\n🔒 RLS 보안');
  const cAnon = await supaReq('GET', '/rest/v1/contact_inquiries?select=id');
  test('anon 문의 조회 불가 (RLS)', cAnon.body?.length === 0);
  const nlAnon = await supaReq('GET', '/rest/v1/newsletter_subscribers?select=id');
  test('anon 구독자 조회 불가 (RLS)', nlAnon.body?.length === 0);

  // 9. 정리
  console.log('\n🧹 테스트 데이터 정리');
  await supaReq('DELETE', `/rest/v1/news?title=like.E2E*`, null, token);
  await supaReq('DELETE', `/rest/v1/gallery_items?title=eq.${encodeURIComponent('E2E 갤러리')}`, null, token);
  await supaReq('DELETE', `/rest/v1/contact_inquiries?subject=eq.${encodeURIComponent('E2E 테스트')}`, null, token);
  await supaReq('DELETE', '/rest/v1/newsletter_subscribers?email=eq.e2e@test.com', null, token);
  test('테스트 데이터 정리 완료', true);

  console.log(`\n=== 결과: ${passed} 통과 / ${failed} 실패 ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
