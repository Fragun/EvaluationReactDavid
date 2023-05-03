import { useParams } from "react-router-dom";
import styles from "./RecipePage.module.scss";
import { useState, useEffect } from "react";
import logoPreparation from "../../assets/images/logoPreparation.png";
import logoCuisson from "../../assets/images/logoCuisson.png";
import moment from 'moment';
import 'moment/locale/fr';

const URL_API = "/api/recette";

export default function RecipePage() {
  const [recipeClick, setRecipeClick] = useState([]);
  console.log(recipeClick);
  const[ustensilsRecipe, setUstensilsRecipe] = useState([]);
  console.log(ustensilsRecipe);
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();



  useEffect(() => {
    async function getRecipeClicked() {
      try {
        const response = await fetch(`${URL_API}/getRecipeClicked/${id}`);
        if (response.ok) {
          const recipeClicked = await response.json();
          setRecipeClick(recipeClicked);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getRecipeClicked();
  }, [id]);

  useEffect(() => {
    async function getUstensil() {
      try {
        const response = await fetch(`${URL_API}/getUstensilsByIdRecipe/${id}`);
        if (response.ok) {
          const ustensil = await response.json();
          setUstensilsRecipe(ustensil);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUstensil();
  }, [id]);

  let difficulty, price;
  let dateStr, date, formattedDate;

  if (!isLoading && recipeClick.length > 0) {
    difficulty = recipeClick[0].RECIPE_DIFFICULTY;
    price = recipeClick[0].RECIPE_PRICE;
    dateStr = recipeClick[0].RECIPE_PUBLICATION_DATE;
    date = moment(dateStr);
    formattedDate = date.locale('fr').format('DD MMMM YYYY'); 
  }

  function difficultyRecipe() {
    switch (difficulty) {
      case 1:
        return (
          <div className="d-flex justify-content-center align-items-center">
            <p>Difficulté : </p>
            <i class="las la-mitten la-2x"></i>
          </div>
        );
      case 2:
        return (
          <div className="d-flex justify-content-center align-items-center">
            <p>Difficulté : </p>
            <div>
              <i class="las la-mitten la-2x"></i>
              <i class="las la-mitten la-2x"></i>{" "}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="d-flex justify-content-center align-items-center">
            <p>Difficulté : </p>
            <div>
              <i class="las la-mitten la-2x"></i>
              <i class="las la-mitten la-2x"></i>
              <i class="las la-mitten la-2x"></i>{" "}
            </div>
          </div>
        );

      default:
        break;
    }
  }
  function priceRecipe() {
    switch (price) {
      case 1:
        return (
          <div
            className={` ${styles.price} d-flex justify-content-center align-items-center`}
          >
            <p>Prix : </p>
            <i class="las la-euro-sign la-2x"></i>
          </div>
        );
      case 2:
        return (
          <div
            className={` ${styles.price} d-flex justify-content-center align-items-center`}
          >
            <p>Prix : </p>
            <i class="las la-euro-sign la-2x"></i>
            <i class="las la-euro-sign la-2x"></i>
          </div>
        );

      case 3:
        return (
          <div
            className={` ${styles.price} d-flex justify-content-center align-items-center`}
          >
            <p>Prix : </p>
            <i class="las la-euro-sign la-2x"></i>
            <i class="las la-euro-sign la-2x"></i>
            <i class="las la-euro-sign la-2x"></i>
          </div>
        );

      default:
        return <></>;
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : recipeClick.length > 0 ? (
        <div className={`${styles.container2}  `}>
          <div
            className={`${styles.mobileColumn} flex-fill d-flex justify-content-around m10`}
          >
            <div className={` align-items-start ${styles.posAbsolute}`}>
              {recipeClick[0].DIET_IMAGE.length > 0 ? (
                <img
                  className={` ${styles.regime}`}
                  src={`../../assets/images/${recipeClick[0].DIET_IMAGE}`}
                  alt="logo avatar"
                />
              ) : (
                ""
              )}
              <div>
                <img
                  className={` ${styles.bigImage} m10 d-flex `}
                  src={`../../assets/images/${recipeClick[0].PHOTO_NAME}`}
                  alt="recette principale"
                ></img>
                <div className="d-flex justify-content-center">
                  <i>
                    ❝{" "}
                    {recipeClick[0].RECIPE_DESCRIPTION.charAt(0).toUpperCase() +
                      recipeClick[0].RECIPE_DESCRIPTION.slice(1)}{" "}
                    ❞
                  </i>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column">
              <div className="ml20 mt10">
                <h1>
                  {recipeClick[0].RECIPE_TITLE.charAt(0).toUpperCase() +
                    recipeClick[0].RECIPE_TITLE.slice(1)}
                  <em className="">-{recipeClick[0].NOM_TYPE_DE_REPAS}</em>
                </h1>
              </div>
              <div
                className={`${styles.container3} flex-fill d-flex flex-row justify-content-between`}
              >
                <div className={`d-flex flex-column justify-content-center`}>
                  <p className="d-flex justify-content-center">
                    Recette de {recipeClick[0].SEASON_NAME}
                  </p>
                  <p className="d-flex justify-content-center">
                    Spécialité {recipeClick[0].MEAL_TYPE_NAME}
                  </p>
                  <p className="d-flex justify-content-center">
                    Cuisson {recipeClick[0].COOKING_TYPE_NAME}
                  </p>

                  <p>Créée par {recipeClick[0].USER_PSEUDO} le {formattedDate}</p>
                  {recipeClick[0].USER_PHOTO ? (
                    <div className="  d-flex justify-content-center ">
                      <img
                        className={` ${styles.avatar}`}
                        src={`../../assets/images/${recipeClick[0].USER_PHOTO}`}
                        alt="logo avatar"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="align-items-center justify-content-center ml20">
                  <div className={`d-flex align-items-center`}>
                    <img src={logoPreparation} alt="temps de préparation"></img>
                    <p>{recipeClick[0].PREP_TIME}</p>
                  </div>

                  <div className={`d-flex`}>
                    <img src={logoCuisson} alt="temps de cuisson"></img>
                    <p>{recipeClick[0].COOKING_TIME}</p>
                  </div>
                  {difficultyRecipe()}
                  {priceRecipe()}

                  {recipeClick[0].DIET_TYPE_NAME.length > 0 ? (
                    <p>Régime : {recipeClick[0].DIET_TYPE_NAME}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <h3 className="ml20 pl20">Ustensiles</h3>
          <div className={`${styles.container4} m10 d-flex flex-row justify-content-evenly`}>
            {ustensilsRecipe.map((a, i) => (
              <div className="d-flex flex-column">
                <div>{a.USTENSIL_NAME}</div>
                <img
                  src={`../assets/images/LogoUstensiles/${a.USTENSIL_ICON}`}
                  alt="icones ustensiles"
                  className={`${styles.logoSize}`}
                />
              </div>
            ))}
          </div>
          <h3 className="ml20 pl20">Ingrédients</h3>
          <div className={`${styles.container4} m10 d-flex flex-row justify-content-evenly`}>
            {ustensilsRecipe.map((a, i) => (
              <div className="d-flex flex-column">
                <div>{a.USTENSIL_NAME}</div>
                <img
                  src={`../assets/images/LogoUstensiles/${a.USTENSIL_ICON}`}
                  alt="icones ustensiles"
                  className={`${styles.logoSize}`}
                />
              </div>
            ))}
            
          </div>
          <h4 className="ml20 pl20">Etape 1</h4>
          <p></p>
        </div>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
}