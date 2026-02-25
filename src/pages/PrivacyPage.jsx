import SubpageLayout from '../components/common/SubpageLayout';

const PrivacyPage = () => {
  return (
    <SubpageLayout
      title="개인정보처리방침"
      subtitle="개인정보의 수집 및 이용에 관한 안내"
      sectionPath="/privacy"
    >
      <div className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-8">시행일: 2026년 1월 1일</p>

        <p className="mb-6 text-gray-700 leading-relaxed">
          한국반려문화산업학회(이하 "학회")는 정보주체의 자유와 권리 보호를 위해
          「개인정보 보호법」 및 관련 법령을 준수하며, 아래와 같이 개인정보처리방침을
          수립·공개합니다.
        </p>

        {/* 제1조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제1조 (수집하는 개인정보 항목)
          </h2>
          <p className="mb-3 text-gray-700">학회는 다음과 같은 개인정보를 수집합니다.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-800 mb-2">회원 가입 및 학회 활동</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>필수: 성명, 이메일 주소, 소속 기관, 연락처</li>
              <li>선택: 연구 분야, 학위 정보, 사진</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-800 mb-2">논문 투고 및 학술 활동</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>필수: 성명, 이메일 주소, 소속, 직위</li>
              <li>선택: 공동 저자 정보, 연구비 지원 정보</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-semibold text-gray-800 mb-2">문의 및 뉴스레터 구독</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>필수: 이메일 주소, 성명</li>
            </ul>
          </div>
        </section>

        {/* 제2조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제2조 (개인정보의 수집 및 이용 목적)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>학회 회원 관리 및 회원 서비스 제공</li>
            <li>학술대회, 세미나 등 학술행사 안내 및 참가 신청 처리</li>
            <li>학술지 논문 투고 및 심사 업무 처리</li>
            <li>뉴스레터 및 학회 소식 발송</li>
            <li>문의사항 접수 및 회신</li>
            <li>통계 분석 및 학회 서비스 개선</li>
          </ul>
        </section>

        {/* 제3조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제3조 (개인정보의 보유 및 이용 기간)
          </h2>
          <p className="mb-3 text-gray-700">
            학회는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
            수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-primary-50">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">항목</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">보유 기간</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="border border-gray-300 px-4 py-2">회원 정보</td>
                  <td className="border border-gray-300 px-4 py-2">회원 탈퇴 후 1년</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">논문 투고 및 심사 정보</td>
                  <td className="border border-gray-300 px-4 py-2">게재 결정 후 5년</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">문의 내역</td>
                  <td className="border border-gray-300 px-4 py-2">처리 완료 후 1년</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">뉴스레터 수신 동의</td>
                  <td className="border border-gray-300 px-4 py-2">수신 동의 철회 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 제4조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제4조 (개인정보의 제3자 제공)
          </h2>
          <p className="mb-3 text-gray-700">
            학회는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며,
            정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조에 해당하는
            경우에만 개인정보를 제3자에게 제공합니다.
          </p>
          <p className="text-gray-700">
            현재 학회는 정보주체의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
            단, 학술지 논문 공개를 위한 학술 데이터베이스(KCI 등)와의 연계 시에는
            저자 정보가 제공될 수 있으며, 이 경우 사전에 동의를 받습니다.
          </p>
        </section>

        {/* 제5조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제5조 (개인정보의 파기 절차 및 방법)
          </h2>
          <p className="mb-3 text-gray-700">
            학회는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게
            되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-semibold mb-1">파기 절차</p>
              <p>
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및
                기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시 파기됩니다.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">파기 방법</p>
              <p>
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
                삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 제6조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제6조 (정보주체의 권리·의무 및 행사 방법)
          </h2>
          <p className="mb-3 text-gray-700">정보주체는 학회에 대해 언제든지 다음 각 호의 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ul>
          <p className="text-gray-700">
            위의 권리 행사는 학회에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며,
            학회는 이에 대해 지체없이 조치하겠습니다.
          </p>
        </section>

        {/* 제7조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제7조 (쿠키 사용)
          </h2>
          <p className="mb-3 text-gray-700">
            학회 웹사이트는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를
            저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
          </p>
          <p className="mb-3 text-gray-700">
            쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
            브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의
            하드디스크에 저장되기도 합니다.
          </p>
          <p className="text-gray-700">
            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을
            설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
            아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
          </p>
        </section>

        {/* 제8조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제8조 (개인정보 보호책임자)
          </h2>
          <p className="mb-4 text-gray-700">
            학회는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 정보주체의 개인정보
            관련 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
            지정하고 있습니다.
          </p>
          <div className="bg-primary-50 rounded-lg p-5 border border-primary-200">
            <p className="font-bold text-primary-900 mb-3">개인정보 보호책임자</p>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">기관명:</span> 한국반려문화산업학회</li>
              <li><span className="font-medium">이메일:</span> contact@kacci.or.kr</li>
              <li><span className="font-medium">전화:</span> 02-961-0481</li>
            </ul>
          </div>
          <p className="mt-4 text-gray-700">
            정보주체께서는 학회의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련
            문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게
            문의하실 수 있습니다. 학회는 정보주체의 문의에 대해 지체없이 답변 및
            처리해드릴 것입니다.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>본 개인정보처리방침은 2026년 1월 1일부터 시행됩니다.</p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default PrivacyPage;
