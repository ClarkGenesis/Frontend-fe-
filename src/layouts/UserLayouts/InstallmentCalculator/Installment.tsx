import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
}

function Tooltip({ children, content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-50 px-2 py-1 text-sm text-white bg-gray-800 
                            rounded-md shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    >
                        {content}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                            border-4 border-transparent border-t-gray-800" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface InstallmentProps {
    motorcyclePrice: number;
    onClose: () => void;
}

interface CalculatedResults {
    remainingPrice: number;
    interestAmount: number;
    totalAmount: number;
    monthlyPayment: number;
}

interface InterestRates {
    [key: number]: number;
}

function Installment({ motorcyclePrice, onClose }: InstallmentProps   ) {
    const [selectedMonths, setSelectedMonths] = useState<number>(12);
    const [downPayment, setDownPayment] = useState<string>('');
    const [validationError, setValidationError] = useState<string>('');
    const [calculatedResults, setCalculatedResults] = useState<CalculatedResults>({
        remainingPrice: 0,
        interestAmount: 0,
        totalAmount: 0,
        monthlyPayment: 0
    });

    const interestRates: InterestRates = {
        12: 0.20,
        18: 0.25,
        24: 0.30,
        36: 0.35,
        40: 0.40
    };

    useEffect(() => {
        calculateInstallment();
    }); // Initialize with default values

    const validateDownPayment = (amount: number): boolean => {
        if (amount > motorcyclePrice) {
            setValidationError('Down payment cannot exceed the motorcycle price');
            return false;
        }
        setValidationError('');
        return true;
    };

    const calculateInstallment = (): void => {
        const downPaymentAmount = parseFloat(downPayment) || 0;

        if (!validateDownPayment(downPaymentAmount)) {
            setCalculatedResults({
                remainingPrice: 0,
                interestAmount: 0,
                totalAmount: 0,
                monthlyPayment: 0
            });
            return;
        }

        const remainingPrice = motorcyclePrice - downPaymentAmount;
        const interestAmount = remainingPrice * interestRates[selectedMonths];
        const totalAmount = remainingPrice + interestAmount;
        const monthlyPayment = totalAmount / selectedMonths;

        setCalculatedResults({
            remainingPrice,
            interestAmount,
            totalAmount,
            monthlyPayment
        });
    };

    const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setDownPayment(value);
            const amount = parseFloat(value) || 0;
            validateDownPayment(amount);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[600px] overflow-hidden">
                {/* Header */}
                <div className="bg-red-600 text-white px-3 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h5 className="text-white font-semibold">Installment Calculator</h5>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-red-200 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-6 flex gap-6">
                    {/* Left Column - Calculator Controls */}
                    <div className="w-[400px]">
                        {/* Motorcycle Price Display */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                            <p className="text-gray-800">Motorcycle Price</p>
                            <p className="text-2xl font-bold text-red-600">
                                ₱{motorcyclePrice.toLocaleString()}
                            </p>
                        </div>

                        {/* Down Payment Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Down Payment Amount
                            </label>
                            <input
                                type="text"
                                value={downPayment}
                                onChange={handleDownPaymentChange}
                                placeholder="Enter down payment amount"
                                className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none 
                                    transition-colors ${validationError ? 'border-red-200' : 'border-gray-300 focus:border-red-500'}`}
                            />
                                {validationError && (
                                    <p className="mt-2 text-sm text-gray-500">{validationError}</p>
                                )}
                        </div>

                        {/* Term Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Term (Months)
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {Object.keys(interestRates).map((month) => (
                                    <Tooltip
                                        key={month}
                                        content={`Interest Rate: ${interestRates[Number(month)] * 100}%`}
                                    >
                                        <button
                                            onClick={() => setSelectedMonths(Number(month))}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors w-full
                                                ${selectedMonths === Number(month)
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-300'
                                                }`}
                                        >
                                            {month}
                                        </button>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="flex-1 border-l pl-6">
                        <div className="bg-gray-200 p-4 rounded-lg mb-4 border-2 border-gray-300 shadow-sm">
                            <p className="text-gray-800">Monthly Payment</p>
                            <p className="text-2xl font-bold text-black">
                                ₱{calculatedResults.monthlyPayment.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-2">
                            {[
                                {
                                    label: 'Remaining Price',
                                    value: calculatedResults.remainingPrice,
                                    borderColor: 'border-gray-300'
                                },
                                {
                                    label: 'Interest Amount',
                                    value: calculatedResults.interestAmount,
                                    borderColor: 'border-gray-300'
                                },
                                {
                                    label: 'Total Amount',
                                    value: calculatedResults.totalAmount,
                                    borderColor: 'border-gray-300'
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`bg-gray-100 p-3 rounded-lg border-2 ${item.borderColor} shadow-sm
                                        hover:shadow-md transition-shadow duration-200`}
                                >
                                    <p className="text-sm text-gray-900">{item.label}</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ₱{item.value.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Installment;
