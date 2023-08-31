import "./App.css"

interface Product {
    category: string
    price: string
    stocked: boolean
    name: string
}

const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan={2}>{category}</th>
        </tr>
    )
}

function SearcBar() {
    return <></>
}

function ProductTable({ products }) {
    return <></>
}

function FilterableProductTable({ products }: { products: Product[] }) {
    return (
        <div>
            <SearcBar />
            <ProductTable products={products} />
        </div>
    )
}

function App() {
    return <FilterableProductTable products={products} />
}

export default App
