const Express = require("express");
const router = Express.Router();
const { Favorites } = require("../models")

//Create a Favorite
router.post("/create", async (req, res) => {
    const { gameTitle, gameInfo, gameImage } = await req.body.Favorites;
    const id = req.user.id;
    const addFav = {
        gameTitle, 
        gameInfo,
        gameImage,
        userId: id
    }

    try {
        const newFav = await Favorites.create(addFav);
        console.log(newFav);
        res.status(200).json(newFav)
    } catch (err) {
        res.status(500).json(
            `Something went wrong adding your favorite: ${err}`
        )
    }
});

//Get Favorites List
router.get("/myFavs", async (req, res) => {
    const id = req.user.id;
    try {
        const userFavorites = await Favorites.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userFavorites);
    } catch (err) {
        res.status(500).json(`There was an error getting your favorites: ${err}`)
    }
});

//Remove Item from Favorites List
router.delete("/:id", async(req, res) => {
    const id = req.user.id;
    const favoritesId = req.params.id;

    try {
        const query = {
            where: {
                id: favoritesId,
                userId: id
            }
        }
        await Favorites.destroy(query);
        res.status(200).json(`Game successful removed from Favorites`);
    } catch (err) {
        res.status(500).json(`Failed to remove game from favorites: ${err}`)
    }
})

module.exports = router;