type GeoJSONType =
  | "FeatureCollection"
  | "Feature"
  | "Polygon"
  | "Point"
  | "MultiPoint"
  | "LineString"
  | "MultiLineString"
  | "MultiPolygon"
  | "GeometryCollection";

interface GeoJSONGeometry {
  type: GeoJSONType;
  coordinates: any; // You can specify the coordinates type more precisely based on your data
}

interface GeoJSONFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    image: string;
    details: string;
    color: string;
  };
  geometry: GeoJSONGeometry;
 
}

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
  imageOverlayUrl: string; // Add this property
}

export const data2:GeoJSONFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "31a94a36-218c-4aea-b3de-7e04faf08d35",
        name: "หฟกฟหก",
        image: "ฟหกฟหก",
        details: "หฟกหฟ",
        color: "#ffffff"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              121.70911,
              65.766727
            ],
            [
              122.324467,
              65.03506
            ],
            [
              126.544063,
              65.219894
            ],
            [
              124.17054,
              66.895596
            ],
            [
              121.70911,
              65.766727
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "a84c6528-6adc-4d48-9423-4406602f241b",
        name: "1",
        image: "1",
        details: "1",
        color: "#ffffff"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              119.495282,
              66.718199
            ],
            [
              120.517215,
              66.718199
            ],
            [
              120.176571,
              66.456275
            ],
            [
              119.396385,
              66.39916
            ],
            [
              119.495282,
              66.718199
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "0bbc207f-ad29-4792-8c27-410a86228be4",
        name: "2",
        image: "2",
        details: "2",
        color: "#ff0000"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              124.168765,
              66.705712
            ],
            [
              124.130306,
              66.670387
            ],
            [
              123.907788,
              66.596858
            ],
            [
              123.834989,
              66.692131
            ],
            [
              124.030037,
              66.72851
            ],
            [
              124.168765,
              66.705712
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "b56cd29e-d3f0-4552-b696-eb023d423e8b",
        name: "3",
        image: "3",
        details: "3",
        color: "#000000"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              130.846816,
              66.506951
            ],
            [
              130.777875,
              66.475985
            ],
            [
              130.683068,
              66.513592
            ],
            [
              130.846816,
              66.506951
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "f3a6c52c-db2d-427f-b804-b14582b2a348",
        name: "4",
        image: "4",
        details: "4",
        color: "#00ffb3"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              179.37781,
              63.626745
            ],
            [
              182.806231,
              62.955223
            ],
            [
              184.696258,
              64.510643
            ],
            [
              180.037122,
              64.396938
            ],
            [
              179.37781,
              63.626745
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "d31b9588-e533-4eb3-93d0-eff9ee892ec0",
        name: "5",
        image: "5",
        details: "5",
        color: "#c8ff00"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              209.330987,
              64.876938
            ],
            [
              209.396918,
              64.661517
            ],
            [
              212.078119,
              64.586185
            ],
            [
              210.122161,
              65.219894
            ],
            [
              209.330987,
              64.876938
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ea29589b-0743-48c0-bc23-c62b3a95022b",
        name: "6",
        image: "6",
        details: "6",
        color: "#5900ff"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              270.077113,
              68.879358
            ],
            [
              273.329718,
              68.236823
            ],
            [
              274.999975,
              68.942607
            ],
            [
              272.450636,
              69.809309
            ],
            [
              270.077113,
              68.879358
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "3027f86b-e7a6-4907-ba5b-5b078c635bf5",
        name: "7",
        image: "7",
        details: "7",
        color: "#00ffd5"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              32.188475,
              71.159391
            ],
            [
              33.023604,
              70.51757
            ],
            [
              30.144609,
              70.355706
            ],
            [
              31.946829,
              71.230221
            ],
            [
              32.188475,
              71.159391
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "d6c647a3-24e8-47cb-83d8-e96bead44003",
        name: "8",
        image: "8",
        details: "8",
        color: "#4baf4d"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              46.844316,
              72.121192
            ],
            [
              48.053055,
              71.951778
            ],
            [
              45.54767,
              71.80141
            ],
            [
              46.075119,
              72.175079
            ],
            [
              46.844316,
              72.121192
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "9fb8eb7a-c5af-4bf5-b4e3-9d7bf2b69860",
        name: "9",
        image: "9",
        details: "9",
        color: "#0033ff"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              54.893013,
              72.187686
            ],
            [
              54.901256,
              72.146471
            ],
            [
              54.752911,
              72.116132
            ],
            [
              54.647148,
              72.178021
            ],
            [
              54.893013,
              72.187686
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "df210e09-7b6d-4495-9393-8c839687f957",
        name: "10",
        image: "10",
        details: "10",
        color: "#0022a8"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              61.825217,
              65.476508
            ],
            [
              68.813922,
              67.187
            ],
            [
              60.990027,
              67.842416
            ],
            [
              58.88023,
              65.928554
            ],
            [
              61.825217,
              65.476508
            ]
          ]
        ]
      }
    }
  ],
  imageOverlayUrl: "https://busrc.com/wp-content/uploads/2021/09/map.png"
}