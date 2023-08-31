import News from "../model/news.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const country = process.env.country;
const API_KEY = process.env.API_KEY;

export const getNews = async (request, response) => {
  try {
    const size = Number(request.query.size);
    const skip = Number(request.query.page);
    console.log(size, skip);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
    yesterday.setHours(0, 0, 0, 0);
    console.log(yesterday);

    const art = await News.findOne({ timestamp: yesterday.toISOString() });
    console.log(art);
    if (art) {
      console.log("article found");
    } else {
      console.log("article not found");
    }
    if (!art) {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
      );
      console.log("pukaawe");
      // console.log(res.data);

      const convertedArticles = [];

      res.data.articles.forEach((article) => {
        // Check if any value in the article is null, if so, skip this article
        // console.log(article);
        if (
          article.title !== null &&
          article.author !== null &&
          article.description !== null &&
          article.urlToImage !== null &&
          article.publishedAt !== null &&
          article.url !== null &&
          article.source.name !== null
        ) {
          const PuAt = new Date(article.publishedAt);
          console.log(typeof PuAt);
          PuAt.setHours(0, 0, 0, 0);
          const convertedArticle = {
            title: article.title.toString(),
            author: article.author.toString(),
            description: article.description.toString(),
            url: article.urlToImage.toString(),
            timestamp: PuAt.toISOString(),
            link: article.url.toString(),
            publisher: article.source.name.toString(),
          };
          console.log(convertedArticle.timestamp);

          convertedArticles.push(convertedArticle);
        }
      });

      console.log("doooneeeee");
      await News.insertMany(convertedArticles);
      console.log("inserted");
    }
    const data = await News.find({})
      .limit(size)
      .skip(size * skip);
    console.log("got data");
    // console.log(data.count());
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
