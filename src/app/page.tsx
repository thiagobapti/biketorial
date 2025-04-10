"use client";

import Image from "next/image";
import "./page.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const block = "page";

type Category = {
  id: string;
  label: string;
};

type Part = {
  id: string;
  label: string;
  category: Category;
  regular_price: number;
  discount_price: number;
};

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, partsResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/parts"),
        ]);

        const categoriesData = await categoriesResponse.json();
        const partsData = await partsResponse.json();

        setCategories(categoriesData);
        setParts(partsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={block}>
      Biketorial
      <Link href="/builder">Builder</Link>
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          {category.label}
        </Link>
      ))}
      {parts.map((part) => (
        <div className={`${block}__part`} key={part.id}>
          {part.category.label}
          <br />
          {part.label}
          <br />
          <span
            style={{
              textDecoration: part.discount_price ? "line-through" : "",
            }}
          >
            {part.regular_price}
          </span>
          {part.discount_price && ` / ${part.discount_price}`}
        </div>
      ))}
    </div>
  );
}
