# VinylVault — Indie Record Store

VinylVault is a React-based online record store where users can explore vinyl albums, filter releases by genre, view album information, and manage a shopping cart. The application also includes a checkout page where customers can review their order and submit their shipping information.

## 1. Project Setup & Execution Instructions

### Prerequisites

Before running the project, make sure the following tools are installed:

- Node.js version 21 or higher
- npm (Node Package Manager)
- Git (for cloning the repository)
- A modern web browser

### Installation

**1. Clone the repository**

```bash
git clone git@github.com:marlinbelegu/Web_Systems_Project_3.git
```

**2. Navigate to the project directory**

```bash
cd Web_Systems_Project_3/Project3
```

**3. Install the project dependencies**

```bash
npm install
```

The project uses React with Vite and `react-router-dom` for navigation between pages. If React Router has not been installed, run:

```bash
npm install react-router-dom
```

### Running the Application

Start the Vite development server:

```bash
npm run dev
```

The terminal will display a local URL, typically:

```text
http://localhost:5173/
```

Open this address in a web browser to access the application. Verify that the VinylVault catalog loads and that navigation between the catalog, album details, and checkout works without refreshing the page.

To stop the development server, press `Ctrl + C` in the terminal.

### Project Directory Structure

The `src/components` directory contains reusable interface elements such as the navigation bar, album cards, and shopping cart drawer. The `src/pages` directory contains the catalog, album detail, and checkout pages, while `src/data/albums.js` stores the provided album dataset. The `App.jsx` file manages shared application state and routes, and `main.jsx` initializes React. Global styles are defined in `src/styles.css`, while project configuration and dependency information are stored in the root directory.

## 2. React Component Hierarchy & State Flow Architecture

VinylVault uses reusable React functional components to organize the storefront into separate pages and interface elements. The application follows unidirectional data flow, where shared cart information is managed in `App.jsx` and passed to child components through props.

React Router handles navigation between the catalog, individual album pages, and checkout without reloading the browser.

### Component Hierarchy

```text
<React.StrictMode> — src/main.jsx
└── <BrowserRouter> — src/main.jsx
    └── <App> — src/App.jsx
        │
        │   State:
        │   - cart: Array (stores albums and quantities)
        │   - isCartOpen: Boolean (controls drawer visibility)
        │
        │   Handlers:
        │   - handleAddToCart(album, quantity)
        │   - handleUpdateQuantity(albumId, delta)
        │   - handleRemoveFromCart(albumId)
        │   - handleClearCart()
        │
        ├── <Navbar> — src/components/Navbar.jsx
        │   State: None
        │   Props:
        │   - cartCount: Number
        │   - onOpenCart: Function
        │   Events:
        │   - onOpenCart() opens the cart drawer
        │
        ├── <Routes> — React Router
        │   │
        │   ├── Route: "/"
        │   │   └── <CatalogPage> — src/pages/CatalogPage.jsx
        │   │       State:
        │   │       - selectedGenre: String
        │   │       Props:
        │   │       - albums: Array
        │   │       - onAddToCart: Function
        │   │       Events:
        │   │       - setSelectedGenre(genre)
        │   │       │
        │   │       └── <AlbumCard> — src/components/AlbumCard.jsx
        │   │           State: None
        │   │           Props:
        │   │           - album: Object
        │   │           - onAddToCart: Function
        │   │           Events:
        │   │           - onAddToCart(album)
        │   │           Navigation:
        │   │           - Link to /album/:albumId
        │   │
        │   ├── Route: "/album/:albumId"
        │   │   └── <AlbumDetailPage> — src/pages/AlbumDetailPage.jsx
        │   │       State:
        │   │       - quantity: Number
        │   │       Props:
        │   │       - albums: Array
        │   │       - onAddToCart: Function
        │   │       Events:
        │   │       - setQuantity(value)
        │   │       - onAddToCart(album, quantity)
        │   │       Navigation:
        │   │       - useParams() retrieves albumId
        │   │       - Link to /
        │   │
        │   └── Route: "/checkout"
        │       └── <CheckoutPage> — src/pages/CheckoutPage.jsx
        │           State:
        │           - formData: Object
        │           - isSubmitted: Boolean
        │           Props:
        │           - cart: Array
        │           - onClearCart: Function
        │           Events:
        │           - handleChange(event)
        │           - handleSubmit(event)
        │           - onClearCart()
        │           Navigation:
        │           - Link to /
        │
        └── <CartDrawer> — src/components/CartDrawer.jsx
            State: None
            Props:
            - cart: Array
            - isOpen: Boolean
            - onClose: Function
            - onUpdateQuantity: Function
            - onRemove: Function
            Events:
            - onClose()
            - onUpdateQuantity(albumId, delta)
            - onRemove(albumId)
            - handleProceedToCheckout()
            Navigation:
            - useNavigate() to /checkout
```

### State Management and Data Flow

**Shared Cart State**

The `App` component manages the cart array and the visibility of the shopping cart drawer using `useState()`. These values are shared across the application so that the cart remains synchronized when navigating between pages.

The cart is updated through callback functions passed to child components. Adding an album, changing its quantity, or removing it updates the cart using immutable array operations such as `.map()`, `.filter()`, and the spread operator.

The total number of albums in the cart is calculated using `.reduce()` and passed to `Navbar` through the `cartCount` prop.

**Catalog Filtering**

`CatalogPage` manages its own `selectedGenre` state, initially set to `"All"`. Users can filter albums by Jazz, Electronic, Rock, or Classical.

The selected genre determines which albums are displayed. The filtered array is rendered using `.map()`, which creates an `AlbumCard` for each matching album.

**Album Details**

`AlbumDetailPage` uses `useParams()` to retrieve the album ID from the URL and find the corresponding album in the dataset.

The page displays the album's title, artist, price, description, stock availability, pressing weight, catalog number, playback speed, record label, and tracklist.

The selected quantity is stored in local state. When the user clicks Add to Cart, the page passes the selected album and quantity to the handler defined in `App`.

**Shopping Cart Drawer**

`CartDrawer` receives the cart data and callback functions from `App`. It does not maintain a separate copy of the cart.

Users can increase or decrease quantities, remove albums, and view the subtotal. The subtotal is calculated using `.reduce()` based on each album's price and quantity.

The drawer uses `useNavigate()` to redirect users to `/checkout` when they proceed with their order.

**Checkout and Order Confirmation**

`CheckoutPage` receives the cart and the `onClearCart` callback from `App`.

The checkout form uses a `formData` state object to control the Full Name, Address, City, Postal Code, and Card Details inputs. The `handleChange()` function updates the corresponding field whenever the user enters information.

When the form is submitted, `handleSubmit()` calls `event.preventDefault()` to avoid reloading the page. After validating the required fields, the application clears the cart and sets `isSubmitted` to `true` to display the order confirmation.

### Routing

React Router manages the three main application routes:

| Route | Component | Purpose |
|---|---|---|
| `/` | `CatalogPage` | Browse and filter vinyl albums |
| `/album/:albumId` | `AlbumDetailPage` | View album information and select quantity |
| `/checkout` | `CheckoutPage` | Review the order and submit checkout information |

The application uses `<Link>` for navigation links, `useParams()` to retrieve album IDs, and `useNavigate()` for programmatic navigation to checkout.

All routes render within `App`, allowing the cart state and navigation badge to remain synchronized throughout the shopping experience.
