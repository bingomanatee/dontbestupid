/// <reference types="vite-plugin-pages/client" />

// fallback if above doesn't work:
declare module 'virtual:generated-pages' {
    import { RouteObject } from 'react-router-dom';
    const routes: RouteObject[];
    export default routes;
}
