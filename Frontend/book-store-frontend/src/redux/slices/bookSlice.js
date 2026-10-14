import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: 1,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741547143/Atomic_Habits_vfzo2u.jpg", // Add image URL
      title: "Atomic Habits",
      author: "James Clear",
      price: 18.99,
      rating: 4.8,
      description:
        "A guide on how small habits can lead to remarkable results in personal and professional life.",
      category: "Self-Help",
    },
    {
      id: 2,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546171/The_5_AM_Club_dh65mr.jpg", // Add image URL
      title: "The 5 AM Club",
      author: "Robin Sharma",
      price: 14.99,
      rating: 4.5,
      description:
        "A book about morning routines and how waking up early can transform your life.",
      category: "Self-Help",
    },
    {
      id: 3,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546170/The_Alchemist_zs7hy8.jpg", // Add image URL
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 12.99,
      rating: 4.7,
      description:
        "A philosophical novel about following one's dreams and destiny.",
      category: "Fiction",
    },
    {
      id: 4,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546170/Rich_Dad_Poor_Dad_hrxkp9.jpg", // Add image URL
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 15.49,
      rating: 4.6,
      description:
        "A personal finance book that challenges conventional views on money and investing.",
      category: "Business & Finance",
    },
    {
      id: 5,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546169/1984_tjc43k.jpg", // Add image URL
      title: "1984",
      author: "George Orwell",
      price: 10.99,
      rating: 4.9,
      description:
        "A dystopian novel that explores the dangers of totalitarianism and government surveillance.",
      category: "Science Fiction",
    },
    {
      id: 6,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546167/The_Subtle_Art_of_Not_Giving_a_Fck_lgxvo1.jpg", // Add image URL
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      price: 16.99,
      rating: 4.3,
      description:
        "A brutally honest self-help book about prioritizing what truly matters in life.",
      category: "Self-Help",
    },
    {
      id: 7,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546169/To_Kill_a_Mockingbird_hy8bwh.jpg", // Add image URL
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 11.99,
      rating: 4.8,
      description:
        "A classic novel about racism and injustice in the American South.",
      category: "Fiction",
    },
    {
      id: 8,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546168/Think_and_Grow_Rich_ropq3n.jpg", // Add image URL
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: 13.99,
      rating: 4.7,
      description:
        "A motivational book that outlines principles for success and wealth creation.",
      category: "Business & Finance",
    },
    {
      id: 9,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546167/The_Psychology_of_Money_n72jv7.jpg", // Add image URL
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 19.99,
      rating: 4.8,
      description:
        "A book that explores how people think about money and personal finance.",
      category: "Business & Finance",
    },
    {
      id: 10,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546167/Sapiens_A_Brief_History_of_Humankind_jhacwk.jpg", // Add image URL
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      price: 21.99,
      rating: 4.9,
      description:
        "A historical exploration of how humans evolved and shaped the modern world.",
      category: "History",
    },
    {
      id: 11,
      imgsrc: "https://res.cloudinary.com/dkkduci4b/image/upload/v1741546167/The_Lean_Startup_n2l2js.jpg", // Add image URL
      title: "The Lean Startup",
      author: "Eric Ries",
      price: 17.99,
      rating: 4.6,
      description:
        "A book about how startups can efficiently develop products through lean methodologies.",
      category: "Business & Finance",
    },
    {
      id: 12,
      imgsrc: "", // Add image URL
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      price: 9.99,
      rating: 4.9,
      description: "The first book in the famous Harry Potter fantasy series.",
      category: "Fantasy",
    },
    {
      id: 13,
      imgsrc: "", // Add image URL
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 14.99,
      rating: 4.8,
      description:
        "A fantasy novel about the journey of Bilbo Baggins and the adventure of a lifetime.",
      category: "Fantasy",
    },
    {
      id: 14,
      imgsrc: "", // Add image URL
      title: "Dune",
      author: "Frank Herbert",
      price: 18.99,
      rating: 4.7,
      description:
        "A science fiction novel set in a distant future with politics, religion, and ecology.",
      category: "Science Fiction",
    },
    {
      id: 15,
      imgsrc: "", // Add image URL
      title: "Meditations",
      author: "Marcus Aurelius",
      price: 12.49,
      rating: 4.5,
      description:
        "A collection of personal writings by the Roman Emperor on stoic philosophy.",
      category: "Philosophy",
    },
  ],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});

export default bookSlice.reducer;
