import axios from "axios";

export const translateText = async (
  text,
  targetLanguage
) => {

  try {

    const response =
      await axios.post(
        "https://translate.googleapis.com/translate_a/single",
        {},
        {
          params: {
            client: "gtx",
            sl: "en",
            tl: targetLanguage,
            dt: "t",
            q: text
          }
        }
      );

    return response.data[0]
      .map(item => item[0])
      .join("");

  } catch (error) {

    console.log(error);

    return text;
  }
};