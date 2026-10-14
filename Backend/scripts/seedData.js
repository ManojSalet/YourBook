import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online_bookstore");
    console.log("Connected to MongoDB for seeding...");

    // Clear existing collections
    await User.deleteMany();
    await Category.deleteMany();
    await Book.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    console.log("Cleared old data.");

    // 1. Seed Users
    const adminUser = await User.create({
      username: "Admin",
      email: "admin@test.com",
      password: "admin123",
      role: "ADMIN",
    });

    const demoUser = await User.create({
      username: "Manoj",
      email: "manoj@test.com",
      password: "test123",
      role: "USER",
    });

    console.log("Seeded Users:");
    console.log(" - Admin: admin@test.com / admin123");
    console.log(" - User:  manoj@test.com / test123");

    // 2. Seed Categories
    const categoriesData = [
      {
        name: "Technology",
        description: "Modern software engineering, cloud architecture, system design, and AI.",
      },
      {
        name: "Fiction",
        description: "Captivating narratives, contemporary novels, and timeless literature.",
      },
      {
        name: "Self-Help",
        description: "Empowerment, productivity routines, mindfulness, and personal habits.",
      },
      {
        name: "Science Fiction",
        description: "Futuristic societies, interstellar journeys, and mind-bending concepts.",
      },
      {
        name: "Finance & Business",
        description: "Wealth building, startup leadership, market dynamics, and strategy.",
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Seeded ${createdCategories.length} categories.`);

    const catMap = {};
    createdCategories.forEach((c) => {
      catMap[c.name] = c._id;
    });

    // 3. Seed Books
    const booksData = [
      {
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        description: "A must-read handbook on writing clean, readable, maintainable software and professional code ethics.",
        price: 849,
        stockQuantity: 25,
        imageUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=600",
        category: catMap["Technology"],
      },
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        description: "The definitive guide to distributed data systems, scalability, consistency, and storage engines.",
        price: 1299,
        stockQuantity: 18,
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
        category: catMap["Technology"],
      },
      {
        title: "The Pragmatic Programmer",
        author: "David Thomas & Andrew Hunt",
        description: "Enduring wisdom and core principles for becoming a versatile, impactful full-stack craftsman.",
        price: 950,
        stockQuantity: 30,
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
        category: catMap["Technology"],
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        description: "Tiny changes that produce remarkable lifelong results in productivity, focus, and wellness.",
        price: 499,
        stockQuantity: 40,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
        category: catMap["Self-Help"],
      },
      {
        title: "Deep Work: Rules for Focused Success in a Distracted World",
        author: "Cal Newport",
        description: "Master the ability to focus without distraction on cognitively demanding tasks to thrive in the modern economy.",
        price: 450,
        stockQuantity: 20,
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
        category: catMap["Self-Help"],
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        description: "Timeless lessons on wealth, greed, and happiness that show how behavior matters far more than intelligence.",
        price: 399,
        stockQuantity: 35,
        imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=600",
        category: catMap["Finance & Business"],
      },
      {
        title: "Zero to One: Notes on Startups",
        author: "Peter Thiel",
        description: "How to build companies that create singular breakthroughs and escape competitive commoditization.",
        price: 520,
        stockQuantity: 22,
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600",
        category: catMap["Finance & Business"],
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        description: "The legendary science fiction epic set on the desert planet Arrakis, exploring politics, religion, and power.",
        price: 699,
        stockQuantity: 15,
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
        category: catMap["Science Fiction"],
      },
      {
        title: "Project Hail Mary",
        author: "Andy Weir",
        description: "A lone astronaut must solve an extinction-level crisis in an exhilarating tale of scientific survival and camaraderie.",
        price: 599,
        stockQuantity: 28,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
        category: catMap["Science Fiction"],
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "An indelible portrait of the Roaring Twenties, jazz, glamour, unrequited love, and the American dream.",
        price: 299,
        stockQuantity: 50,
        imageUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600",
        category: catMap["Fiction"],
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "The unforgettable Pulitzer Prize-winning classic about justice, empathy, and courage in the American South.",
        price: 380,
        stockQuantity: 32,
        imageUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600",
        category: catMap["Fiction"],
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        description: "The magical journey of an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
        price: 320,
        stockQuantity: 45,
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        category: catMap["Fiction"],
      },
    ];

    const createdBooks = await Book.insertMany(booksData);
    console.log(`Seeded ${createdBooks.length} books.`);

    // 4. Seed an initial sample order for the demo user
    const sampleOrder = await Order.create({
      userId: "manoj@test.com",
      items: [
        {
          book: createdBooks[0]._id,
          quantity: 1,
          priceAtPurchase: createdBooks[0].price,
        },
        {
          book: createdBooks[3]._id,
          quantity: 2,
          priceAtPurchase: createdBooks[3].price,
        },
      ],
      totalPrice: createdBooks[0].price + createdBooks[3].price * 2,
      status: "PROCESSING",
      orderDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
    });

    console.log(`Seeded sample order #${sampleOrder._id} for demo user.`);
    console.log("✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();

