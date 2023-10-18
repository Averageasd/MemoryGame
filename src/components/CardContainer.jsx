import {Card} from "./Card.jsx";

export const CardContainer = ({imgs, cardClickHandler}) => {
    return (
        <ul>
            {imgs.map(img => {
                return (
                    <Card
                        id={img.id}
                        link={img.link}
                        cardClickHandler={cardClickHandler}
                    >
                    </Card>
                )
            })}
        </ul>

    )
}