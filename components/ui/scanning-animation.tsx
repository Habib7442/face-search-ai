export function ScanningAnimation() {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-transparent animate-scan" />
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-0 border-4 border-blue-500/50 scanning-box rounded-lg" />
      </div>
    );
  }