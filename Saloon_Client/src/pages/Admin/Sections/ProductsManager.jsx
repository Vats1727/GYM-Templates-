import React from 'react';
import GenericManager from '../../../components/Admin/GenericManager';

export default function ProductsManager() {
  const fields = [
    {
      "key": "badge",
      "label": "Product Promo Tag (e.g. BEST SELLER, NEW, ORGANIC)",
      "type": "text"
    },
    {
      "key": "name",
      "label": "Product Name & Brand (e.g. Oribe Gold Lust Shampoo)",
      "type": "text"
    },
    {
      "key": "volume",
      "label": "Fluid Volume (e.g. 250ml / 8.5 fl. oz.)",
      "type": "text"
    },
    {
      "key": "price",
      "label": "Store Price (e.g. $49.00)",
      "type": "text"
    },
    {
      "key": "desc",
      "label": "Product Benefits Description",
      "type": "textarea"
    },
    {
      "key": "rating",
      "label": "Average Product Rating",
      "type": "stars"
    },
    {
      "key": "image",
      "label": "Product Packaging Image",
      "type": "image"
    }
  ];

  return (
    <GenericManager 
      title="In-Studio Shop Products Manager" 
      tableKey="products" 
      headingSlug="products_heading"
      fields={fields} 
    />
  );
}
