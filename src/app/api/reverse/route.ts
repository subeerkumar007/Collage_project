import { NextResponse } from "next/server";

const sample = {
  data: [
    {
      latitude: 28.557163,
      longitude: 77.163665,
      type: "locality",
      name: "Delhi",
      number: null,
      postal_code: "110067",
      street: null,
      confidence: 1,
      region: "Delhi",
      region_code: "DL",
      county: "South West Delhi",
      locality: "Delhi",
      administrative_area: null,
      neighbourhood: null,
      country: "India",
      country_code: "IND",
      continent: "Asia",
      label: "Delhi, India",
      bbox_module: [76.842514, 28.403052, 77.347652, 28.879322],
      country_module: {
        latitude: 23.4060115814209,
        longitude: 79.45809173583984,
        common_name: "India",
        official_name: "Republic of India",
        capital: "New Delhi",
        flag: "🇮🇳",
        area: 3287590,
        landlocked: false,
        independent: true,
        global: {
          alpha2: "IN",
          alpha3: "IND",
          numeric_code: "356",
          region: "Asia",
          subregion: "Southern Asia",
          region_code: "142",
          subregion_code: "034",
          world_region: "APAC",
          continent_name: "Asia",
          continent_code: "AS",
        },
        dial: {
          calling_code: "91",
          national_prefix: "0",
          international_prefix: "00",
        },
        currencies: [
          {
            symbol: "₹",
            code: "INR",
            name: "Indian Rupee",
            numeric: 356,
            minor_unit: 2,
          },
        ],
        languages: {
          eng: "English",
          hin: "Hindi",
          tam: "Tamil",
        },
      },
      sun_module: {
        rise: {
          time: 1764379497,
          astronomical: 1764374520,
          civil: 1764377973,
          nautical: 1764376231,
        },
        set: {
          time: 1764417259,
          astronomical: 1764422237,
          civil: 1764418784,
          nautical: 1764420526,
        },
        transit: 1764398378,
      },
      timezone_module: {
        name: "Asia/Kolkata",
        offset_sec: 19800,
        offset_string: "+05:30",
      },
    },
  ],
};

export async function GET() {
  return NextResponse.json(sample);
}
