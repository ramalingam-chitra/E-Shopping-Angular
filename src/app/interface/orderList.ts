export interface Order {
    "id": string,
    "customer-id": string,
    "items": [
      {
        "product-id": string,
        "quantity": string,
        "unit-price": string,
        "total": string
      }
    ],
    "total": string
  }