import logo from "../../assets/images/logoComplet.png";
import React from "react";
import styles from "./Header.module.scss";
import { useState } from 'react';
import MobileMenu from "./components/MobileMenu";
import { Link } from "react-router-dom";

export default function Header() {

    const [showMenu, setShowMenu] = useState(false);

    
    return (
        <div className={`${styles.header}`}>
            <div className="d-flex justify-content-end">
                <ul className={`${styles.desktopHeader} `}>
                    <button className={`mr10 btn btn-primary`}>
                        <i className="fas fa-star m5"></i>
                        <span>Recherche</span>
                    </button>
                    <Link to='/addRecipe'>
                        <button className={`mr10 btn btn-primary`}>
                        <i className="fas fa-right-to-bracket m5 m5"></i>
                        <span>Ajouter une recette</span>
                        </button>
                    </Link>
                    <Link to="/register">
                        <button type="button" className={`mr10 btn btn-primary`}>
                        <i className="fas fa-star m5"></i>
                        <span>Inscription</span>
                    </button>
                    </Link>
                    <Link to="/Login">
                    <button className={`mr10 btn btn-primary-reverse`}>
                        <i className="fas fa-right-to-bracket m5 m5"></i>
                        <span>Connexion</span>
                    </button>
                    </Link>

                </ul>
                <i
                    onClick={() => setShowMenu(true)}
                    className={`fas fa-bars mr10`}
                ></i>
                {showMenu && (
                    <>
                        <div className="calc" onClick={() => setShowMenu(false)}></div>
                        <MobileMenu />
                    </>
                )}
            </div>

            <div className="d-flex justify-content-center">
               <Link to="/"> <img src={logo} alt="Logo Mémoire de Recettes" /></Link>
            </div>
        </div>    
    );
}

