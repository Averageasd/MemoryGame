export const Card = ({id, link, cardClickHandler}) => {
    return (
        <li key={id}
            onClick={() => {
                cardClickHandler(id)
            }}>
            <img src={link} alt="img"></img>
        </li>
    )
}