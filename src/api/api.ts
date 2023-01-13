//  Since there is no need to use more frequent
// api in this application I am using simple fetch

interface SearchType {
  [key: string]: string | number;
}
export const fetchQuestionsApi = async (search: SearchType) => {
  //to suport any search params create dynamic url with search input as object
  const urlWithSearchParam = new URL(
    "https://the-trivia-api.com/api/questions"
  );

  Object.keys(search)?.map((key: string) => {
    urlWithSearchParam.searchParams.append(key, search[key]?.toString());
  });

  let response = await fetch(urlWithSearchParam, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // if HTTP-status is 200-299
    return await response.json();
  } else {
    //if api respond with error code it will show alert
    alert("HTTP-Error: " + response.status);
  }
};

//session can't be use for unique question due to api key is not available for free
export const getSessionApi = async () => {
  let response = await fetch("https://the-trivia-api.com/api/session", {
    headers: {
      "x-api-key": "myApiKey",
    },
  });

  console.log(response);

  return await response.json();
};
