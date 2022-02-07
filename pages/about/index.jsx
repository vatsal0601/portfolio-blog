import Head from "../../components/Header";
import Image from "next/image";
import src from "../../public/images/image.jpg";
import { useState } from "react";

const About = () => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<Head
				title="About - Vatsal Sakariya"
				description="About Vatsal Sakariya"
				keywords="Portfolio, Vatsal Sakariya, About, Web Development"
			/>
			<main className="container mx-auto space-y-12 py-2 px-5 md:px-10 lg:space-y-16">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200 xl:text-5xl">
					🙎 About
				</h1>
				<section className="container mx-auto space-y-5 px-5 md:px-10">
					<div
						className={`mx-auto rounded-md bg-zinc-300 dark:bg-zinc-600 lg:w-3/4 xl:w-3/5 ${
							isLoading && "animate-pulse"
						}`}>
						<Image
							src={src}
							alt="Vatsal Sakariya's image"
							width="16"
							height="9"
							layout="responsive"
							objectFit="cover"
							objectPosition="50% 10%"
							className="rounded-md"
							onLoad={() => setIsLoading(false)}
							priority="true"
						/>
					</div>
					<div className="mx-auto max-w-prose space-y-3">
						<div className="prose lg:prose-lg dark:prose-invert">
							<p>
								Hey 👋 I am Vatsal Sakariya, a full stack developer currently living
								in Gujarat, India
							</p>
							<p>
								Right now I am an undergraduate and I study at Nirma University 🏫
								for my bachelor degree in Computer Science and Engineering. I did my
								higher secondary in Utkarsh School of Excellence 🏢.
							</p>
							<p>
								I love working in the realm between design and code. Some stuff that
								makes me excited are CSS, React, Design Systems, Component Kits, UI
								Animation and delightful interfaces ✨.
							</p>
							<p>
								In my spare time I love being outdoors, training 🏋️‍♂️ and travelling
								✈️.
							</p>
						</div>
						<div>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="mailto:vsakariya8@gmail.com"
								className="rounded-md bg-blue-200 px-3 py-1 text-sm font-semibold text-blue-700 transition-colors active:bg-blue-300 lg:text-base">
								Contact Me
							</a>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default About;
