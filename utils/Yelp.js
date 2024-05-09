import axios from "axios";

const YELP_API_KEY =
  "uJI4RsbEJEXBkOnWlSiyBauNhtSANTBr1MNp9H7urUy4rkeWAJh6vbOsVC9TrEeRn6C9TH0yeXHI9oM84Zz_BSctygfvL5I6DACCQ6kJvs1qCyXRvVeE_65KX01-ZHYx";

const api = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
});

const getVenues = (location,terms) => {
  return api
    .get("/businesses/search", {
      params: {
        categories: terms,
        ...location
      },
    })
    .then((res) => {
      return res.data.businesses
    })
    .catch((error) => console.error(error));
};

export { getVenues };
