# Frontend de la Aplicación

---

## Estructura del App

1. Título del Proyecto
2. Descripción
3. Características
4. Requisitos
5. Instalación
6. Uso
7. Estructura del Proyecto

---

## 1. Título

**COMPARADOR DE PRECIOS DE SUPERMERCADOS**

## 2. Descripción

Es un proyecto que permite comparar precios de varios supermercados, facilitando la obtención de una comparación de cestas de diferentes supermercados para elegir la más económica. La aplicación permite a los usuarios registrados comparar precios de productos entre diferentes supermercados, mostrando cada producto con sus diferentes precios en ambas tiendas.

## 3. Características

- Comparación de precios en varios supermercados.
- Visualización de listas de todos los productos.
- Navegación intuitiva con diseño cómodo y fácil.

## 4. Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas para su ejecución:

- Node.js
- Angular CLI
- Visual Studio Code
- MySQL

## 5. Instalación

Sigue estos pasos para instalar el proyecto:

1. Clona el repositorio.   
2. Navega al directorio del proyecto.
3. Instala todas las dependencias con npm install.

## 6. Uso

Para iniciar la aplicación en el servidor de desarrollo, ejecuta ng serve.
Luego, abre tu navegador y ve a http://localhost:4200/ y regístrate.

## 7. Estructura del Proyecto

```\
src
│
├── app
│   ├── components
│   │   └── layout
│   │       └── header
│   │           ├── header.component.css
│   │           ├── header.component.html
│   │           ├── header.component.spec.ts
│   │           ├── header.component.ts
│   │           └── header.module.ts
│   └── pages
│       ├── comparativa
│       │   ├── comparativa.component.css
│       │   ├── comparativa.component.html
│       │   ├── comparativa.component.spec.ts
│       │   └── comparativa.component.ts
│       ├── dashboard
│       ├── location
│       ├── login
│       ├── registro-usuario
│       └── statistics
├── services
├── assets
│   └── images
│       ├── logo2.png
│       ├── mercadona.png
│       └── dia.png
├── styles.css
└── index.html

angular.json
package.json
README.md
\```
