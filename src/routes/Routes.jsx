import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';
import Root from '../layouts/Root';
import About from '../pages/About/About';
import AddArticle from '../pages/AddArticle/AddArticle';
import AllArticles from '../pages/AllArticles/AllArticles';
import ArticleDetails from '../pages/ArticleDetails/ArticleDetails';
import AddPublisher from '../pages/Dashboard/AddPublisher/AddPublisher';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import AllArticlesAdmin from '../pages/Dashboard/AllArticles/AllArticlesAdmin';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyArticles from '../pages/MyArticles/MyArticles';
import Payment from '../pages/Payment/Payment';
import PremiumArticles from '../pages/PremiumArticles/PremiumArticles';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import Subscription from '../pages/Subscription/Subscription';
import AdminRoute from './AdminRoute';
import PremiumRoute from './PremiumRoute';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/all-articles',
				element: <AllArticles />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/subscription',
				element: (
					<PrivateRoute>
						<Subscription />
					</PrivateRoute>
				),
			},
			{
				path: '/add-article',
				element: (
					<PrivateRoute>
						<AddArticle />
					</PrivateRoute>
				),
			},
			{
				path: '/news/:id',
				element: (
					<PrivateRoute>
						<ArticleDetails />
					</PrivateRoute>
				),
			},
			{
				path: '/my-articles',
				element: (
					<PrivateRoute>
						<MyArticles />
					</PrivateRoute>
				),
			},
			{
				path: '/profile',
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				),
			},
			{
				path: '/payment',
				element: (
					<PrivateRoute>
						<Payment />
					</PrivateRoute>
				),
			},
			{
				path: '/premium-articles',
				element: (
					<PremiumRoute>
						<PrivateRoute>
							<PremiumArticles />
						</PrivateRoute>
					</PremiumRoute>
				),
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<AdminRoute>
				<Dashboard />
			</AdminRoute>
		),
		children: [
			{
				index: true,
				element: (
					<AdminRoute>
						<AdminHome />
					</AdminRoute>
				),
			},
			{
				path: '/dashboard/all-users',
				element: (
					<AdminRoute>
						<AllUsers />
					</AdminRoute>
				),
			},
			{
				path: '/dashboard/all-articles',
				element: (
					<AdminRoute>
						<AllArticlesAdmin />
					</AdminRoute>
				),
			},
			{
				path: '/dashboard/add-publisher',
				element: (
					<AdminRoute>
						<AddPublisher />
					</AdminRoute>
				),
			},
		],
	},
]);
