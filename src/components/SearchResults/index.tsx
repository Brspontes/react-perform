import ProductItem from "../ProductItem"

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    title: string
  }>
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div>
      {results.map(item => {
        return (
          <ProductItem key={item.id} product={item} />
        )
      })}
    </div>
  )
}
