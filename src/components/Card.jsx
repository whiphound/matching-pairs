import PropTypes from "prop-types";

export default function Card({
  selectedCards,
  isRevealed,
  cardImg,
  cardImgAlt,
  cardID,
  onCardClick,
}) {
  const isSelected = selectedCards.includes(cardID);
  const isMatched =
    selectedCards.includes(cardID) && selectedCards.includes("matched");
  const isNotMatched =
    selectedCards.includes(cardID) && selectedCards.includes("nomatch");
  const isDisabled =
    selectedCards.includes("matched") || selectedCards.includes("nomatch");

  // Derive the classes needed for each card
  let cardClasses = "w-32 h-32 m-2 rounded-3xl hover:rotate-12";

  // If card is selected then set the selected background colour, otherwise set standard background colour
  isSelected
    ? (cardClasses += " bg-blue-200 rotate-12")
    : (cardClasses += " bg-blue-950");

  // If there is a match then add the success animation
  isMatched
    ? (cardClasses += " animate-jump animate-once animate-duration-[2000ms]")
    : null;

  // If there is no match then set the failure animation
  isNotMatched
    ? (cardClasses += " animate-shake animate-thrice animate-duration-100")
    : null;

  // set the content for the card.  If it is reveled then show the image, otherwise show empty card (card back).
  const cardContent = isRevealed ? (
    <div className={cardClasses}>
      <img src={cardImg} alt={cardImgAlt} className="w-32 h-32 m-2" />
    </div>
  ) : (
    <div className={cardClasses + " bg-yellow-800"}></div>
  );

  return (
    <div>
      <button onClick={() => onCardClick(cardID)} disabled={isDisabled}>
        {cardContent}
      </button>
    </div>
  );
}

Card.propTypes = {
  isRevealed: PropTypes.bool,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMatched: PropTypes.bool,
  isNotMatched: PropTypes.bool,
  cardImg: PropTypes.string,
  cardImgAlt: PropTypes.string,
  cardID: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.string),
};
