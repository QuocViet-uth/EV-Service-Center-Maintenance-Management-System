import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'motion/react';

export default function PaymentMock({ invoices = [], onPay }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }
    if (onPay) {
      onPay(selectedInvoice.id);
    }
    setShowPaymentModal(false);
    setSelectedInvoice(null);
    setPaymentMethod('');
  };

  const unpaidInvoices = invoices.filter((inv) => !inv.paid);

  if (unpaidInvoices.length === 0) {
    return (
      <Card title="Hóa đơn">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Không có hóa đơn chờ thanh toán
        </p>
      </Card>
    );
  }

  return (
    <>
      <Card title="Hóa đơn">
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                    Hóa đơn #{invoice.id}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(invoice.date).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    {invoice.amount.toLocaleString('vi-VN')} ₫
                  </p>
                  {invoice.paid ? (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
                      Đã thanh toán
                    </span>
                  ) : (
                    <Button
                      onClick={() => handlePayClick(invoice)}
                      variant="primary"
                      className="text-sm"
                    >
                      Thanh toán
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Thanh toán hóa đơn #{selectedInvoice.id}
              </h3>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Số tiền: <span className="font-bold text-lg text-gray-800 dark:text-white">
                    {selectedInvoice.amount.toLocaleString('vi-VN')} ₫
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Chọn phương thức thanh toán
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'ewallet', label: 'Ví điện tử (MoMo, ZaloPay)', icon: '💳' },
                    { id: 'banking', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
                    { id: 'card', label: 'Thẻ tín dụng/Ghi nợ', icon: '💳' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      <span className="mr-2">{method.icon}</span>
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedInvoice(null);
                    setPaymentMethod('');
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handlePaymentSubmit}
                  variant="primary"
                  className="flex-1"
                >
                  Xác nhận thanh toán
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
