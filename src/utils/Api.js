const url = "https://freetestapi.com/api/v1/books";
const googleBooksApi =
  "https://www.googleapis.com/books/v1/volumes?key=AIzaSyBTvxuayOKBdf8C4ltJudMWzqZm987ZdKQ&q=hamid";

export async function fetchBookApi(query) {
  try {
    const result = await fetch(
      `https://freetestapi.com/api/v1/books?search=${query || ""}`
    );
    const data = await result.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.log("api error");
  }
}
