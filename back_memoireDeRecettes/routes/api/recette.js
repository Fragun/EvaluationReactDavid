const express = require("express");
const router = require("express").Router();
const app = express();
const mysql = require("mysql");

// Middleware pour éviter les problèmes de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "recipesmemory",
  });

  // app.post("/deleteUser", (req, res) => {
  //     console.log(req.body);
  //     const id = req.body.id;
  
  //     const sqlDelete = `DELETE FROM articles WHERE idArticles= ?`;
  //     const values = id;
  //     connection.query(sqlDelete, values, (err, result) => {
  //         if (err) throw err;
  //         console.log("Article supprimé de la base de données");
  //         res.send(JSON.stringify(true));
  //     });
  // });
  
  
   
  router.post("/addRecipe", (req, res) => {
    console.log(req.body);
    const title = req.body.titleRecipe;
    const comment = req.body.commentRecipe;
    const price = req.body.priceEstimation;
    const difficulty = req.body.difficultyEstimation;
    const recipeDate = req.body.recipeCreationDate;
    const recipeNumberplate = req.body.coverNumberRecipe;
    const origin = req.body.origin;
    const prepaTime = req.body.prepaTime;
    const prepaTime2 = req.body.prepaTime2;
    const prepa = prepaTime + 'h' + prepaTime2 + "min";
    const cookTime = req.body.cookTime;
    const cookTime2 = req.body.cookTime2;
    const cook = cookTime + ' h' + cookTime2 + " min";
    const season = req.body.season;
    const cookType = req.body.cookType;
    const dietType = req.body.dietType;
    const mealType = req.body.mealType;
    const ustensil = req.body.ustensil;
    const ustensil2 = req.body.ustensil2;
    const ustensil3 = req.body.ustensil3;
    // const ustensil4 = req.body.ustensil4;
    // const ustensil5 = req.body.ustensil5;
    // const ustensil6 = req.body.ustensil6;
    // const ustensil7 = req.body.ustensil7;
    // const ustensil8 = req.body.ustensil8;
    //const ustensilChoose = req.body.ustensilChoose;
    //console.log(ustensilChoose);
  
  
    const sqlInsert = `INSERT INTO recipe
    (RECIPE_TITLE, RECIPE_DESCRIPTION, RECIPE_PRICE, RECIPE_DIFFICULTY, RECIPE_PUBLICATION_DATE, RECIPE_NUMBER_PLATE, MEAL_TYPE_ID, PREP_TIME, COOKING_TIME, SEASON_ID,	COOKING_TYPE_ID, DIET_TYPE_ID, ID_TYPE_DE_REPAS) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, comment, price, difficulty, recipeDate, recipeNumberplate, origin, prepa, cook, season, cookType, dietType, mealType];
  
    connection.query(sqlInsert, values, (err, result) => {
      if (err) throw err;
  
      console.log("Recette ajoutée à la base de donnees");
      let resultBack = req.body;
      resultBack.id = result.insertId;
  
      const sqlVerifyId = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil}'`;
      const sqlVerifyId2 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil2}'`;
      console.log(sqlVerifyId2);
      const sqlVerifyId3 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil3}'`;
      console.log(sqlVerifyId3);
      // const sqlVerifyId4 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil4}'`;
      // const sqlVerifyId5 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil5}'`;
      // const sqlVerifyId6 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil6}'`;
      // const sqlVerifyId7 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil7}'`;
      // const sqlVerifyId8 = `SELECT USTENSIL_ID FROM ustensil WHERE USTENSIL_ICON = '${ustensil8}'`;
  
      // Exécuter la requête SELECT pour récupérer l'ID de l'ustensile
      connection.query(sqlVerifyId, (err, rows, fields) => {
        if (err) throw err;
        // Récupérer l'ID de l'ustensile à partir des résultats de la requête SELECT
        const ustensilId = rows[0].USTENSIL_ID;
        // Exécuter la requête INSERT INTO used pour ajouter l'ustensile
        const sqlInsertUstensil = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
        const value = [result.insertId, ustensilId];
        connection.query(sqlInsertUstensil, value, (err, result) => {
          if (err) throw err;
          console.log("Ustensile1 ajouté à la recette");
          //res.send(JSON.stringify(resultBack));
        });
      });
      connection.query(sqlVerifyId2, (err, rows, fields) => {
        if (err) throw err;
        const ustensilId2 = rows[0].USTENSIL_ID;
        const sqlInsertUstensil2 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
        const value = [result.insertId, ustensilId2];
        connection.query(sqlInsertUstensil2, value, (err, result) => {
          if (err) throw err;
          console.log("Ustensile ajouté à la recette");
          //res.send(JSON.stringify(resultBack));
        });
      });
        connection.query(sqlVerifyId3, (err, rows, fields) => {
          if (err) throw err;
          const ustensilId3 = rows[0].USTENSIL_ID;
          const sqlInsertUstensil3 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
          const value = [result.insertId, ustensilId3];
          connection.query(sqlInsertUstensil3, value, (err, result) => {
            if (err) throw err;
            console.log("Ustensile ajouté à la recette");
            res.send(JSON.stringify(true));
          });
        });
      // connection.query(sqlVerifyId4, (err, rows, fields) => {
      //   if (err) throw err;
      //   const ustensilId4 = rows[0].USTENSIL_ID;
      //   const sqlInsertUstensil4 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
      //   const value = [result.insertId, ustensilId4];
      //   connection.query(sqlInsertUstensil4, value, (err, result) => {
      //     if (err) throw err;
      //     console.log("Ustensile ajouté à la recette");
      //     res.send(JSON.stringify(resultBack));
      //   });
      // });
      // connection.query(sqlVerifyId5, (err, rows, fields) => {
      //   if (err) throw err;
      //   const ustensilId5 = rows[0].USTENSIL_ID;
      //   const sqlInsertUstensil5 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
      //   const value = [result.insertId, ustensilId5];
      //   connection.query(sqlInsertUstensil5, value, (err, result) => {
      //     if (err) throw err;
      //     console.log("Ustensile ajouté à la recette");
      //     res.send(JSON.stringify(resultBack));
      //   });
      // });
      // connection.query(sqlVerifyId6, (err, rows, fields) => {
      //   if (err) throw err;
      //   const ustensilId6 = rows[0].USTENSIL_ID;
      //   const sqlInsertUstensil6 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
      //   const value = [result.insertId, ustensilId6];
      //   connection.query(sqlInsertUstensil6, value, (err, result) => {
      //     if (err) throw err;
      //     console.log("Ustensile ajouté à la recette");
      //     res.send(JSON.stringify(resultBack));
      //   });
      // });
      // connection.query(sqlVerifyId7, (err, rows, fields) => {
      //   if (err) throw err;
      //   const ustensilId7 = rows[0].USTENSIL_ID;
      //   const sqlInsertUstensil7 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
      //   const value = [result.insertId, ustensilId7];
      //   connection.query(sqlInsertUstensil7, value, (err, result) => {
      //     if (err) throw err;
      //     console.log("Ustensile ajouté à la recette");
      //     res.send(JSON.stringify(resultBack));
      //   });
      // });
      // connection.query(sqlVerifyId8, (err, rows, fields) => {
      //   if (err) throw err;
      //   const ustensilId8 = rows[0].USTENSIL_ID;
      //   const sqlInsertUstensil8 = `INSERT INTO used (RECIPE_ID, USTENSIL_ID) VALUES (?, ?)`;
      //   const value = [result.insertId, ustensilId8];
      //   connection.query(sqlInsertUstensil8, value, (err, result) => {
      //     if (err) throw err;
      //     console.log("Ustensile ajouté à la recette");
      //     res.send(JSON.stringify(resultBack));
      //   });
      // });
  
    });
  });
  
  {/*****************************************récup type repas, origin*******************************************************/ }
  router.get("/getMealType", (req, res) => {
    const sql = `SELECT * FROM meal_type`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      //console.log("Récupération des origines du plat");
      res.send(JSON.stringify(result))
    });
  });
  
  
  {/*****************************************récup saison*******************************************************/ }
  router.get("/getSeason", (req, res) => {
    const sql = `SELECT * FROM season`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
  
  
  {/*****************************************récup type de cuisson*******************************************************/ }
  router.get("/getCookType", (req, res) => {
    const sql = `SELECT * FROM cooking_type`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      //console.log("Récupération type de cuisson");
      res.send(JSON.stringify(result))
    });
  });
  
  
  {/*****************************************récup type de régime*******************************************************/ }
  router.get("/getDietType", (req, res) => {
    const sql = `SELECT * FROM diet_type ORDER BY DIET_TYPE_NAME DESC`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      //console.log("Récupération type de régime");
      res.send(JSON.stringify(result))
    });
  });
  
  router.get("/getMealMoment", (req, res) => {
    const sql = `SELECT * FROM type_de_repas`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
  
  router.get("/getUstensils", (req, res) => {
    const sqlUstensil = `SELECT * FROM ustensil`;
    connection.query(sqlUstensil, (err, result) => {
      if (err) throw err;
      //console.log("Récupération ustensil");
      res.send(JSON.stringify(result))
    })
  })
  
  // app.post("/verifyUstensilById", (req, res) => {
  //   console.log(req.body);
  //   const id = req.body.email;
  
  
  //   const sqlVerify = `SELECT * FROM user WHERE USER_EMAIL="${email}" AND USER_PASSWORD="${password}"`;
  
  //   connection.query(sqlVerify, (err, result) => {
  //     console.log(result);
  //     if (err) throw err;
  //     if (result.length === 0) {
  //       console.log("utilisateur non existant");
  //       result[0] = {};
  //       result[0].condition = false;
  //       res.send(JSON.stringify(result[0]));
  //     } else {
  //       console.log("utilisateur existant");
  //       const message = "utilisateur existant";
  //       result[0].message = message;
  //       result[0].condition = true;
  //       res.send(JSON.stringify(result[0]));
  //     }
  //   });
  // });
  
  //REQUETES exemple
  
   router.get("/getRecipes", (req, res) => {
       const sql = `SELECT * FROM recipe as r INNER JOIN photo ON r.RECIPE_ID = photo.RECIPE_ID`;
       connection.query(sql, (err, result) => {
           if (err) throw err;
           console.log("Récupération des recettes avec images");
           res.send(JSON.stringify(result))
       });
     });
  
  
    //  app.post("/toggleLiked", (req, res) => {
    //   const liked = req.body.liked === true ? "1" : "0";
    //   const id = req.body.id;
    //   const sql = `UPDATE love SET liked ="${liked}" WHERE id=${id}`;
    
    //   connection.query(sql, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     connection.query(
    //       `SELECT * FROM recipes WHERE id=${id}`,
    //       (err, result) => {
    //         if (err) throw err;
    //         result[0].liked == 0
    //           ? (result[0].liked = false)
    //           : (result[0].liked = true);
    //         res.send(JSON.stringify(result[0]));
    //       }
    //     );
    //   });
    // });
  
  // // Lancement du serveur Node.js
  // app.listen(port, () => {
  //   console.log(`Serveur Node.js écoutant sur le port ${port}`);
  // });

  module.exports = router;