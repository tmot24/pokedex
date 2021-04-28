import {useParams} from "react-router-dom";
import {Card, CardContent, CardMedia, Grid, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {pokeApi} from "./mockData";
import {upperChar} from "./utils";

const useStyle = makeStyles({
    root: {
        justifyContent: "center",
    },
    body: {
        margin: "20px",
        maxWidth: "max-content",

    },
    card: {
    },
    cardMedia: {
        width: "300px",
        height: "300px",
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    }

});

export const Pokemon = () => {
    const pokemonId = +useParams().id;
    const [pokemon, setPokemon] = useState(pokeApi.find(elem => elem.id === pokemonId));
    const classes = useStyle();

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
                                    return <Typography key={typeInfo.type.name} variant={"body1"}>{typeInfo.type.name}</Typography>
                                })
                            }
                        </Typography>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};