interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  badge?: 'new' | 'hot';
}

interface Props extends ProductCardProps {}
function ProductCard({ title, price, image, badge }: Props) {
  return (
    <div className="group relative w-64 flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-slate-900 transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      {badge && (
        <div
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${
            badge === 'new' ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        >
          {badge}
        </div>
      )}
      <div className="p-4">
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-cyan-400">{price}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition duration-300 group-hover:translate-y-0">
        <button className="w-full rounded-xl bg-cyan-500 py-2 font-semibold text-white transition hover:bg-cyan-400">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
