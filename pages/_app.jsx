import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollButton from "../components/BackToTop";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Navbar />
			<ScrollButton />
			<Component {...pageProps} />
			<Footer />
		</>
	);
};

export default App;
