import { useState } from 'react'

function AddItemForm({ user, onAddItem, onLoginClick }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isDisabled = !user || isSubmitting

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!user) {
      setError('Pre pridanie itemu sa musíš prihlásiť.')
      return
    }
    if (!title.trim()) {
      setError('Názov je povinný.')
      return
    }

    setIsSubmitting(true)
    try {
      await onAddItem({ title: title.trim(), description: description.trim(), isPublic })
      setTitle('')
      setDescription('')
      setIsPublic(true)
    } catch (err) {
      setError(err.message || 'Pridanie itemu zlyhalo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">Nový item</h2>

      {!user && (
        <div className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Pre pridanie itemu sa musíš{' '}
          <button
            type="button"
            onClick={onLoginClick}
            className="font-medium underline hover:text-amber-900"
          >
            prihlásiť
          </button>
          .
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="item-title" className="text-sm font-medium text-slate-700">
            Názov
          </label>
          <input
            id="item-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="item-description" className="text-sm font-medium text-slate-700">
            Popis
          </label>
          <textarea
            id="item-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-y rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="size-4 accent-indigo-600"
          />
          Verejný (uvidia ho všetci)
        </label>

        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Pridávam…' : 'Pridať item'}
        </button>
      </form>
    </section>
  )
}

export default AddItemForm
