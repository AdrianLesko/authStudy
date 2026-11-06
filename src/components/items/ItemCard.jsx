function ItemCard({ item, canDelete, onDelete }) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-slate-900">{item.title}</h3>
            <span
              className={
                item.isPublic
                  ? 'rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700'
                  : 'rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700'
              }
            >
              {item.isPublic ? 'Verejný' : 'Súkromný'}
            </span>
          </div>

          {item.description && (
            <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{item.description}</p>
          )}

          <p className="mt-2 text-xs text-slate-400">
            {item.owner} · {new Date(item.createdAt).toLocaleString('sk-SK')}
          </p>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="shrink-0 rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Zmazať
          </button>
        )}
      </div>
    </li>
  )
}

export default ItemCard
