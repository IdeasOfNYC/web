import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/sidebar.tsx", [
    route("/map", "routes/map.tsx"),
    route("/timeline", "routes/timeline.tsx"),
  ]),
  route("/sandbox", "routes/sandbox.tsx"),
  route("/about", "routes/about.tsx"),
] satisfies RouteConfig;
