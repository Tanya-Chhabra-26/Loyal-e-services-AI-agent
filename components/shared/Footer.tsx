
export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 text-sm">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
        {/* Left Column */}
        <div className="pr-4  md:text-left">
          <p>
            The patented production process our innovative team deploys leads to 99.7% customer satisfaction rates and the fastest delivery times in the industry.
          </p>
        </div>

        {/* Center Column */}
        <div className="border-b md:border-b-0 pb-6 md:pb-0 md:border-r md:border-l border-gray-600 px-4 grid grid-cols-2 gap-2">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a>
        </div>

        {/* Right Column */}
        <div className="pl-4">
          <p>Copyright ©2025 – Loyal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}