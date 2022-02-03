import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Card = ({ id, title, excerpt, image, time, date, github, link, type }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div>
			<div className={`rounded-md bg-zinc-300 dark:bg-zinc-600 ${isLoading && "animate-pulse"}`}>
				<Link href={`/${type}/${id}`}>
					<a tabIndex={-1}>
						<Image
							src={image}
							alt={title}
							width="16"
							height="9"
							layout="responsive"
							objectFit="cover"
							objectPosition="center center"
							className="rounded-md"
							onLoad={() => setIsLoading(false)}
						/>
					</a>
				</Link>
			</div>
			<div className="py-1 lg:py-3 space-y-1">
				<Link href={`/${type}/${id}`}>
					<a>
						<h3 className="text-2xl xl:text-3xl text-zinc-900 dark:text-zinc-200 active:text-blue-600 font-semibold tracking-tight transition-colors">
							{title}
						</h3>
					</a>
				</Link>
				<p className="prose lg:prose-lg dark:prose-invert">{excerpt}</p>
				{type === "project" && (
					<p className="text-sm lg:text-base text-blue-600 dark:text-blue-500 space-x-1 lg:space-x-3">
						<a target="_blank" rel="noopener noreferrer" href={github} className="hover:underline">
							GitHub
						</a>
						<a target="_blank" rel="noopener noreferrer" href={link} className="hover:underline">
							Link
						</a>
					</p>
				)}
				<p className="text-sm lg:text-base text-zinc-600 dark:text-zinc-400 font-light">
					Published on {date} {type === "blog" && <span>&bull;</span>}{" "}
					{type === "blog" && `${time} minute read`}
				</p>
			</div>
		</div>
	);
};

export default Card;
