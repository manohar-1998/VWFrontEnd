import React from "react";
import Cart from "./pages/Cart";
import Create_user from "./pages/Create_user";
import Applyleave from "./pages/Leaves/Applyleave";
import TheContent from "./pages/TheContent";
import Productspage from "./Productspage";

const routes = [
    { path: "/", exact: true, name: "TheHome" },
    { path: "/TheContent", name: "Content", component: TheContent },
    { path: "/Applyleave", name: "Content", component: Applyleave },
    { path: "/createuser", name: "Content", component: Create_user },
    { path: "/Productpage", name: "Content", component: Productspage },
    { path: "/Cart", name:"Cart", component:Cart}
];
export default routes;