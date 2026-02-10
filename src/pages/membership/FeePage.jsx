import SubpageLayout from '../../components/common/SubpageLayout';
import { CreditCard, Building2 } from 'lucide-react';

const FeePage = () => {
  const fees = [
    { type: '정회원 (개인)', annual: '50,000원', lifetime: '500,000원' },
    { type: '정회원 (기관)', annual: '100,000원', lifetime: '1,000,000원' },
  ];

  return (
    <SubpageLayout title="회비안내" subtitle="회비 및 납부 방법 안내" sectionPath="/membership">
      <div className="space-y-6">
        {/* Fee Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="text-xl font-bold text-gray-900">회비 안내</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-primary">구분</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-primary">연회비</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-primary">평생회비</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fees.map((fee) => (
                  <tr key={fee.type} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{fee.type}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700 font-semibold">{fee.annual}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700 font-semibold">{fee.lifetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">납부 방법</h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">계좌이체</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600 pl-8">
              <p><span className="font-medium text-gray-700">은행:</span> 추후 안내</p>
              <p><span className="font-medium text-gray-700">계좌번호:</span> 추후 안내</p>
              <p><span className="font-medium text-gray-700">예금주:</span> 한국반려문화산업학회</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            * 회비 납부 후 사무국(contact@kacci.or.kr)으로 납부 확인 요청 바랍니다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default FeePage;
