import { ReactNode, useState } from "react"
import "./App.css"

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

interface Product {
    category: string
    price: string
    stocked: boolean
    name: string
}

function FilterableProductTable({ products }: { products: Product[] }) {
    const [filterText, setFilterText] = useState("")
    const [inStockOnly, setInStockOnly] = useState(false)

    return (
        <div className="container">
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
    )
}

function ProductCategoryRow({ category }: { category: string }) {
    return (
        <tr>
            <th colSpan={2}>{category}</th>
        </tr>
    )
}

function ProductRow({ product }: { product: Product }) {
    const name = product.stocked ? product.name : <span style={{ color: "red" }}>{product.name}</span>

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

interface ProductTableProps {
    products: Product[]
    filterText: string
    inStockOnly: boolean
}

function ProductTable(props: ProductTableProps) {
    const { products, filterText, inStockOnly } = props
    const rows: ReactNode[] = []
    let lastCategory: string | null = null

    products.forEach(product => {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return
        }
        if (inStockOnly && !product.stocked) {
            return
        }
        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
        }
        rows.push(<ProductRow product={product} key={product.name} />)
        lastCategory = product.category
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

interface SearchBarProps {
    filterText: string
    inStockOnly: boolean
    onFilterTextChange: (e: string) => void
    onInStockOnlyChange: (e: boolean) => void
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }: SearchBarProps) {
    return (
        <form className="search-bar">
            <input type="text" value={filterText} placeholder="Search..." onChange={e => onFilterTextChange(e.target.value)} />
            <label>
                <input type="checkbox" checked={inStockOnly} onChange={e => onInStockOnlyChange(e.target.checked)}/>
                仅展示库存里的商品
            </label>
        </form>
    )
}

export default function App() {
    return <FilterableProductTable products={PRODUCTS}/>
}
