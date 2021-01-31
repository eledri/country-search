$("#resultTable").hide();

$("#searchAllButton").click(() => {
  $("#resultTable").show();
  $("tbody").empty();
  const countriesAllUrl = `https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;topLevelDomain;borders;flag`;
  getJsonFromRemoteServer(countriesAllUrl).then((data) => {
    for (let i = 0; i < data.length; i++) {
    

      if (data[i].borders == "") {
        data[i].borders = "No Borders to display";
      }

      for (let j = 0; j < data[i].currencies.length; j++) {
        if (
          data[i].currencies[j].code == undefined ||
          data[i].currencies[j].code == "(none)"
        ) {
          data[i].currencies[j].code = "No Currencies to display";
        }
          for (const item of data[i].currencies) {
          
        $("#tableTbody").append(`
    <tr><td>${data[i].name}</td>
    <td>${data[i].topLevelDomain}</td>
    <td>${data[i].capital}</td>
    <td>${item.currencies.code}</td>
    <td>${data[i].borders}</td>
    <td><img class="flag" src="${data[i].flag}"></td>
    </tr>
    `);
      }}
    }
  });
});

$("#searchButton").click(() => {
  $("#resultTable").show();
  $("tbody").empty();

  let oneCountry = $("#searchBox").val();
  const searchFilterUrl = `https://restcountries.eu/rest/v2/name/${oneCountry}?fields=name;capital;currencies;topLevelDomain;borders;flag`;
  getJsonFromRemoteServer(searchFilterUrl).then((data) => {
    for (let i = 0; i < data.length; i++) {
      for (const currency in data) {
      }
    }

    // $("#tableTbody").append(`
    // <tr><td>${item.name}</td>
    // <td>${item.topLevelDomain}</td>
    // <td>${item.capital}</td>
    // <td>${""}</td>
    // <td>${item.borders}</td>
    // <td><img class="flag" src="${item.flag}"></td>
    // </tr>
    // `);
  });
});

function getJsonFromRemoteServer(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success: (json) => resolve(json),
      error: (err) => reject(err),
    });
  });
}
