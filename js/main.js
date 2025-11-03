//Weather => Pokemon
//Enter Location => Get Weather in that location
//AND get random Pokemon from that region
//Unova = East Coast US
//Kalos = France/Western Europe
//Alola = Hawaii Tropical Region
//Galar = UK/Eastern Europe
//Paldea = Spain/Southern Europe
//Orre = West Coast/US
//Sinnoh = Japan


let us_eastCoast = ['Maine','New Hampshire','Vermont','Massachusetts', 'New York','Rhode Island', 
    'Connecticut','New Jersey','Pennsylvania', 'Delaware', 'Maryland', 'District of Columbia', 'West Virginia',
    'Ohio', 'Kentucky', 'Tennessee', 'Indiana', 'Wisconsin', 'Illinois', 'Alabama', 'Georgia', 'North Carolina',
    'South Carolina', 'Florida', 'Mississippi', 'Minnesota', 'Iowa', 'Missouri', 'Arkansas', 'Louisiana', 'Puerto Rico'
];
let us_westCoast = ['North Dakota', 'South Dakota', 'Nebraska', 'Kansas', 'Oklahoma',  'Montana', 'Wyoming', 
    'Colorado',  'Idaho',  'Washington', 'Oregon', 'California', 'Hawaii',
    'Alaska'
];
let us_desert = ['Utah','Nevada','Arizona','New Mexico','Texas']
let europe = ['Iceland', 'United Kingdom', 'Norway', 'Sweden', 'Finland','Belarus', 'Ukraine', 'Estonia', 
    'Lativa', 'Lithuania', 'Poland', 'Poland', 'Romania', 'Slovakia', 'Bulgaria', 'Austria', 'Germany', 'France',
    'Spain'
];
let africa = ['Egypt', 'Libya', 'Algeria', 'Tunisia', 'Morocco', 'Mauritania', 'Mali', 'Niger', 'Chad', 'Sudan',
    'Eritrea', 'Djibouti', 'Ethiopia', 'Somalia', 'Sudan', 'Chad', 'Nigeria', 'Senegal', 'The Gambia', 'Guinea', 
    'Ghana', 'Liberia', 'Sierra Leone', 'Cameroon', 'Central African Republic', 'Uganda', 'Kenya', 'Tanzania', 
    'Remocratic Republic of the Congo', 'Gabon', 'Angola', 'Zambia', 'Malawi', 'Madagascar', 'Mozambique', 
    'Zimbabwe', 'Botswana', 'Nambibia', 'Eswatini', 'South Africa'
];
let asia = ['China', 'Mongolia', 'Russia', 'Korea', 'Japan', 'Taiwan', 'Philippines',
    'India', 'Pakistan', 'Nepal', 'Bangladesh', 'Myanmar', 'Laos', 'Thailand', 'Cambodia', 'Vietnam',
    'Malaysia', 'Singapore', 'Indonesia', 
]

let regions = ['Unova', 'Orre', 'Paldea', 'Galar', 'Alola', 'Kalos', 'Sinnoh',
    'Kanto', 'Johto', 'Hoenn'
];

let generations = ['generation i', 'generation ii', 'generation iii', 'generation iv',
    'generation v', 'generation vi', 'generation vii', 'generation viii', 'generation ix'
]

const regionDexRanges = {
  'Kanto': [1, 151],
  'Johto': [152, 251],
  'Hoenn': [252, 386],
  'Sinnoh': [387, 493],
  'Unova': [494, 649],
  'Kalos': [650, 721],
  'Alola': [722, 809],
  'Galar': [810, 905],
  'Paldea': [906, 1025],
  'Orre': [10000, 10010],
};

document.querySelector('button').addEventListener('click',getRealRegion);

async function getRealRegion() {
  const wildCardInput = document.querySelector('#wildCard').value;
  const kagi = '573e39e3da904aa38cf155148250310';
  const wildCardUrl = `https://api.weatherapi.com/v1/current.json?key=${kagi}&q=${wildCardInput}`;

  try {
    const response = await fetch(wildCardUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    
    const locCountry = data.location.country;
    const locName = data.location.name;

    document.querySelector('#temp_f').innerText = data.current.temp_f;
    document.querySelector('#weatherConditions').innerText = data.current.condition.text;
    document.querySelector('#country').innerText = locCountry;
    document.querySelector('#locName').innerText = locName;

    getPokeRegion(locName, locCountry);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function mapToPokeRegion(locName, locCountry) {
  if (us_eastCoast.includes(locName) || us_eastCoast.includes(locCountry)) {
    return 'Unova'; // East Coast
  }
  if (us_westCoast.includes(locName) || us_westCoast.includes(locCountry)) {
    return 'Orre'; // West Coast
  }
  if (us_desert.includes(locName) || us_desert.includes(locCountry)) {
    return 'Orre'; // Desert = Orre region
  }

  if (europe.includes(locCountry)) {
    if (locCountry === 'France') return 'Kalos';
    if (locCountry === 'United Kingdom') return 'Galar';
    if (locCountry === 'Spain') return 'Paldea';
    return 'Galar';
  }

  if (asia.includes(locCountry)) {
    if (locCountry === 'Japan') return 'Sinnoh';
    return 'Kanto';
  }

  if (africa.includes(locCountry)) {
    return 'Hoenn';
  }

  if (locCountry === 'Hawaii' || locName === 'Honolulu') {
    return 'Alola';
  }

  return 'Unknown Region';
}

function getPokeRegion(locName, locCountry) {
    
    console.log(`Location Name: ${locName}`);
    console.log(`Country: ${locCountry}`);

    const pokeRegion = mapToPokeRegion(locName, locCountry);
    getRandomPokemonFromRegion(pokeRegion);
    document.querySelector('#regionText').innerText = pokeRegion;

    //let search = document.querySelector('#wildCard').value;
    //let pokeID = 2;
    //let url =  `https://pokeapi.co/api/v2/pokedex/${pokeID}/`;
   // let url = `https://pokeapi.co/api/v2/pokemon/${search}`;

    //fetch(url) //fetch at this url
       // .then(response => response.json()) //then get the response data
      //  .then(fetched => { //renamed to fetched because the actual data array is called 'data' smh
            //console.table(fetched)
            //document.querySelector('#monName').innerText = ;
            //document.querySelector('#monType').innerText = fetched.types[0].type.name;
            //document.querySelector('#pkmnRegion').innerText = fetched
     //   }) //then start using the data
     //   .catch(error => console.error(error)); //catch errors instead of crashing or something
}

async function getRandomPokemonFromRegion(region) {
  const [start, end] = regionDexRanges[region] || [1, 1025];
  const randomId = Math.floor(Math.random() * (end - start + 1)) + start;
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}/`;

  const response = await fetch(url);
  const data = await response.json();

  document.querySelector('#monName').innerText = data.name;
  document.querySelector('#sprite').src = data.sprites.front_default;
  document.querySelector('#typeOne').innerText = data.types[0].type.name;
  document.querySelector('#typeTwo').innerText = data.types[1]?.type.name || '';

  console.log(`Fetched ${data.name} from ${region}`);
}

