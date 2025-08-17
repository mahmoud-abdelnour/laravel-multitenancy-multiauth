import { Link } from "@inertiajs/react";
import FlashMessage from "../components/FlashMessage";

type Product = {
  id: number;
  name: string;
  price: number;
};

type IndexProps = {
  products: Product[];
  flash: any;
};

export default function Index({ products, flash }: IndexProps) {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <FlashMessage flash={flash} />
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <Link href={route("products.create")} className="bg-blue-500 text-white px-3 py-1 rounded mb-4 inline-block">Add Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id} className="mb-2 flex justify-between items-center">
            <span>{product.name} - ${product.price}</span>
            <Link href={route("products.edit", product.id)} className="text-green-600 hover:underline">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}