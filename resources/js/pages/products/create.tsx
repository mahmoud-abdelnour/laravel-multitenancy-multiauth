import { useForm } from "@inertiajs/react";
import FlashMessage from "../components/FlashMessage";

interface CreateProps {
  flash: any; // Replace 'any' with a more specific type if available
}

export default function Create({ flash }: CreateProps) {
  const { data, setData, post, processing, errors } = useForm({ name: "", price: "" });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    post(route("products.store"));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <FlashMessage flash={flash} />
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="border px-3 py-2 w-full rounded"
            value={data.name}
            onChange={e => setData("name", e.target.value)}
            required
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            className="border px-3 py-2 w-full rounded"
            type="number"
            step="0.01"
            value={data.price}
            onChange={e => setData("price", e.target.value)}
            required
          />
          {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={processing}
        >
          Create
        </button>
      </form>
    </div>
  );
}