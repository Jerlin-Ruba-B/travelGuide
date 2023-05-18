import {CardList, PlaceImg, Name, Description} from './styledComponents'

const Cards = props => {
  const {details} = props
  return (
    <CardList>
      <PlaceImg src={details.imageUrl} alt={details.name} />
      <Name>{details.name}</Name>
      <Description>{details.description}</Description>
    </CardList>
  )
}
export default Cards
