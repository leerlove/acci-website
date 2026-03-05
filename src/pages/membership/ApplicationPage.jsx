import { useState } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import SubpageLayout from '../../components/common/SubpageLayout';
import { supabase } from '../../lib/supabase';

const MEMBER_TYPES = [
  {
    type: '정회원 (개인)',
    fee: '연 5만원',
    qualifications: [
      '교육기관 담당자',
      '박사학위 소지자 또는 박사과정 중인 자',
      '관련 기관 임원 또는 실무자',
      '석사학위 + 관련 분야 3년 이상 경력자',
    ],
  },
  {
    type: '정회원 (기관)',
    fee: '연 10만원',
    qualifications: ['반려문화 관련 기관 및 단체'],
  },
  {
    type: '평생회원 (개인)',
    fee: '50만원 (일시납)',
    qualifications: ['정회원(개인) 중 평생회비 납부자'],
  },
  {
    type: '평생회원 (기관)',
    fee: '100만원 (일시납)',
    qualifications: ['정회원(기관) 중 평생회비 납부 기관'],
  },
];

const STEPS = ['회원유형 선택', '신청인 정보', '자격 근거 및 동의', '신청 완료'];

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-10">
    {STEPS.map((label, index) => {
      const stepNum = index + 1;
      const isCompleted = stepNum < currentStep;
      const isActive = stepNum === currentStep;
      return (
        <div key={stepNum} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNum}
            </div>
            <span
              className={`text-xs font-medium whitespace-nowrap ${
                isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-12 sm:w-20 mx-1 mb-5 transition-colors ${
                stepNum < currentStep ? 'bg-green-400' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

const ApplicationPage = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    affiliation: '',
    position: '',
    qualification: '',
    agreedToPrivacy: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = '이름을 입력해 주세요.';
    if (!form.email.trim()) {
      newErrors.email = '이메일을 입력해 주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = '올바른 이메일 형식을 입력해 주세요.';
    }
    if (!form.phone.trim()) newErrors.phone = '연락처를 입력해 주세요.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!form.qualification.trim() || form.qualification.trim().length < 10) {
      newErrors.qualification = '자격 근거를 10자 이상 입력해 주세요.';
    }
    if (!form.agreedToPrivacy) {
      newErrors.agreedToPrivacy = '개인정보 수집·이용에 동의해 주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const { error } = await supabase.from('membership_applications').insert([
        {
          member_type: selectedType.type,
          applicant_name: form.name.trim(),
          applicant_email: form.email.trim(),
          applicant_phone: form.phone.trim(),
          affiliation: form.affiliation.trim() || null,
          position: form.position.trim() || null,
          qualification: form.qualification.trim(),
          status: 'pending',
        },
      ]);

      if (error) throw error;
      setStep(4);
    } catch (err) {
      console.error(err);
      setSubmitError('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SubpageLayout
      title="회원가입 신청"
      subtitle="온라인으로 간편하게 신청하세요"
      sectionPath="/membership"
    >
      <div className="max-w-3xl mx-auto px-4 py-10">
        <StepIndicator currentStep={step} />

        {/* Step 1 - 회원유형 선택 */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">회원유형을 선택해 주세요</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {MEMBER_TYPES.map((mt) => (
                <button
                  key={mt.type}
                  type="button"
                  onClick={() => setSelectedType(mt)}
                  className={`text-left border-2 rounded-xl p-5 transition-all focus:outline-none ${
                    selectedType?.type === mt.type
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                      : 'border-gray-200 hover:border-primary/40 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-bold text-gray-800 text-sm">{mt.type}</span>
                    {selectedType?.type === mt.type && (
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-primary font-semibold text-sm mb-3">{mt.fee}</p>
                  <ul className="space-y-1.5">
                    {mt.qualifications.map((q) => (
                      <li key={q} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedType}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                다음 단계
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - 신청인 정보 */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">신청인 정보를 입력해 주세요</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="홍길동"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="example@email.com"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="010-0000-0000"
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                    errors.phone ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 기관</label>
                <input
                  type="text"
                  value={form.affiliation}
                  onChange={(e) => updateField('affiliation', e.target.value)}
                  placeholder="소속 기관명 (선택)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직위/직책</label>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) => updateField('position', e.target.value)}
                  placeholder="직위 또는 직책 (선택)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                이전
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                다음 단계
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - 자격 근거 및 동의 */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">자격 근거 및 동의</h2>

            {selectedType && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-800 text-sm">{selectedType.type}</span>
                  <span className="text-primary font-semibold text-sm">{selectedType.fee}</span>
                </div>
                <ul className="space-y-1.5">
                  {selectedType.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  자격 근거 설명 <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  위 자격요건에 해당하는 근거를 간략히 설명해 주세요
                </p>
                <textarea
                  value={form.qualification}
                  onChange={(e) => updateField('qualification', e.target.value)}
                  rows={5}
                  placeholder="예: ○○대학교 반려동물학과 박사과정에 재학 중입니다."
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none ${
                    errors.qualification ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.qualification && (
                  <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>
                )}
              </div>

              <div>
                <label
                  className={`flex items-start gap-3 cursor-pointer ${
                    errors.agreedToPrivacy ? 'text-red-500' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.agreedToPrivacy}
                    onChange={(e) => updateField('agreedToPrivacy', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="text-red-500 mr-1">*</span>
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80"
                    >
                      개인정보 수집·이용
                    </a>
                    에 동의합니다.
                  </span>
                </label>
                {errors.agreedToPrivacy && (
                  <p className="text-xs text-red-500 mt-1 ml-7">{errors.agreedToPrivacy}</p>
                )}
              </div>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
                {submitError}
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" />
                이전
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    신청 중...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    신청하기
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - 완료 */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center py-8">
            <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              회원가입 신청이 완료되었습니다.
            </h2>
            <p className="text-gray-600 mb-8">
              이사회 심사 후 이메일로 결과를 안내해 드립니다.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 mb-10 text-sm text-blue-700 max-w-md">
              회비 납부는 승인 후 안내에 따라 진행됩니다.
            </div>
            <a
              href="/"
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              홈으로 돌아가기
            </a>
          </div>
        )}
      </div>
    </SubpageLayout>
  );
};

export default ApplicationPage;
