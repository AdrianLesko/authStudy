import { useEffect, useRef, useState } from 'react'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'

// Safari zatiaľ nepodporuje <dialog closedby="any">, preto zatvorenie klikom mimo riešime ručne.
const supportsClosedBy = typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype

function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const dialogRef = useRef(null)
  const [mode, setMode] = useState('login') // 'login' | 'register'

  // Synchronizácia React stavu s natívnym <dialog>.
  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && !dialog.open) {
      dialog.showModal()
      dialog.querySelector('input')?.focus()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  function handleClose() {
    setMode('login')
    onClose()
  }

  function handleBackdropClick(e) {
    if (supportsClosedBy || e.target !== dialogRef.current) return
    const rect = dialogRef.current.getBoundingClientRect()
    const isInside =
      e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
    if (!isInside) dialogRef.current.close()
  }

  const tabClass = (active) =>
    `flex-1 rounded-md px-3 py-2 text-sm font-medium ${
      active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="auth-modal-title"
      onClose={handleClose}
      onClick={handleBackdropClick}
      className="m-auto w-full max-w-md rounded-lg bg-white p-6 shadow-xl backdrop:bg-slate-900/50"
    >
      {isOpen && (
        <div className="relative">
          <h2 id="auth-modal-title" className="mb-4 text-lg font-semibold text-slate-900">
            {mode === 'login' ? 'Prihlásenie' : 'Registrácia'}
          </h2>

          <div className="mb-5 flex gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              aria-pressed={mode === 'login'}
              onClick={() => setMode('login')}
              className={tabClass(mode === 'login')}
            >
              Prihlásenie
            </button>
            <button
              type="button"
              aria-pressed={mode === 'register'}
              onClick={() => setMode('register')}
              className={tabClass(mode === 'register')}
            >
              Registrácia
            </button>
          </div>

          {mode === 'login' ? <LoginForm onLogin={onLogin} /> : <RegisterForm onRegister={onRegister} />}

          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Zavrieť"
            className="absolute -top-2 -right-2 rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
      )}
    </dialog>
  )
}

export default AuthModal
