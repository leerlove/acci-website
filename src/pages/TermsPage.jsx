import SubpageLayout from '../components/common/SubpageLayout';

const TermsPage = () => {
  return (
    <SubpageLayout
      title="이용약관"
      subtitle="서비스 이용에 관한 약관"
      sectionPath="/terms"
    >
      <div className="prose max-w-none">
        <p className="text-sm text-gray-500 mb-8">시행일: 2026년 1월 1일</p>

        {/* 제1조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제1조 (목적)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            이 약관은 한국반려문화산업학회(이하 "학회")가 운영하는 웹사이트
            (https://kacci.or.kr, 이하 "사이트")에서 제공하는 서비스의 이용조건 및
            절차, 학회와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        {/* 제2조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제2조 (정의)
          </h2>
          <p className="mb-3 text-gray-700">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <span className="font-medium">"서비스"</span>란 학회가 사이트를 통해 제공하는
              학술 정보, 학회 소식, 논문 투고 안내, 회원 서비스 등 일체의 온라인 서비스를 말합니다.
            </li>
            <li>
              <span className="font-medium">"이용자"</span>란 사이트에 접속하여 이 약관에 따라
              학회가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
            </li>
            <li>
              <span className="font-medium">"회원"</span>이란 학회에 개인정보를 제공하여
              회원 등록을 한 자로서, 학회의 서비스를 지속적으로 이용할 수 있는 자를 말합니다.
            </li>
            <li>
              <span className="font-medium">"비회원"</span>이란 회원에 가입하지 않고 학회가
              제공하는 서비스를 이용하는 자를 말합니다.
            </li>
          </ol>
        </section>

        {/* 제3조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제3조 (약관의 효력 및 변경)
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              이 약관은 사이트에 게시하여 공시함으로써 효력을 발생합니다.
            </li>
            <li>
              학회는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 안에서
              이 약관을 변경할 수 있으며, 변경된 약관은 사이트에 공지함으로써 효력이 발생합니다.
            </li>
            <li>
              이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하거나
              회원 탈퇴를 요청할 수 있습니다. 변경 공지 이후에도 서비스를 계속 이용하는
              경우에는 약관 변경에 동의한 것으로 간주합니다.
            </li>
          </ol>
        </section>

        {/* 제4조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제4조 (서비스 내용)
          </h2>
          <p className="mb-3 text-gray-700">학회는 다음과 같은 서비스를 제공합니다.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>학회 소개 및 조직 안내</li>
            <li>학술지 및 논문 정보 제공</li>
            <li>학술대회, 세미나 등 학술행사 안내</li>
            <li>회원 가입 및 회원 서비스</li>
            <li>논문 투고 안내 및 접수</li>
            <li>학회 뉴스 및 공지사항 제공</li>
            <li>연구 자료 및 관련 정보 제공</li>
            <li>이메일 문의 접수 및 처리</li>
          </ul>
          <p className="mt-4 text-gray-700">
            학회는 운영상 또는 기술상의 필요에 따라 서비스의 전부 또는 일부를 변경할 수 있으며,
            이 경우 변경 내용을 사이트에 공지합니다.
          </p>
        </section>

        {/* 제5조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제5조 (이용자의 의무)
          </h2>
          <p className="mb-3 text-gray-700">이용자는 다음 각 호에 해당하는 행위를 하여서는 안 됩니다.</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>타인의 정보 도용</li>
            <li>학회가 게시한 정보의 무단 변경</li>
            <li>학회가 금지한 정보(컴퓨터 프로그램 등)의 송신 또는 게시</li>
            <li>학회와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            <li>학회 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
            <li>외설 또는 폭력적인 메시지·화상·음성 등을 유포하는 행위</li>
            <li>기타 불법적이거나 부당한 행위</li>
          </ol>
        </section>

        {/* 제6조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제6조 (지적재산권)
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              학회가 작성한 저작물에 대한 저작권 기타 지적재산권은 학회에 귀속합니다.
            </li>
            <li>
              이용자는 학회를 이용함으로써 얻은 정보를 학회의 사전 승낙 없이 복제, 송신,
              출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게
              이용하게 하여서는 안 됩니다.
            </li>
            <li>
              학술지에 게재된 논문의 저작권은 해당 저자 및 학회와의 저작권 계약에 따릅니다.
            </li>
          </ol>
        </section>

        {/* 제7조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제7조 (면책조항)
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              학회는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수
              없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
            </li>
            <li>
              학회는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
            </li>
            <li>
              학회는 이용자가 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에
              관하여는 책임을 지지 않습니다.
            </li>
            <li>
              학회는 이용자 간 또는 이용자와 제3자 상호간에 서비스를 매개로 하여 거래 등을
              한 경우에는 책임이 면제됩니다.
            </li>
          </ol>
        </section>

        {/* 제8조 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-200">
            제8조 (분쟁 해결)
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              학회와 이용자 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법령을
              적용합니다.
            </li>
            <li>
              학회와 이용자 간에 발생한 서비스 이용에 관한 소송은 학회의 소재지를 관할하는
              법원을 전속 관할로 합니다.
            </li>
            <li>
              분쟁 발생 시 이용자는 먼저 학회에 문의(contact@kacci.or.kr)하여 원만한
              해결을 시도할 수 있습니다.
            </li>
          </ol>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>본 이용약관은 2026년 1월 1일부터 시행됩니다.</p>
          <p className="mt-1">문의: 한국반려문화산업학회 | contact@kacci.or.kr | 02-961-0481</p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default TermsPage;
