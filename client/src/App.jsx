import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router';

// Component Imports
import Layout from './Layout';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import ShowsPage from './pages/ShowsPage';
import OriginalsPage from './pages/OriginalsPage';

import DetailsPage from './pages/DetailsPage';
import CollectionsPage from './pages/CollectionsPage';

// Simple inline 404 fallback
const NotFoundPage = () => (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
    <h1 className="text-8xl font-black text-primary">404</h1>
    <p className="text-2xl font-bold">Page Not Found</p>
    <p className="text-neutral-400 text-center max-w-md">The page you're looking for doesn't exist or has been moved.</p>
    <a href="/" className="mt-2 px-6 py-3 rounded-full bg-primary text-black font-bold hover:opacity-90 transition-opacity">Back to Home</a>
  </div>
);

// Define the routes mapping to menuData:
// - Home (slug: home, path: "/")
// - Movies (slug: movies, path: "/movies")
// - Shows (slug: shows, path: "/shows")
// - Originals (slug: originals, path: "/originals")
const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="movies" element={<MoviesPage />} />
    <Route path="shows" element={<ShowsPage />} />
    <Route path="originals" element={<OriginalsPage />} />
    <Route path="details/:id" element={<DetailsPage />} />
    <Route path="collection/:id" element={<CollectionsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
