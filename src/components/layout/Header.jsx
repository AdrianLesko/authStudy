function Header({ user, onLoginClick, onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <h1 className="text-lg font-semibold text-slate-900">Auth Dashboard</h1>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Prihlásený ako <strong className="text-slate-900">{user.email}</strong>
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Odhlásiť
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Prihlásiť
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
