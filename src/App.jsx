import { useState, useState} from 'react'
import { api_url} from './config.js'


import Header from './components/layout/Header.jsx'
import AuthModal from './components/auth/AuthModal.jsx'
import AddItemForm from './components/items/AddItemForm.jsx'
import ItemList from './components/items/ItemList.jsx'

function App() {
  const [user, setUser] = useState(null) // null | { name, email }
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [items, setItems] = useState([]) // [{ id, title, description, isPublic, owner, createdAt }]

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(api_url + '/items')
        if (!response.ok) {
          throw new Error('Invalid response fetching items.')
        }
        const data = response.json()
        setItems(data)
      } catch (err) {console.error(err)}
    }
    fetchItems()
  }, [])

  // Pri načítaní stránky: zisti, či je používateľ prihlásený, a načítaj itemy.
  // useEffect(() => {
  //   async function loadInitialData() {
  //     const meRes = await fetch(`${API_URL}/api/auth/me`, {
  //       // TODO: auth (cookie alebo token)
  //     })
  //     if (meRes.ok) {
  //       const meData = await meRes.json()
  //       setUser(meData.user)
  //     }
  //
  //     const itemsRes = await fetch(`${API_URL}/api/items`, {
  //       // TODO: auth (cookie alebo token)
  //     })
  //     const itemsData = await itemsRes.json()
  //     setItems(itemsData.items)
  //   }
  //   loadInitialData()
  // }, [])

  async function handleRegister({ name, email, password }) {
    // const res = await fetch(`${API_URL}/api/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   // TODO: auth (cookie alebo token)
    //   body: JSON.stringify({ name, email, password }),
    // })
    // const data = await res.json()
    // if (!res.ok) throw new Error(data.message || 'Registrácia zlyhala.')
    // setUser(data.user)

    // --- SIMULÁCIA (zmaž po napojení backendu) ---
    void password // heslo sa v simulácii nepoužíva (iba kvôli ESLintu)
    setUser({ name, email })
    // --- KONIEC SIMULÁCIE ---

    setIsAuthModalOpen(false)
  }

  async function handleLogin({ email, password }) {
    // const res = await fetch(`${API_URL}/api/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   // TODO: auth (cookie alebo token)
    //   body: JSON.stringify({ email, password }),
    // })
    // const data = await res.json()
    // if (!res.ok) throw new Error(data.message || 'Prihlásenie zlyhalo.')
    // setUser(data.user)

    // --- SIMULÁCIA (zmaž po napojení backendu) ---
    void password // heslo sa v simulácii nepoužíva (iba kvôli ESLintu)
    setUser({ name: email.split('@')[0], email })
    // --- KONIEC SIMULÁCIE ---

    setIsAuthModalOpen(false)
  }

  async function handleLogout() {
    // await fetch(`${API_URL}/api/auth/logout`, {
    //   method: 'POST',
    //   // TODO: auth (cookie alebo token)
    // })

    setUser(null)
  }

  async function handleAddItem({ title, description, isPublic }) {
    
    const response = await fetch(api_url + '/items', {
      'method': 'POST',
      'Content-Type': 'application/json',
      'body': {title, description, isPublic}
    })

    if (!response.ok) {
      throw new Error('Failed creating item')
    }

    const item = await response.json()

    setItems(prev => [item, ...prev])

    // --- SIMULÁCIA (zmaž po napojení backendu) ---
    const newItem = {
      id: crypto.randomUUID(),
      title,
      description,
      isPublic,
      owner: user.email,
      createdAt: new Date().toISOString(),
    }
    setItems((prev) => [newItem, ...prev])
    // --- KONIEC SIMULÁCIE ---
  }

  async function handleDeleteItem(id) {
    // const res = await fetch(`${API_URL}/api/items/${id}`, {
    //   method: 'DELETE',
    //   // TODO: auth (cookie alebo token)
    // })
    // if (!res.ok) {
    //   const data = await res.json()
    //   alert(data.message || 'Zmazanie itemu zlyhalo.')
    //   return
    // }

    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // --- SIMULÁCIA (zmaž po napojení backendu) ---
  // Neprihlásený vidí iba verejné itemy, prihlásený aj svoje súkromné.
  // Toto filtrovanie musí v reálnej appke robiť backend (GET /api/items).
  const visibleItems = items.filter((item) => item.isPublic || item.owner === user?.email)
  // --- KONIEC SIMULÁCIE ---

  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={user} onLoginClick={() => setIsAuthModalOpen(true)} onLogout={handleLogout} />

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[320px_1fr]">
        <aside>
          <AddItemForm user={user} onAddItem={handleAddItem} onLoginClick={() => setIsAuthModalOpen(true)} />
        </aside>

        <ItemList items={visibleItems} user={user} onDeleteItem={handleDeleteItem} />
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  )
}

export default App
