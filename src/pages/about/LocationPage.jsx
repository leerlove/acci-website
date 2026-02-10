import SubpageLayout from '../../components/common/SubpageLayout';
import { MapPin, Phone, Mail, Clock, Train } from 'lucide-react';

const LocationPage = () => {
  return (
    <SubpageLayout title="오시는 길" subtitle="학회 사무실 위치를 안내합니다" sectionPath="/about">
      <div className="space-y-6">
        {/* Map */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.3!2d127.051!3d37.5967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rK97Z2s64yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="학회 위치"
            />
          </div>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-4">
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
                <span className="text-gray-600">평일 09:00 - 18:00 (점심 12:00 - 13:00)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">교통 안내</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Train className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">지하철</p>
                  <p className="text-gray-600">1호선 회기역 1번 출구 도보 15분</p>
                  <p className="text-gray-600">경의중앙선 회기역 1번 출구 도보 15분</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">버스</p>
                  <p className="text-gray-600">경희대학교 정문 하차</p>
                  <p className="text-gray-600">간선: 201, 260, 273</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default LocationPage;
