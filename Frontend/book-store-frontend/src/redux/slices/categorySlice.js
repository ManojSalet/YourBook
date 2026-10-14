import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorys: [
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086105/action_advanture_fnm3cz.png",
      alt: "Action & Adventure",
      cardTitle: "Action & Adventure",
      cardText:
        "Action & Adventure books are full of excitement and danger. They are often pacy and thrilling, and are sure to keep you on the edge of your seat.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086103/Science_Finction_out4bz.png",
      alt: "Science Fiction",
      cardTitle: "Science Fiction",
      cardText:
        "Sci-Fi books explore futuristic worlds, advanced technology, and space travel. They challenge the limits of imagination and reality.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741330251/Mystery_Suspense_xleijx.webp",
      alt: "Mystery & Suspense",
      cardTitle: "Mystery & Suspense",
      cardText:
        "Mystery books are full of suspense, twists, and thrilling discoveries. They keep you guessing until the very last page.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741329937/Fantasy_d5zwlj.webp",
      alt: "Fantasy",
      cardTitle: "Fantasy",
      cardText:
        "Fantasy books transport readers to magical worlds with mythical creatures, powerful magic, and epic adventures.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086104/Romance_u9sylp.png",
      alt: "Romance",
      cardTitle: "Romance",
      cardText:
        "Romance novels focus on love stories, deep emotions, and relationships, often with heartwarming and passionate moments.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086104/Horror_gjriud.png",
      alt: "Horror",
      cardTitle: "Horror",
      cardText:
        "Horror books bring fear and suspense with spine-chilling stories that will keep you awake at night.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741330102/Biography_Memoir_onfaqn.jpg",
      alt: "Biography & Memoir",
      cardTitle: "Biography & Memoir",
      cardText:
        "Biographies and memoirs tell real-life stories of inspiring people, their journeys, and personal experiences.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086103/Self_Help_mk8vep.png",
      alt: "Self-Help",
      cardTitle: "Self-Help",
      cardText:
        "Self-help books provide motivation, personal growth strategies, and techniques to improve different aspects of life.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086105/action_advanture_fnm3cz.png",
      alt: "History",
      cardTitle: "History",
      cardText:
        "History books dive into the past, exploring important events, civilizations, and remarkable individuals who shaped the world.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086105/action_advanture_fnm3cz.png",
      alt: "Philosophy",
      cardTitle: "Philosophy",
      cardText:
        "Philosophy books explore deep questions about existence, morality, and knowledge, offering new ways of thinking.",
      btnText: "Explore",
    },
    {
      imgsrc:
        "https://res.cloudinary.com/dkkduci4b/image/upload/v1741086105/action_advanture_fnm3cz.png",
      alt: "Business & Finance",
      cardTitle: "Business & Finance",
      cardText:
        "Business books provide insights into entrepreneurship, investing, leadership, and financial success strategies.",
      btnText: "Explore",
    },
  ],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {}
})

export default categorySlice.reducer;   
