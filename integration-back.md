# API Documentation - HouseShower Backend

## Base Configuration

**Base URL**: `/api/`
**Content-Type**: `application/json`
**CORS**: Enabled (configured in production)
**Pagination**: 10 items per page

---

## Model: Producto

### Fields Schema
```typescript
{
  id: number;                    // Auto-generated (read-only)
  title: string;                 // Required, max 255 chars
  image: string;                 // Required, valid URL
  url: string;                   // Required, valid URL
  email: string | null;          // Optional, valid email format
  isReserved: boolean;           // Auto-calculated (read-only)
  created_at: string;            // ISO datetime (read-only)
  updated_at: string;            // ISO datetime (read-only)
}
```

### Business Logic
- `isReserved` is automatically set to `true` if `email` is provided
- `isReserved` is `false` if `email` is `null` or empty
- Products are ordered by `created_at` descending

---

## CRUD Endpoints

### 1. LIST - Get All Products
**GET** `/api/productos/`

**Response 200**:
```json
{
  "count": 25,
  "next": "http://api/productos/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Product Name",
      "image": "https://example.com/image.jpg",
      "url": "https://example.com/product",
      "email": "user@example.com",
      "isReserved": true,
      "created_at": "2025-11-23T10:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    }
  ]
}
```

### 2. RETRIEVE - Get Single Product
**GET** `/api/productos/{id}/`

**Response 200**:
```json
{
  "id": 1,
  "title": "Product Name",
  "image": "https://example.com/image.jpg",
  "url": "https://example.com/product",
  "email": "user@example.com",
  "isReserved": true,
  "created_at": "2025-11-23T10:00:00Z",
  "updated_at": "2025-11-23T10:00:00Z"
}
```

**Response 404**:
```json
{
  "detail": "Not found."
}
```

### 3. CREATE - Add New Product
**POST** `/api/productos/`

**Request Body**:
```json
{
  "title": "New Product",
  "image": "https://example.com/new-image.jpg",
  "url": "https://example.com/new-product",
  "email": "buyer@example.com"
}
```

**Response 201**:
```json
{
  "id": 2,
  "title": "New Product",
  "image": "https://example.com/new-image.jpg",
  "url": "https://example.com/new-product",
  "email": "buyer@example.com",
  "isReserved": true,
  "created_at": "2025-11-23T11:00:00Z",
  "updated_at": "2025-11-23T11:00:00Z"
}
```

**Validation Errors (400)**:
```json
{
  "title": ["El título no puede estar vacío"],
  "image": ["Enter a valid URL."],
  "email": ["Enter a valid email address."]
}
```

### 4. UPDATE (Full) - Replace Product
**PUT** `/api/productos/{id}/`

**Request Body** (all fields required):
```json
{
  "title": "Updated Product",
  "image": "https://example.com/updated-image.jpg",
  "url": "https://example.com/updated-product",
  "email": null
}
```

**Response 200**:
```json
{
  "id": 1,
  "title": "Updated Product",
  "image": "https://example.com/updated-image.jpg",
  "url": "https://example.com/updated-product",
  "email": null,
  "isReserved": false,
  "created_at": "2025-11-23T10:00:00Z",
  "updated_at": "2025-11-23T12:00:00Z"
}
```

### 5. PARTIAL UPDATE - Modify Specific Fields
**PATCH** `/api/productos/{id}/`

**Request Body** (only fields to update):
```json
{
  "email": "newemail@example.com"
}
```

**Response 200**:
```json
{
  "id": 1,
  "title": "Product Name",
  "image": "https://example.com/image.jpg",
  "url": "https://example.com/product",
  "email": "newemail@example.com",
  "isReserved": true,
  "created_at": "2025-11-23T10:00:00Z",
  "updated_at": "2025-11-23T12:30:00Z"
}
```

### 6. DELETE - Remove Product
**DELETE** `/api/productos/{id}/`

**Response 204**:
```json
{
  "message": "Producto eliminado exitosamente"
}
```

**Response 404**:
```json
{
  "detail": "Not found."
}
```

---

## Frontend Implementation Examples

### JavaScript/TypeScript Fetch

```javascript
const BASE_URL = 'https://your-api-domain.com/api';

// GET All
async function getProducts(page = 1) {
  const response = await fetch(`${BASE_URL}/productos/?page=${page}`);
  return await response.json();
}

// GET One
async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/productos/${id}/`);
  return await response.json();
}

// CREATE
async function createProduct(data) {
  const response = await fetch(`${BASE_URL}/productos/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// UPDATE (Full)
async function updateProduct(id, data) {
  const response = await fetch(`${BASE_URL}/productos/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// PARTIAL UPDATE
async function patchProduct(id, data) {
  const response = await fetch(`${BASE_URL}/productos/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// DELETE
async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/productos/${id}/`, {
    method: 'DELETE'
  });
  return await response.json();
}
```

### Axios Example

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-domain.com/api',
  headers: { 'Content-Type': 'application/json' }
});

// CRUD Operations
const productAPI = {
  list: (page = 1) => api.get(`/productos/?page=${page}`),
  get: (id) => api.get(`/productos/${id}/`),
  create: (data) => api.post('/productos/', data),
  update: (id, data) => api.put(`/productos/${id}/`, data),
  patch: (id, data) => api.patch(`/productos/${id}/`, data),
  delete: (id) => api.delete(`/productos/${id}/`)
};
```

---

## Validation Rules

### Required Fields
- `title`: Non-empty string
- `image`: Valid URL (accepts .jpg, .jpeg, .png, .gif, .webp, .svg or CDN URLs)
- `url`: Valid URL

### Optional Fields
- `email`: Must be valid email format if provided

### Read-Only Fields
- `id`
- `isReserved`
- `created_at`
- `updated_at`

---

## Error Responses

### 400 Bad Request
Invalid data format or validation errors
```json
{
  "field_name": ["Error message"]
}
```

### 404 Not Found
Resource doesn't exist
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
Server error
```json
{
  "detail": "Internal server error"
}
```

---

## Notes for AI Implementation

1. **Always include trailing slash** in URLs: `/api/productos/` not `/api/productos`
2. **Email field controls reservation**: Setting email automatically sets isReserved=true
3. **Pagination**: Response includes `next`, `previous`, `count` for navigation
4. **URL validation**: Image URLs are validated but flexible for CDN services
5. **PATCH vs PUT**: Use PATCH for partial updates, PUT for full replacement
6. **Response codes**: 200 (success), 201 (created), 204 (deleted), 400 (validation), 404 (not found)
