'use client';

import { useState } from 'react';
import Button from '../ui/button';
import Image from 'next/image';

const godaddyResellerCartURL = 'https://www.secureserver.net/dpx/registration?pl_id=596234';

export default function DomainSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<
        { domain: string; available: boolean; price: number }[]
    >([]);
    const [selected, setSelected] = useState<Record<string, boolean>>({});

    const searchDomains = async () => {
        if (!query.trim()) return;

        try {
            const res = await fetch(`/api/check-domain?search=${query}`);
            const data = await res.json();
            setResults(data.domains || []);
        } catch (err) {
            console.error('Domain search failed:', err);
        }
    };

    const handleSelect = (domain: string) => {
        setSelected((prev) => ({
            ...prev,
            [domain]: !prev[domain],
        }));
    };

    const handleProceed = () => {
        const selectedDomains = Object.keys(selected).filter((d) => selected[d]);
        if (selectedDomains.length === 0) return;

        const domainsParam = selectedDomains
            .map((d) => `domainToCheck=${encodeURIComponent(d)}`)
            .join('&');

        window.open(`${godaddyResellerCartURL}&${domainsParam}`, '_blank');
    };

    const selectedCount = Object.values(selected).filter(Boolean).length;

    return (
        <div className="mt-6 flex flex-col items-center justify-center">
            <div className="flex w-full max-w-3xl rounded-md shadow-md border p-3 items-center bg-white">
                <div className="relative flex-1">
                    <Image
                        src="/domains/globe-search.svg"
                        alt="Search Icon"
                        width={24}
                        height={24}
                        className="absolute left-0 top-1/2 -translate-y-1/2"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type your domain address"
                        className="w-full pl-10 pr-4 focus:outline-none"
                    />
                </div>
                <div className="gap-4 hidden md:flex">
                    <Button variant="secondary" onClick={searchDomains}>Search</Button>
                    <Button variant="primary" href="/domains/all-domains">View All Pricing</Button>
                </div>
            </div>

            <div className="flex gap-4 md:hidden mt-3">
                <Button variant="secondary" onClick={searchDomains}>Search</Button>
                <Button variant="primary" href="/domains/all-domains">View All Pricing</Button>
            </div>

            {results.length > 0 && (
                <div className="border p-4 rounded w-full max-w-3xl mt-6">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <p className="text-sm font-semibold">Selected Domains: {selectedCount}</p>
                        <Button variant="primary" onClick={handleProceed}>Proceed to Cart</Button>
                    </div>
                    <div className="space-y-4">
                        {results.map(({ domain, available, price }) => (
                            <div key={domain} className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <p className="font-medium">{domain}</p>
                                    <p className="text-sm text-gray-500">
                                        {available ? `Available — ₹${price > 0 ? price : 'N/A'}` : 'Not Available'}
                                    </p>
                                </div>
                                {available && (
                                    <Button
                                        variant={selected[domain] ? 'secondary' : 'primary'}
                                        onClick={() => handleSelect(domain)}
                                    >
                                        {selected[domain] ? 'Selected' : 'Select'}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
