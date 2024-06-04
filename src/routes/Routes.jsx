import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddArticle from "../pages/AddArticle/AddArticle";
import PrivateRoute from "./PrivateRoute";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import MyArticles from "../pages/MyArticles/MyArticles";
import Subscription from "../pages/Subscription/Subscription";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import AllArticles from "../pages/AllArticles/AllArticles";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../layouts/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/all-articles',
                element: <AllArticles />
            },
            {
                path: '/subscription',
                element: <Subscription />
            },
            {
                path: '/add-article',
                element: <PrivateRoute><AddArticle /></PrivateRoute>
            },
            {
                path: '/news/:id',
                element: <PrivateRoute><ArticleDetails /></PrivateRoute>
            },
            {
                path: '/my-articles',
                element: <PrivateRoute><MyArticles /></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: '/premium-articles',
                element: <PrivateRoute><PremiumArticles /></PrivateRoute>
            },
        ],
    }, {
        path: '/dashboard',
        element: <Dashboard />
    }
]);
