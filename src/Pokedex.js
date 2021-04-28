import {AppBar, Card, CardContent, CardMedia, CircularProgress, Grid, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {pokeApi} from "./mockData";
import {useState} from "react";
import {upperChar} from "./utils";

const useStyles = makeStyles({
    root: {
        display: "flex",
        height: "100vh",
        flexDirection: "column",
    },
    header: {

    },
    pokedexContainer: {
        padding: "20px",
        minHeight: "auto",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        margin: "16px",
    },
    cardMedia: {
        width: "130px",
        height: "130px",
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    }
});

export const Pokedex = ({history}) => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(pokeApi);

    return (
        <div className={classes.root}>
            <AppBar className={classes.header} position={"static"}>
                <Toolbar/>
            </AppBar>
            {pokemonData ? (
                <Grid container className={classes.pokedexContainer}>
                    {
                        pokemonData.map(pokemon =>
                            <GetPokemonCard history={history} key={pokemon.id} pokemon={pokemon}/>
                        )
                    }
                </Grid>
            ) : (<Grid container className={classes.pokedexContainer}>
                    <CircularProgress size={"10rem"}/>
                </Grid>
            )}

        </div>
    );
};

const GetPokemonCard = ({pokemon, history}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={4}>
            <Card square className={classes.card} onClick={() => history.push(`/${pokemon.id}`)}>
                <CardMedia
                    className={classes.cardMedia}
                    image={pokemon.sprites.front_default}
                />
                <CardContent className={classes.cardContent}>
                    <Typography>
                        {pokemon.id}. {upperChar(pokemon.name)}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

