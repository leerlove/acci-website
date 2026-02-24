import SubpageLayout from '../../components/common/SubpageLayout';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', category: '일반문의', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const categories = ['일반문의', '회원가입', '학술대회', '논문투고', '기타'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@kacci.or.kr?subject=${encodeURIComponent(`[${form.category}] ${form.subject}`)}&body=${encodeURIComponent(`이름: ${form.name}\n이메일: ${form.email}\n문의유형: ${form.category}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', category: '일반문의', message: '' });
    setSubmitted(false);
  };

  return (
    <SubpageLayout title="문의하기" subtitle="학회에 문의사항을 보내주세요" sectionPath="/contact">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">이메일 앱이 열렸습니다</h2>
              <p className="text-gray-600 mb-1">이메일 클라이언트에서 내용을 확인하고 전송해 주세요.</p>
              <p className="text-sm text-gray-400 mb-6">이메일 앱이 열리지 않았다면 직접 contact@kacci.or.kr로 보내주세요.</p>
              <button onClick={handleReset} className="btn-secondary text-sm">
                새 문의 작성
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-6">문의 양식</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이름 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일 <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">문의 유형</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="문의 제목"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">내용 <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    placeholder="문의 내용을 입력해주세요."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">이메일 클라이언트가 열리며, 직접 전송하셔야 합니다.</p>
                  <button type="submit" className="btn-primary">
                    <Send className="w-4 h-4 mr-2" />
                    문의 보내기
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">연락처</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">서울특별시 동대문구 경희대로 26,<br />경희대학교 네오르네상스관 332호</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-gray-600">02-961-0481</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-gray-600">contact@kacci.or.kr</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-gray-600">평일 09:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Direct Email */}
          <div className="bg-primary-50/50 rounded-2xl border border-primary/10 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">이메일 직접 발송</h4>
                <p className="text-xs text-gray-600">
                  위 양식 외에도 <span className="font-semibold text-primary">contact@kacci.or.kr</span>로
                  직접 이메일을 보내실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default ContactPage;
