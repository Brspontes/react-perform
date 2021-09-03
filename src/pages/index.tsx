import { FormEvent, useCallback, useState } from 'react'
import SearchResults from '../components/SearchResults'

interface Results {
  totalPrice: number
  data: any[]
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0
  })

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) return

    const response = await fetch(`http://localhost:3333/products?q=${search}`)

    const data = await response.json()


    const products = data.map(response => {
      return {
        id: response.id,
        title: response.title,
        price: response.price,
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(response.price)
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0)

    setResults({totalPrice, data: products})
  }

  const onAddWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults onAddWishList={onAddWishList} results={results.data} totalPrice={results.totalPrice} />
    </div>
  )
}
