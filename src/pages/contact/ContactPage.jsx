import SubpageLayout from '../../components/common/SubpageLayout';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:contact@kacci.or.kr?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`이름: ${form.name}\n이메일: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <SubpageLayout title="문의하기" subtitle="학회에 문의사항을 보내주세요" sectionPath="/contact">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">문의 양식</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="문의 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                placeholder="문의 내용을 입력해주세요."
              />
            </div>
            <button type="submit" className="btn-primary">
              <Send className="w-4 h-4 mr-2" />
              문의 보내기
            </button>
          </form>
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
                <span className="text-gray-600">02-961-0000</span>
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
        </div>
      </div>
    </SubpageLayout>
  );
};

export default ContactPage;
