export default [
  {
    id: 158,
    name: "Hello My Name Is Zé (w/ 2Cabeças)",
    tagline: "Passionfruit IPA - 2Cabecas Collab.",
    first_brewed: "03/2014",
    description:
      "Punk multiplied by Jack Hammer, divided by passionfruit with some Brazilian spirit factored in too. A well-rounded IPA, with bags of tropical flavour boosted by the addition of passionfruit, which unsurprisingly dominates the aroma of this summery IPA.",
    image_url: "https://images.punkapi.com/v2/158.png",
    abv: 6.4,
    ibu: 50,
    target_fg: 1012,
    target_og: 1061,
    ebc: 20,
    srm: 10,
    ph: 4.4,
    attenuation_level: 80.3,
    volume: { value: 20, unit: "litres" },
    boil_volume: { value: 25, unit: "litres" },
    method: {
      mash_temp: [{ temp: { value: 65, unit: "celsius" }, duration: null }],
      fermentation: { temp: { value: 19, unit: "celsius" } },
      twist: "Passionfruit: 438g at End"
    },
    ingredients: {
      malt: [
        { name: "Extra Pale", amount: { value: 4.88, unit: "kilograms" } },
        { name: "Caramalt", amount: { value: 0.75, unit: "kilograms" } }
      ],
      hops: [
        {
          name: "Vic Secret",
          amount: { value: 12.5, unit: "grams" },
          add: "start",
          attribute: "bitter"
        },
        {
          name: "Centennial",
          amount: { value: 12.5, unit: "grams" },
          add: "middle",
          attribute: "flavour"
        },
        {
          name: "Centennial",
          amount: { value: 12.5, unit: "grams" },
          add: "end",
          attribute: "flavour"
        },
        {
          name: "Kohatu",
          amount: { value: 16.5, unit: "grams" },
          add: "end",
          attribute: "flavour"
        },
        {
          name: "Vic Secret",
          amount: { value: 12.5, unit: "grams" },
          add: "dry hop",
          attribute: "aroma"
        },
        {
          name: "Citra",
          amount: { value: 62.5, unit: "grams" },
          add: "dry hop",
          attribute: "aroma"
        },
        {
          name: "Simcoe",
          amount: { value: 87.5, unit: "grams" },
          add: "dry hop",
          attribute: "aroma"
        },
        {
          name: "Centennial",
          amount: { value: 37.5, unit: "grams" },
          add: "dry hop",
          attribute: "aroma"
        },
        {
          name: "Amarillo",
          amount: { value: 50, unit: "grams" },
          add: "dry hop",
          attribute: "aroma"
        }
      ],
      yeast: "Wyeast 1056 - American Ale™"
    },
    food_pairing: [
      "Grilled lamb chops with a fruit reduction",
      "Ginger and chilli beef stir fry",
      "Passionfruit soufflé"
    ],
    brewers_tips:
      "Try adding some of the passionfruit in the cold conditioning phase.",
    contributed_by: "Sam Mason <samjbmason>"
  }
];
