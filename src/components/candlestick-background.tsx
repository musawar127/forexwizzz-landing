"use client";

export function CandlestickBackground() {
  const candles = [
    { x: 10, h: 40, o: 20, c: 50, green: true },
    { x: 40, h: 55, o: 45, c: 25, green: false },
    { x: 70, h: 35, o: 30, c: 60, green: true },
    { x: 100, h: 50, o: 55, c: 20, green: false },
    { x: 130, h: 45, o: 15, c: 55, green: true },
    { x: 160, h: 60, o: 50, c: 30, green: false },
    { x: 190, h: 38, o: 25, c: 58, green: true },
    { x: 220, h: 52, o: 48, c: 18, green: false },
    { x: 250, h: 42, o: 20, c: 56, green: true },
    { x: 280, h: 48, o: 52, c: 22, green: false },
    { x: 310, h: 36, o: 28, c: 60, green: true },
    { x: 340, h: 55, o: 50, c: 28, green: false },
    { x: 370, h: 40, o: 22, c: 54, green: true },
    { x: 400, h: 50, o: 46, c: 24, green: false },
    { x: 430, h: 44, o: 18, c: 58, green: true },
    { x: 460, h: 58, o: 52, c: 26, green: false },
    { x: 490, h: 34, o: 30, c: 62, green: true },
    { x: 520, h: 46, o: 42, c: 20, green: false },
    { x: 550, h: 38, o: 24, c: 56, green: true },
    { x: 580, h: 52, o: 48, c: 30, green: false },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 600 80"
      >
        {candles.map((c, i) => (
          <g key={i} style={{ animationDelay: `${i * 0.2}s` }} className="animate-candlestick">
            {/* Wick */}
            <line
              x1={c.x + 6}
              y1={80 - c.h - 10}
              x2={c.x + 6}
              y2={80 - c.h + 30}
              stroke={c.green ? "#00e676" : "#ff1744"}
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Body */}
            <rect
              x={c.x}
              y={80 - Math.max(c.o, c.c)}
              width={12}
              height={Math.abs(c.c - c.o) || 4}
              fill={c.green ? "#00e676" : "#ff1744"}
              opacity={0.7}
              rx={1}
            />
          </g>
        ))}
        {/* Grid lines */}
        {[20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="600"
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={0.5}
          />
        ))}
      </svg>
    </div>
  );
}
