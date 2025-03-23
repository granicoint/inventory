import "./index.css";
import React, { useEffect, useState } from "react";

export default function App() {
    const [product, setProduct] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        !!product.length && localStorage.setItem("product", JSON.stringify(product));
    }, [product]);

    useEffect(() => {
        const storedProduct = localStorage.getItem("product");
        const storedInventory = localStorage.getItem("inventory");
        setProduct(storedProduct ? JSON.parse(storedProduct) : []);
        setInventory(storedInventory ? JSON.parse(storedInventory) : []);
    }, []);

    useEffect(() => {
        !!inventory.length && localStorage.setItem("inventory", JSON.stringify(inventory));
    }, [inventory]);

    const handleAddProduct = () => {
        setProduct((prevState) => [...prevState, { name: inputs.name, size: [] }]);
        setInputs({});
    };

    const handleAddSize = () => {
        setProduct((prevState) => {
            return prevState.map((el) => {
                if (el.name === inputs.selectedProduct) {
                    return {
                        ...el,
                        size: [...el.size, inputs.size],
                    };
                }
                return el;
            });
        });
        setInputs((prev) => ({ ...prev, size: "" }));
    };

    const handleInventory = (type) => {
        setInventory((prevState) => {
            const existingItemIndex = prevState.findIndex((item) => item.product === inputs.selectedProduct && item.size === inputs.selectedSize);

            if (existingItemIndex !== -1) {
                return prevState.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: type === "add" ? Number(item.quantity) + Number(inputs.quantity) : Number(item.quantity) - Number(inputs.quantity) }
                        : item
                );
            } else {
                return [
                    ...prevState,
                    {
                        product: inputs.selectedProduct,
                        size: inputs.selectedSize,
                        quantity: inputs.quantity,
                    },
                ];
            }
        });

        setInputs((prev) => ({ ...prev, quantity: "" }));
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700 drop-shadow-sm">Product Inventory System</h1>

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-indigo-200">
                    <div className="flex flex-row gap-4">
                        <div>
                            <label htmlFor="Name" className="block text-sm font-medium text-indigo-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                className="border-2 border-indigo-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Name"
                                onChange={(e) => setInputs((prevState) => ({ ...prevState, name: e.target.value }))}
                                value={inputs.name || ""}
                            />
                        </div>
                        <button
                            className="border border-indigo-400 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-neutral-800 font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md self-end"
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </button>
                    </div>

                    <div className="flex flex-row gap-4 mt-4">
                        <select
                            onChange={(e) => setInputs((prevState) => ({ ...prevState, selectedProduct: e.target.value }))}
                            className="border-2 border-indigo-300 px-3 py-1 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-indigo-800"
                        >
                            <option value="" disabled selected>
                                Select Product
                            </option>
                            {product.map((el) => (
                                <option key={el.name} value={el.name}>
                                    {el.name}
                                </option>
                            ))}
                        </select>

                        <div>
                            <label htmlFor="Size" className="block text-sm font-medium text-indigo-700 mb-1">
                                Size
                            </label>
                            <input
                                type="text"
                                className="border-2 border-indigo-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Size"
                                onChange={(e) => setInputs((prevState) => ({ ...prevState, size: e.target.value }))}
                                value={inputs.size || ""}
                            />
                        </div>
                        <button
                            className="border border-indigo-400 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-neutral-800 font-medium hover:from-blue-600 hover:to-cyan-700 transition-all shadow-md self-end"
                            onClick={handleAddSize}
                        >
                            Add Size
                        </button>
                    </div>

                    {inputs.selectedProduct && (
                        <div className="flex flex-row gap-4 mt-4">
                            <select
                                onChange={(e) => setInputs((prevState) => ({ ...prevState, selectedSize: e.target.value }))}
                                className="border-2 border-indigo-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-indigo-800"
                            >
                                <option value="" disabled selected>
                                    Select Size
                                </option>
                                {product
                                    .find((p) => p.name === inputs.selectedProduct)
                                    ?.size.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}

                    {inputs.selectedProduct && inputs.selectedSize && (
                        <div className="flex flex-row gap-4 mt-4">
                            <div>
                                <label htmlFor="Quantity" className="block text-sm font-medium text-indigo-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    className="border-2 border-indigo-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Quantity"
                                    onChange={(e) => setInputs((prevState) => ({ ...prevState, quantity: e.target.value }))}
                                    value={inputs.quantity || ""}
                                />
                            </div>

                            <button
                                className="border border-emerald-400 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-neutral-800 font-medium hover:from-emerald-600 hover:to-green-700 transition-all shadow-md self-end"
                                onClick={() => handleInventory("add")}
                            >
                                Add to Inventory
                            </button>

                            <button
                                className="border border-rose-400 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-neutral-800 font-medium hover:from-rose-600 hover:to-red-700 transition-all shadow-md self-end"
                                onClick={() => handleInventory("remove")}
                            >
                                Remove from Inventory
                            </button>
                        </div>
                    )}
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-200">
                    <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">Inventory List</h3>
                    {inventory.length === 0 ? (
                        <p className="text-gray-500 italic">No items in inventory yet</p>
                    ) : (
                        <ul className="space-y-2">
                            {inventory.map((item, index) => (
                                <li key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100 flex justify-between">
                                    <span className="font-medium text-indigo-800">{item.product}</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">{item.size}</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm">{item.quantity} pcs</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>{" "}
        </>
    );
}
