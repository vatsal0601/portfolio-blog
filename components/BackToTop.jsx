import { useState, useEffect } from "react";

const ScrollButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) setIsVisible(true);
			else setIsVisible(false);
		};
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			tabIndex={-1}
			onClick={scrollToTop}
			className={`fixed bottom-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-full bg-blue-200 transition-colors active:bg-blue-300 lg:bottom-10 lg:right-10 lg:h-12 lg:w-12 ${
				isVisible ? "scale-100" : "scale-0"
			} transition-transform focus:outline-none`}>
			<span className="text-xl font-bold text-blue-700 lg:text-2xl">&uarr;</span>
		</button>
	);
};

export default ScrollButton;
