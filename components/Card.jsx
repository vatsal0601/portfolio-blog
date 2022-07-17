import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { renderDate } from "@lib/renderDate";

const Card = ({
	title,
	slug,
	text,
	cover,
	readTime,
	date,
	github,
	link,
	collection,
	type,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div>
			<div
				className={`rounded-md bg-zinc-300 dark:bg-zinc-600 ${
					isLoading && "animate-pulse"
				}`}>
				<Link href={`/${type}/${slug}`}>
					<a tabIndex={-1}>
						<Image
							src={cover}
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
			<div className="space-y-1 py-1 lg:py-3">
				{collection && (
					<p>
						<span className="rounded-md bg-blue-200 px-1 py-0.5 text-xs font-semibold text-blue-700 lg:px-2 lg:py-1 lg:text-sm">
							{collection}
						</span>
					</p>
				)}
				<Link href={`/${type}/${slug}`}>
					<a>
						<h3 className="pt-1 text-2xl font-semibold tracking-tight text-zinc-900 transition-colors active:text-blue-600 dark:text-zinc-200 lg:pt-3 xl:text-3xl">
							{title}
						</h3>
					</a>
				</Link>
				<p className="prose prose-zinc dark:prose-invert lg:prose-lg">
					{text}
				</p>
				{type === "project" && (
					<p className="space-x-1 text-sm text-blue-600 dark:text-blue-500 lg:space-x-3 lg:text-base">
						{github && (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={github}
								className="hover:underline">
								GitHub
							</a>
						)}
						{link && (
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={link}
								className="hover:underline">
								Link
							</a>
						)}
					</p>
				)}
				<p className="text-sm font-light text-zinc-600 dark:text-zinc-400 lg:text-base">
					Published on {renderDate(date)}{" "}
					{type === "blog" && (
						<span>
							<span>&bull;</span>{" "}
							<span>{readTime} minute read</span>
						</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default Card;
