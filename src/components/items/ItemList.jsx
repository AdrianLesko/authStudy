import ItemCard from './ItemCard.jsx'

function ItemList({ items, user, onDeleteItem }) {
  return (
    <section>
      <h2 className="mb-4 text-base font-semibold text-slate-900">Itemy ({items.length})</h2>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          Zatiaľ tu nie sú žiadne itemy.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              // Iba vizuálna kontrola, skutočnú autorizáciu musí urobiť backend.
              canDelete={Boolean(user) && item.owner === user.email}
              onDelete={onDeleteItem}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default ItemList
