import type { Product } from '../lib/data/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {product.category.replace('-', ' ')}
        </span>
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-600">{product.description}</p>
      </div>
      <ul className="mt-auto space-y-2 text-sm text-slate-600">
        {product.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
