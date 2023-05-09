import { APP_ROUTES } from "@/constants";

/**
 * @params asPath
 * @returns
 */

export const checkIsPublicRoute = (asPath: string) => {
    const appPublicRoutes = Object.values(APP_ROUTES.public);
    return appPublicRoutes.includes(asPath);
};