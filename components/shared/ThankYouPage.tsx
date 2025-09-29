import React from 'react';

interface ThankYouProps {
    show: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const ThankYou: React.FC<ThankYouProps> = ({ show, onClose, title, description }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border-t-4 border-yellow-400 relative">
                <div className="flex justify-center items-center mb-4">
                    <div className="border-4 border-blue-900 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-blue-900 text-center">{title}</h2>
                <p className="text-center text-gray-700 mt-2">{description}</p>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-yellow-400 transition-all"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
