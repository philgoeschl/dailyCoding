const people = [
    {name: "John", street: "Sunrise Ave 1", city: "Doeville", state: "Doestate", country: "Doeland", telephone: "+123456789", birthday: "1980-01-01"},
    {name: "Jane", street: "Sunrise Ave 2", city: "Doeville", state: "Doestate", country: "Doeland", telephone: "+234567891", birthday: "1986-04-20"},
    {name: "Donald", street: "Sunset Ave 1", city: "Doeville", state: "Doestate", country: "Doeland", telephone: "+123456789", birthday: "1980-09-09"},
    {name: "Alex", street: "Sunset Ave 2", city: "Doeville", state: "Doestate", country: "Doeland", telephone: "+234567891", birthday: "1986-12-20"},
    {name: "James", street: "Middle Ave 1", city: "Doeville", state: "Doestate", country: "Doeland", telephone: "+123456789", birthday: "1994-02-10"},
    {name: "Ben", street: "Middle Ave 2", city: "Doeville", state: "Doestate", country: "Doeland", telephone: "+234567891", birthday: "1988-08-29"}
  ];

ul = document.createElement('ul');
details = document.getElementById('details');

document.getElementById('result').appendChild(ul);

people.forEach(function(item) {
    let li = document.createElement('li');
    li.onclick = function () {
        showPersonDetails(item.name)
    }
    ul.appendChild(li);

    li.innerHTML += item.name;
});

function showPersonDetails(item) {
    personDetails = (people.find(x => x.name === item))
    console.log(personDetails)

    details.innerHTML = `
        Name: ${personDetails.name}</br>
        Street: ${personDetails.street}</br>
        City: ${personDetails.city}</br>
        State: ${personDetails.state}</br>
        Country: ${personDetails.country}</br>
        Birthday: ${personDetails.birthday}</br>
        Telephone: ${personDetails.telephone}</br>
        
        `
    
}