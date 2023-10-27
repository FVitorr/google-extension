interface ItemInterface {
  index: any;
  title: string;
  price_calc: any;
  review: string;
  rating: string;
  link: string;
}

export function Item({
  index,
  link,
  price_calc,
  rating,
  title,
  review,
}: ItemInterface) {
  return (
    <div
      className="p-4 flex flex-col items-start  bg-zinc-900 rounded-md gap-2 mb-2"
      key={index}
    >
      <p className="text-sm font-bold">{title}</p>
      <div className="flex gap-4 font-semibold text-xs">
        <p className="text-green-600 font-bold text-xs">{price_calc}</p>
        <p>{rating}</p>
        <p>{review}</p>
      </div>
      <a
        className="bg-blue-600 text-center p-[2px] w-auto rounded-sm hover:bg-emerald-500 transition-all"
        href={link}
      >
        Visitar produto
      </a>
    </div>
  );
}
