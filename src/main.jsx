import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import ScrollButtons from './components/ScrollButtons/ScrollButtons';
import AuthProvider from './providers/AuthProvider';
import ThemeProvider from './providers/ThemeProvider';
import { router } from './routes/Routes';

import 'animate.css';
import 'react-placeholder/lib/reactPlaceholder.css';

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<HelmetProvider>
						<RouterProvider router={router} />
						<Toaster />
						<ScrollButtons />
					</HelmetProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>
);
