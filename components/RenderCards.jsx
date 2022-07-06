import Card from "./Card";

const RenderCards = ({ data, type, name }) => {
	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
			{data?.map((element, index) => {
				const { slug, title, cover, collection } = element.attributes;
				switch (type) {
					case "blog":
						const { readTime, excerpt, createdAt } =
							element.attributes;
						return (
							<Card
								key={index}
								title={title}
								slug={slug}
								text={excerpt}
								cover={cover}
								date={createdAt}
								readTime={readTime}
								collection={
									name
										? name
										: collection.data
										? collection.data.attributes.name
										: null
								}
								type={type}
							/>
						);
					case "project":
						const { github, link, date, description } =
							element.attributes;
						return (
							<Card
								key={index}
								slug={slug}
								title={title}
								text={description}
								cover={cover}
								date={date}
								github={github}
								link={link}
								type={type}
							/>
						);
					default:
						break;
				}
			})}
		</div>
	);
};

export default RenderCards;
