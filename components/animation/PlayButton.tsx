import Image from 'next/image';

export default function PlayButton() {
    return (
        <>
            <style jsx>{`
        @keyframes pulse-yellow {
            0% {
                transform: scale(0.8);
                box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7);
            }

            70% {
                transform: scale(1);
                box-shadow: 0 0 0 60px rgba(229, 62, 62, 0);
            }

            100% {
                transform: scale(0.8);
            }
        }
        .pulse-yellow {
          animation: pulse-yellow 2s infinite;
        }
      `}</style>

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-yellow-400 pulse-yellow">
                <Image
                    src="/animation/play.svg"
                    alt="play-btn"
                    width={16}
                    height={16}
                />
            </div>
        </>
    );
}