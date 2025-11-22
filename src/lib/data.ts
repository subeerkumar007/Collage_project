export interface Category { slug: string; name: string; }
export interface Product { id: string; name: string; description: string; price: number; unit: string; image: string; category: string; }

export const categories: Category[] = [
  { slug: 'fruits', name: 'Fresh Fruits' },
  { slug: 'vegetables', name: 'Vegetables' },
  { slug: 'dairy', name: 'Dairy & Eggs' },
  { slug: 'bakery', name: 'Bakery' },
  { slug: 'beverages', name: 'Beverages' },
  { slug: 'snacks', name: 'Snacks' },
  { slug: 'personal-care', name: 'Personal Care' },
  { slug: 'household', name: 'Household' }
];


export const products: Product[] = [
  { id: 'apple', name: 'Red Apples', description: 'Crisp and juicy seasonal apples.', price: 120, unit: '1 kg', image: 'https://res.cloudinary.com/dehccrol4/image/upload/v1763832952/apple-colorful-vector-design_341269-1123_af1e0a.jpg', category: 'fruits' },
  { id: 'banana', name: 'Bananas', description: 'Ripe yellow bananas rich in potassium.', price: 60, unit: '1 dozen', image: 'https://res.cloudinary.com/dehccrol4/image/upload/v1763831001/Standrad_Banana_WAnKgF3_eb7f7l.jpg', category: 'fruits' },
  { id: 'tomato', name: 'Tomatoes', description: 'Fresh red tomatoes perfect for salads.', price: 40, unit: '500 g', image: 'https://res.cloudinary.com/dehccrol4/image/upload/v1763833983/360_F_85799278_0BBGV9OAdQDTLnKwAPBCcg1J7QtiieJY_ekod71.jpg', category: 'vegetables' },
  { id: 'potato', name: 'Potatoes', description: 'Staple kitchen vegetable.', price: 30, unit: '1 kg', image: 'https://res.cloudinary.com/dehccrol4/image/upload/v1763833980/red-tomato-with-green-leaf-it_1104560-2331_snxy7n.jpg', category: 'vegetables' },
  { id: 'milk', name: 'Whole Milk', description: 'Pasteurized fresh dairy milk.', price: 70, unit: '1 L', image: '', category: 'dairy' },
  { id: 'bread', name: 'Whole Wheat Bread', description: 'Soft and healthy bread loaf.', price: 45, unit: '400 g', image: '', category: 'bakery' },
  { id: 'chips', name: 'Potato Chips', description: 'Crunchy salted chips.', price: 20, unit: '1 pack', image: '', category: 'snacks' },
  { id: 'cola', name: 'Cola Drink', description: 'Refreshing carbonated beverage.', price: 40, unit: '500 ml', image: '', category: 'beverages' },
  { id: 'soap', name: 'Herbal Soap', description: 'Gentle cleansing soap bar.', price: 30, unit: '100 g', image: '', category: 'personal-care' },
  { id: 'detergent', name: 'Laundry Detergent', description: 'Effective stain removal formula.', price: 180, unit: '1 kg', image: '', category: 'household' }
];
