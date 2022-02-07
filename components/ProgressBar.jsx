import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProgressBar = () => {
	const router = useRouter();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let timer;

		const start = () => {
			setProgress(1);
			increment();
		};

		const increment = () => {
			const timeout = Math.round(Math.random() * 300);

			setProgress((progress) => {
				if (progress == 100) return 100;
				const percent = Math.round(Math.random() * 10);
				const next = Math.min(progress + percent, 80);
				if (next < 80) {
					timer = setTimeout(increment, timeout);
					return next;
				}
				return 80;
			});
		};

		const complete = () => {
			clearTimeout(timer);
			setProgress(100);
		};

		router.events.on("routeChangeStart", start);
		router.events.on("routeChangeError", complete);
		router.events.on("routeChangeComplete", complete);
		return () => {
			clearTimeout(timer);
			router.events.off("routeChangeStart", start);
			router.events.off("routeChangeComplete", complete);
			router.events.off("routeChangeError", complete);
		};
	}, [router.events]);

	return (
		<div
			className={`trasnform absolute top-0 left-0 h-1 w-full -translate-x-full bg-blue-600 transition-all ${
				(progress === 0 || progress === 100) && "opacity-0 duration-300"
			}`}
			style={{ transform: `translateX(${-100 + progress}%)` }}></div>
	);
};

export default ProgressBar;
