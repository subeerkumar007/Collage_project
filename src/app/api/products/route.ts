import { NextResponse } from "next/server";
import { products } from "../../../lib/products"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, unit, category, images } = body;

    if (!name || !price || !unit || !category || !images?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

   
    const newProduct = {
      id: Date.now().toString(),
      name: String(name),
      description: String(description || ""),
      price: Number(price),
      unit: String(unit || ""),
      image: Array.isArray(images) && images.length ? String(images[0]) : "",
      category: String(category),
    };

 
    products.push(newProduct as any);

    return NextResponse.json(
      { message: "Product created", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
