import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"), 
    route("about", "routes/about.tsx"),

    ...prefix("universe", [
        index("routes/universe.tsx"),
        route(":celestialBody", "routes/celestialBody.tsx")
    ]),
       

] satisfies RouteConfig;
