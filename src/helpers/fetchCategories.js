async function fetchCategories() {
  try {
    const request = await fetch('https://opentdb.com/api_category.php');
    const response = await request.json();
    console.log(response.trivia_categories[0]);
    return response.trivia_categories;
  } catch (error) {
    console.log(error);
  }
}

export default fetchCategories;
