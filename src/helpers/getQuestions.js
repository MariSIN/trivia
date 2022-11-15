async function getQuestions(endpoint) {
  const tokenUser = localStorage.getItem('token');
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenUser}${endpoint}`);
  const response = await request.json();
  return response;
}

export default getQuestions;
