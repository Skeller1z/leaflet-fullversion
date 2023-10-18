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

export const data:GeoJSONFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "a78bd667-a016-40fc-8d67-4debccf56b5a",
        name: "โดม",
        image: "data:image/jpeg;base64,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",
        details: "นี่คือโดม",
        color: "#aeff00"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              32.066435,
              71.081182
            ],
            [
              31.813699,
              71.130988
            ],
            [
              31.374158,
              71.102543
            ],
            [
              31.176364,
              71.070493
            ],
            [
              30.989559,
              70.959697
            ],
            [
              29.791809,
              70.956113
            ],
            [
              29.681924,
              70.649051
            ],
            [
              29.418199,
              70.65633
            ],
            [
              29.440176,
              70.19255
            ],
            [
              29.385234,
              70.084305
            ],
            [
              29.418199,
              69.994294
            ],
            [
              29.473142,
              69.862328
            ],
            [
              30.561006,
              69.850978
            ],
            [
              30.550018,
              69.994294
            ],
            [
              31.05549,
              70.043098
            ],
            [
              31.220318,
              69.896342
            ],
            [
              31.330203,
              69.82826
            ],
            [
              31.824687,
              69.801724
            ],
            [
              32.011492,
              69.839622
            ],
            [
              32.505976,
              69.729528
            ],
            [
              32.473011,
              69.62651
            ],
            [
              33.132322,
              69.59589
            ],
            [
              35.395959,
              69.622685
            ],
            [
              36.384927,
              69.786545
            ],
            [
              36.593709,
              69.824471
            ],
            [
              36.758537,
              69.771356
            ],
            [
              37.176101,
              69.835835
            ],
            [
              37.538723,
              69.97173
            ],
            [
              37.604654,
              70.061839
            ],
            [
              37.604654,
              70.207436
            ],
            [
              37.296975,
              70.348318
            ],
            [
              37.000285,
              70.340927
            ],
            [
              37.044239,
              70.572458
            ],
            [
              37.264009,
              70.565148
            ],
            [
              37.505757,
              70.623552
            ],
            [
              37.505757,
              70.703582
            ],
            [
              37.582677,
              70.891482
            ],
            [
              37.70355,
              70.941769
            ],
            [
              37.461803,
              71.074056
            ],
            [
              36.73656,
              71.11677
            ],
            [
              36.571732,
              71.070493
            ],
            [
              36.033294,
              71.191296
            ],
            [
              35.46189,
              71.290223
            ],
            [
              34.736648,
              71.29727
            ],
            [
              33.8246,
              71.304315
            ],
            [
              33.352093,
              71.293747
            ],
            [
              32.670804,
              71.230221
            ],
            [
              32.407079,
              71.141644
            ],
            [
              32.066435,
              71.081182
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "169a9c01-de91-4f91-99c3-2cf13ae2565b",
        name: "ห้องภารโรง",
        image: "data:image/jpeg;base64,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",
        details: "นี่คือห้องภารโรง",
        color: "#ff0000"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              17.181629,
              75.501284
            ],
            [
              17.159652,
              75.331158
            ],
            [
              18.577172,
              75.331158
            ],
            [
              18.560689,
              75.501284
            ],
            [
              18.637609,
              75.504034
            ],
            [
              18.610138,
              75.589039
            ],
            [
              17.088226,
              75.591773
            ],
            [
              17.093721,
              75.501284
            ],
            [
              17.181629,
              75.501284
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "590a2fdc-c432-4675-b9c5-6280cc46d1e8",
        name: "ตึกคณะครุศาสตร์",
        image: "https://edu.skru.ac.th/course/images/10.jpg",
        details: "นี่คือตึกคณะครุศาสตร์",
        color: "#a8ffce"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              90.734468,
              62.664055
            ],
            [
              91.338851,
              62.709425
            ],
            [
              91.448736,
              62.573106
            ],
            [
              91.547633,
              62.446324
            ],
            [
              91.580598,
              62.267923
            ],
            [
              92.327818,
              62.293474
            ],
            [
              92.272876,
              62.456487
            ],
            [
              92.327818,
              62.562983
            ],
            [
              92.470669,
              62.573106
            ],
            [
              92.16299,
              63.283062
            ],
            [
              91.56961,
              63.297876
            ],
            [
              91.426759,
              63.258355
            ],
            [
              91.338851,
              63.357056
            ],
            [
              90.602619,
              63.357056
            ],
            [
              90.514711,
              63.248467
            ],
            [
              90.349883,
              63.248467
            ],
            [
              90.07517,
              63.263299
            ],
            [
              89.822434,
              63.243521
            ],
            [
              89.558709,
              63.243521
            ],
            [
              89.811445,
              62.532594
            ],
            [
              89.866388,
              62.446324
            ],
            [
              89.888365,
              62.288365
            ],
            [
              90.196044,
              62.252582
            ],
            [
              90.613608,
              62.257696
            ],
            [
              90.734481,
              62.369996
            ],
            [
              90.701516,
              62.512318
            ],
            [
              90.734468,
              62.664055
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "dadb3e03-4d56-4793-b1f5-720f86405f70",
        name: "ตึกคณะวิศวกรรม",
        image: "https://pbs.twimg.com/media/B_3gKcrUgAAPCjo.jpg",
        details: "นี่คือตึกคณะวิศวกรรม",
        color: "#99ff00"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              266.900139,
              67.424364
            ],
            [
              266.944093,
              66.917142
            ],
            [
              267.042989,
              66.835165
            ],
            [
              267.295726,
              66.878345
            ],
            [
              268.240739,
              66.434323
            ],
            [
              268.416556,
              66.425537
            ],
            [
              268.658303,
              66.324274
            ],
            [
              268.7572,
              66.253588
            ],
            [
              269.031913,
              66.275698
            ],
            [
              269.50442,
              66.271278
            ],
            [
              269.526397,
              66.182703
            ],
            [
              270.295609,
              66.29779
            ],
            [
              270.669219,
              66.315449
            ],
            [
              270.746139,
              66.770253
            ],
            [
              270.823059,
              66.817872
            ],
            [
              270.614277,
              66.947274
            ],
            [
              270.460437,
              66.955877
            ],
            [
              269.383562,
              67.483338
            ],
            [
              269.009952,
              67.474922
            ],
            [
              268.867101,
              67.563141
            ],
            [
              266.900139,
              67.424364
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "4c2cd843-f84b-445d-aa4d-b97b79af0acb",
        name: "หัวลำโพง",
        image: "https://www.prachachat.net/wp-content/uploads/2021/11/%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%A5%E0%B8%B3%E0%B9%82%E0%B8%9E%E0%B8%87-728x485.jpg",
        details: "นี่คือหัวลำโพง",
        color: "#ff00ea"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              146.458133,
              56.926993
            ],
            [
              149.957979,
              57.04073
            ],
            [
              150.018416,
              56.821927
            ],
            [
              149.996439,
              56.698474
            ],
            [
              149.968968,
              56.616954
            ],
            [
              146.546041,
              56.562509
            ],
            [
              146.430661,
              56.767778
            ],
            [
              146.458133,
              56.926993
            ]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "bc7a4e98-3261-4806-8129-d8ddccbbc6dd",
        name: "สำนักงานใหญ่",
        image: "https://os.mreport.co.th/medias/module-news/photo/200431229-00-Nissan-%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99-%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99-%E0%B9%82%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%94-19.jpg",
        details: "นี่คือสำนักงานใหญ่",
        color: "#0062ff"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              133.964351,
              62.945231
            ],
            [
              134.964307,
              62.34451
            ],
            [
              136.898288,
              61.856149
            ],
            [
              138.161969,
              61.501734
            ],
            [
              138.810292,
              61.291349
            ],
            [
              139.674119,
              61.172384
            ],
            [
              140.171352,
              61.111406
            ],
            [
              140.808687,
              61.022379
            ],
            [
              141.550413,
              60.954444
            ],
            [
              141.712498,
              60.947776
            ],
            [
              142.239634,
              61.116713
            ],
            [
              142.841256,
              61.357247
            ],
            [
              143.550016,
              61.635117
            ],
            [
              143.544175,
              62.058873
            ],
            [
              142.162367,
              62.26281
            ],
            [
              142.209068,
              62.302411
            ],
            [
              142.604656,
              62.420903
            ],
            [
              142.706299,
              62.443783
            ],
            [
              143.566152,
              62.319003
            ],
            [
              144.884658,
              62.110307
            ],
            [
              145.700556,
              62.389097
            ],
            [
              145.834927,
              62.442512
            ],
            [
              145.801961,
              62.589548
            ],
            [
              145.683834,
              62.65144
            ],
            [
              144.889913,
              62.798702
            ],
            [
              144.936614,
              63.124572
            ],
            [
              144.730792,
              63.241048
            ],
            [
              144.272021,
              63.302813
            ],
            [
              143.780285,
              63.296642
            ],
            [
              143.172538,
              63.189064
            ],
            [
              142.689043,
              63.159316
            ],
            [
              142.216536,
              63.337343
            ],
            [
              142.007754,
              63.302813
            ],
            [
              141.194603,
              63.729047
            ],
            [
              137.447514,
              63.421031
            ],
            [
              137.238732,
              63.416115
            ],
            [
              136.645352,
              63.675506
            ],
            [
              134.513577,
              63.49467
            ],
            [
              133.964351,
              62.945231
            ]
          ]
        ]
      }
    }
  ],
  imageOverlayUrl: "https://bsv-th-authorities.com/impage_pro/รายคณะ.jpg"
}