"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const openWidget = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        multiple: true,
        maxFiles: 10,
        folder: "ecommerce-products",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setImages((prev) => [...prev, result.info.secure_url]);
        }
      }
    );
    widget.open();
  };

  const submitHandler = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        category,
        images,
      }),
    });
    const data = await res.json();
    console.log(data);
    alert("Product Created!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Product</h1>

      <input
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={openWidget}>Upload Images</button>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
        {images.map((url) => (
          <img key={url} src={url} width={110} />
        ))}
      </div>

      <button onClick={submitHandler}>Submit Product</button>
    </div>
  );
}
