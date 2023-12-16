import * as i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      feedMessages: {
        error: "Something went wrong, try again",
      },

      header: {
        title: "Shop Page",
        search: "Search",
        menuItems: {
          profile: "Profile",
          cart: "Cart",
          settings: "Settings",
          logout: "Logout",
        },
      },

      shopPage: {
        breadcrumbs: {
          home: "Home",
          choose: "Choose category",
        },
        filter: {
          title: "Filters",
          rate: {
            label: "With rate and higher",
          },
          gender: {
            label: "Gender",
            female: "Female",
            male: "Male",
            other: "Other",
          },
          brand: {
            label: "Brand",
            boss: "BOSS",
            levis: "Levi's",
            guess: "Guess",
          },
        },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({ resources, lng: "en", interpolation: { escapeValue: false } });

export default i18n;
