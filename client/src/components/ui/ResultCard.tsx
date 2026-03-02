function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-900 p-6">
      <p className="text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

export default ResultCard;
