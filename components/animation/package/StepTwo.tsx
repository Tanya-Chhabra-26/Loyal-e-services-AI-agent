'use client';
import React, { useState } from 'react';

const StepTwo = ({ data, onChange, onBack, onSubmit }: any) => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setIsProcessing(true);
        onSubmit();
      }}
    >
      <h2 className="text-xl font-bold text-blue-900">Checkout</h2>

      <input
        type="email"
        placeholder="Email address"
        className="w-full border p-2"
        value={data.email || ''}
        onChange={(e) => onChange('email', e.target.value)}
        required
      />

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-1/2 border p-2"
          value={data.firstName || ''}
          onChange={(e) => onChange('firstName', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-1/2 border p-2"
          value={data.lastName || ''}
          onChange={(e) => onChange('lastName', e.target.value)}
          required
        />
      </div>

      <input
        type="text"
        placeholder="Country"
        className="w-full border p-2"
        value={data.country || ''}
        onChange={(e) => onChange('country', e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Street Address"
        className="w-full border p-2"
        value={data.street || ''}
        onChange={(e) => onChange('street', e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Town / City"
          className="border p-2"
          value={data.city || ''}
          onChange={(e) => onChange('city', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State / County"
          className="border p-2"
          value={data.state || ''}
          onChange={(e) => onChange('state', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Postcode / ZIP"
          className="border p-2"
          value={data.zip || ''}
          onChange={(e) => onChange('zip', e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          className="border p-2"
          value={data.phone || ''}
          onChange={(e) => onChange('phone', e.target.value)}
          required
        />
      </div>

      <textarea
        placeholder="Order Note (optional)"
        className="w-full border p-2"
        value={data.order_note || ''}
        onChange={(e) => onChange('order_note', e.target.value)}
      />

      <div className="pt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
          disabled={isProcessing}
        >
          Back
        </button>
        <button
          type="submit"
          className={`bg-green-700 text-white px-6 py-2 rounded ${isProcessing ? 'opacity-70 cursor-wait' : 'cursor-pointer'
            }`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
};

export default StepTwo;
