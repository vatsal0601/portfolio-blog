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
			className={`bg-blue-200 active:bg-blue-300 transition-colors fixed bottom-5 lg:bottom-10 right-5 lg:right-10 grid place-items-center w-10 lg:w-12 h-10 lg:h-12 rounded-full z-50 ${
				isVisible ? "scale-100" : "scale-0"
			} transition-transform focus:outline-none`}>
			<span className="font-bold text-xl lg:text-2xl text-blue-700">&uarr;</span>
		</button>
	);
};

export default ScrollButton;
