import { Router } from "express";

interface Route {
    path: string;
    router: Router;
    controller: any;

    initializeRoutes(): void;
}

export default Route;