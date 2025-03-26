## 1. Products Collection
Stores product details, categories, stock, and if out of stock.

```json
{
    "_id" :"ObjectId",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "stock": "number",
    "outOfStock": "boolean",
    "createdAt": "Date",
    "updatedAt": "Date"
}
```

## 2. Users Collection
Stores user details

```json
{
    "_id" :"ObjectId",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "role": "string",  // "user" or "admin"
    "cart": [
        {
        "productId": "ObjectId",
        "quantity": "number"
        }
    ],
    "createdAt": "Date",
    "updatedAt": "Date"
}
```

## 3. Orders Collection
Stores user order history

```json
{
    "_id" :"ObjectId",
    "userId": "ObjectId",
    "items": [
        {
        "productId": "ObjectId",
        "quantity": "number"
        }
    ],
    "totalAmount": "number",
    "createdAt": "Date",
    "updatedAt": "Date"
}
```
