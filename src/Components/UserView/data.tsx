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
}

export const data: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: "3631f7bc-3dd3-45e4-83c8-0d1dd42542b5",
          name: "Building",
          image: "data:image/png;base64,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",
          details: "GGGGG",
          color: "#04ff00"
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                134.576189,
                63.460329
              ],
              [
                136.466216,
                63.714455
              ],
              [
                138.00461,
                63.164276
              ],
              [
                139.367188,
                62.764783
              ],
              [
                139.916614,
                62.825056
              ],
              [
                143.367012,
                62.186014
              ],
              [
                143.674691,
                61.543641
              ],
              [
                141.718733,
                60.962444
              ],
              [
                139.389165,
                61.270233
              ],
              [
                137.477161,
                61.564574
              ],
              [
                136.048652,
                61.990588
              ],
              [
                134.971776,
                62.257696
              ],
              [
                134.246533,
                62.744665
              ],
              [
                133.850946,
                62.955223
              ],
              [
                134.576189,
                63.460329
              ]
            ]
          ]
        }
      },
      {
        type: "Feature",
        properties: {
          id: "cf460821-49e8-4f4e-8c1e-1af0627a7f0b",
          name: "DDDD",
          image: "https://e0.365dm.com/23/06/1024x768/skysports-premier-league-football_6188162.jpg?20230615123934",
          details: "ADAsdasdsa",
          color: "#ff0000"
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                147.165949,
                65.63109
              ],
              [
                147.429673,
                65.293468
              ],
              [
                147.495604,
                65.173806
              ],
              [
                148.968067,
                65.201468
              ],
              [
                148.880159,
                65.55846
              ],
              [
                148.836205,
                65.694476
              ],
              [
                147.82526,
                65.694476
              ],
              [
                147.363742,
                65.766727
              ],
              [
                147.165949,
                65.63109
              ]
            ]
          ]
        }
      }
    ]
  }