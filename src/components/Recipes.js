import React, {useState} from 'react';
import ReactCardFlip from "react-card-flip";

const Recipes = ({ title, calories, image, ingredients}) => {

  const [isFlipped , setFlipped] = useState(false);

    const handleClick = () => {
      setFlipped(!isFlipped);
    };

    return (
      <div className="col-sm">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card text-center">
          <div class="overflow">
            <img className="card-img-top" src={image} alt="Loading..." />
          </div>
          <div class="card-body text-dark">
            <h4 className="sup-title card-title">{title}</h4>
            <p className="text-secondary">{Math.round(calories)} kcal</p>
            <button className="btn btn-outline-success" onClick={handleClick}>
              Get Recipe!
            </button>
          </div>
        </div>

        {/* Back side of Card  */}
        <div className="card text-center">
          <div class="card-body text-dark">
            <h4 className="card-title">Recipe:</h4>
            <ul class="list-group list-group-flush" style={{overflowY:'scroll', overflowX:'hidden', height:400}}>
              {ingredients.map((ingredient) => (
                <li class="list-group-item">{ingredient.text}</li>
              ))}
            </ul>
            <button className="btn btn-outline-success" onClick={handleClick}>Return</button>
          </div>
        </div>
      </ReactCardFlip>
    </div>
    );
}

export default Recipes;