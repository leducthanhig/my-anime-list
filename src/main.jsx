import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const title = 'My Anime List';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App title={title} />
	</StrictMode>
);

document.title = title;