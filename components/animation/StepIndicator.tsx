'use client';

import React from 'react';

export default function StepIndicator({
    currentStep = 1,          // 1‑based index coming from parent
    className,
}: {
    currentStep: number;
    className?: string;
}) {
    const steps = [
        { id: 1, label: 'Type of animation' },
        { id: 2, label: 'Budget' },
        { id: 3, label: 'Details' },
        { id: 4, label: 'Contact' },
    ];

    return (
        <div className={`max-w-5xl mx-auto ${className ?? ''}`}>
            <ol className="flex items-center w-full text-xs sm:text-base font-medium">
                {steps.map((step, index) => {
                    const status =
                        index + 1 < currentStep
                            ? 'complete'
                            : index + 1 === currentStep
                                ? 'active'
                                : 'upcoming';

                    /* Tailwind variants for each state */
                    const liCls = [
                        'flex w-full relative',
                        index !== steps.length - 1
                            ? "after:content-[''] after:w-full after:h-2 after:inline-block after:absolute lg:after:top-10 after:top-3 after:left-4"
                            : '',
                        status === 'complete'
                            ? 'text-blue-900 after:bg-blue-900'
                            : status === 'active'
                                ? 'text-blue-900 after:bg-gray-300'
                                : 'text-gray-400 after:bg-gray-300',
                    ].join(' ');

                    const circleCls = [
                        'w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center rounded-full  mt-2 text-sm lg:text-base font-semibold border-2',
                        status === 'complete'
                            ? 'bg-blue-900 text-white border-transparent'
                            : status === 'active'
                                ? 'bg-white text-blue-900 border-blue-900'
                                : 'bg-gray-200 text-gray-400 border-gray-300',
                    ].join(' ');

                    return (
                        <li key={step.id} className={liCls}>
                            <div className="block whitespace-nowrap z-10">
                                {step.label}
                                <span className={circleCls}>{step.id}</span>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
