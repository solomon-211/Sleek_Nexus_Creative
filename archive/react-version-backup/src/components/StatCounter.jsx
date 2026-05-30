import { useCountUp } from '../hooks/useCountUp';

export default function StatCounter({ icon, count, label, suffix = '' }) {
  const { ref, count: animated } = useCountUp(count);
  return (
    <div className="text-center text-white">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4 mx-auto">
        <i className={`fas ${icon}`} style={{ fontSize: '1.5rem', color: '#ff8c42' }} />
      </div>
      <span ref={ref} className="block text-4xl font-extrabold mb-1">
        {animated.toLocaleString()}{suffix}
      </span>
      <span className="text-gray-400 text-sm">{label}</span>
    </div>
  );
}
