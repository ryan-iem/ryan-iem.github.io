let mapWidth = 4;
let mapHeight = 4; // find way to get length of this in function
let character = null;

const mat = [
  ['H', 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 'C', 15]
];

for (let x=0;x<mapWidth;x++) { 
    for (let y=0;y<mapHeight;y++) { 
        // console.log(mat[x][y]);

    }
}

// https://stackoverflow.com/questions/14643617/create-table-using-javascript
function tableCreate() {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '200px';
    tbl.style.height = '200px';

  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');
  for (var y = 0; y < mapHeight; y++) {
    var tr = document.createElement('tr');
    for (var x = 0; x < mapWidth; x++) {
        var td = document.createElement('td');

        if ((mat[y][x]) == 'H') { // Home
            td.appendChild(document.createTextNode('\u{1F6D6}'));
        } else if ((mat[y][x]) == 'C') { // Character 
            td.appendChild(document.createTextNode('\u{1F439}')); 
            
        } else {
            td.appendChild(document.createTextNode(mat[y][x]));
        }

        tr.appendChild(td)
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
tableCreate();


// const fruits = ["apple", "banana", "cherry"];

// for (let i = 0; i < fruits.length; i++) {
//   console.log(fruits[i]);
// }

const cars = ["Saab", "Volvo", "BMW"];
// document.getElementById("demo").innerHTML =  cars[0];