export async function getAllProjects() {
  await axios
      .get("https://covidtracking.com/api/v1/states/current.json")
      .then((response) => {
        setData(response.data);
        // you tell it that you had the result
        setLoadingData(false);
      });

  try {
    const url = "http://127.0.0.1:8000/api/account/boards";
  await axios

    const data = await response.json();
    return data.results;
  } catch (error) {
    return [];
  }
}
