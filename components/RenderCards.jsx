import Card from "./Card";

const RenderCards = ({ data, type }) => {
	return (
		<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
			{data?.map((element) => {
				if (type == "project") {
					const { id, title, excerpt, coverImageUrl, date, github, link } = element;
					return (
						<Card
							key={id}
							id={id}
							title={title}
							excerpt={excerpt}
							image={coverImageUrl}
							date={date}
							github={github}
							link={link}
							type={type}
						/>
					);
				}
				const { id, title, excerpt, coverImageUrl, date, time } = element;
				return (
					<Card
						key={id}
						id={id}
						title={title}
						excerpt={excerpt}
						image={coverImageUrl}
						date={date}
						time={time}
						type={type}
					/>
				);
			})}
		</div>
	);
};

export default RenderCards;
