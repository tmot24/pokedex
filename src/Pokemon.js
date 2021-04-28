import {useParams} from "react-router-dom";
import {Button, Card, CardContent, CardMedia, CircularProgress, Grid, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import {upperChar} from "./utils";
import axios from "axios";

const useStyle = makeStyles({
    root: {
        justifyContent: "center",
    },
    body: {
        margin: "20px",
        maxWidth: "max-content",

    },
    card: {},
    cardMedia: {
        width: "300px",
        height: "300px",
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    }

});

export const Pokemon = ({history}) => {
    const pokemonId = +useParams().id;
    const [pokemon, setPokemon] = useState();
    const classes = useStyle();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => setPokemon(response.data))
            .catch(error => setPokemon(false));
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const {name, id, species, height, weight, types, sprites: {front_default}} = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

        return (
            <Grid container className={classes.root}>
                <Grid item className={classes.body}>
                    <Card square className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant={"h1"}>
                                {id}. {upperChar(name)}
                                <img src={front_default} alt={"front_default"}/>
                            </Typography>
                        </CardContent>
                        <CardMedia
                            className={classes.cardMedia}
                            image={fullImageUrl}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography variant={"h3"}>Pokemon Info</Typography>
                            <Typography>Species: <Link href={species.url}>{species.name}</Link></Typography>
                            <Typography>Height: {height}</Typography>
                            <Typography>Weight: {weight}</Typography>
                            <Typography component={'span'}>
                                Types:
                                {
                                    types.map(typeInfo => {
                                        return <Typography key={typeInfo.type.name}
                                                           variant={"body1"}>{typeInfo.type.name}</Typography>;
                                    })
                                }
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    };

    return (
        <>
            {pokemon !== undefined && (
                <Button variant={"contained"} onClick={() => history.push("/")}>
                    back to pokedex
                </Button>
            )}
            {pokemon === undefined && <CircularProgress/>}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Not found</Typography>}
        </>
    );
};