# Configuración CORS para el Backend

## Problema Detectado
La integración con la API está bloqueada por política CORS. El backend en Railway necesita permitir peticiones desde el frontend.

## Solución en Django

### 1. Instalar django-cors-headers
```bash
pip install django-cors-headers
```

### 2. Configurar settings.py

```python
# settings.py

INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ... resto de apps
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ⚠️ Importante: debe estar ANTES de CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    # ... resto de middleware
]

# Configuración CORS - Opción 1 (Recomendada para producción)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Para desarrollo local
    "https://house-shower-yae.vercel.app",  # Tu dominio de producción (actualiza según tu deploy)
]

# Configuración CORS - Opción 2 (Solo para desarrollo rápido - NO usar en producción)
# CORS_ALLOW_ALL_ORIGINS = True

# Opcional: Permitir credenciales (cookies, auth headers)
CORS_ALLOW_CREDENTIALS = True
```

### 3. Actualizar requirements.txt
```bash
pip freeze > requirements.txt
```

### 4. Hacer commit y push
```bash
git add .
git commit -m "Add CORS configuration"
git push origin main
```

### 5. Verificar en Railway
Railway debería hacer auto-deploy cuando detecte el push. Verifica que los logs no tengan errores.

## Verificación

Una vez configurado CORS en el backend, puedes verificar que funcione:

1. Abre http://localhost:3000
2. Abre Chrome DevTools (F12)
3. Ve a la pestaña Network
4. Recarga la página
5. Busca la petición a `/api/productos/`
6. Verifica que la respuesta tenga status 200 y el header `Access-Control-Allow-Origin`

## Estado Actual de la Integración

✅ Frontend configurado para usar API real
✅ Variables de entorno configuradas
✅ Servicio API creado en `app/lib/api.ts`
✅ Hook `use-products` actualizado para usar API
✅ Tipos actualizados (id: number en vez de string)
❌ **PENDIENTE**: Configurar CORS en el backend

## URLs Configuradas

- **Frontend (desarrollo)**: http://localhost:3000
- **Backend (producción)**: https://depashowerapi-production.up.railway.app
- **Endpoint de productos**: https://depashowerapi-production.up.railway.app/api/productos/
