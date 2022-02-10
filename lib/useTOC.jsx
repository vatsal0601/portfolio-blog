import { useState, useEffect } from "react";

export const useTOC = (headingRef) => {
	const [toc, setToc] = useState("");

	useEffect(() => {
		let headings = headingRef.current;

		if (headings) {
			headings = [...headings.querySelectorAll("h1, h2, h3, h4, h5, h6")];
			const parsedHeadings = headings.map((heading) => ({
				title: heading.innerText,
				depth: heading.nodeName.replace(/\D/g, ""),
				id: heading.getAttribute("id"),
			}));

			const getTabs = (depth) => {
				let tabs = "";
				for (let i = 0; i < depth - 2; i++) tabs += "\t";
				return tabs;
			};

			const markdown = "";
			parsedHeadings.forEach((element) => {
				markdown += `${getTabs(element.depth)}- [${element.title}](#${
					element.id
				})`;
				markdown += "\n";
			});

			setToc(markdown);
		}
	}, [headingRef]);

	return [toc];
};
