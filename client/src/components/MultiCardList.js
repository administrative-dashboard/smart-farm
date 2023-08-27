import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const MultiCardList = ({ data, selectedCard, handleCardSelection }) => (
    <div
        style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
            marginTop: "20px",
            marginLeft: "200px"
        }}
    >
        {data.map((item, index) => (
            <Card
                key={index}
                component="div"
                sx={{
                    maxWidth: "280px",
                    '&:hover': {
                        cursor: "pointer",
                    },
                    border: selectedCard && selectedCard.title === item.title ? "2px solid #1f4700" : "2px solid transparent",
                }}
                onClick={() => handleCardSelection(item.title, item.link)} 
            >
                <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "100%", height: "auto" }}
                />
                <CardContent>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: selectedCard && selectedCard.title === item.title ? 'black' : 'inherit',
                            fontFamily: 'Roboto',
                        }}
                    >
                        {item.title}
                    </Typography>
                </CardContent>
            </Card>
        ))}
    </div>
);

export default MultiCardList;
