import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Season from "./pages/Season";

export default function App({ title }) {
	return (
		<Router>
			<Header title={title} />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/season/:year?/:season?" element={<Season />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};