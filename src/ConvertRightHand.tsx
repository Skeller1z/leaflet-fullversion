export function conformToRightHandRule(geoJSON: {
    properties: any; type: string; coordinates: any; 
}) {
    if (geoJSON.type === "Polygon") {
      const coordinates = geoJSON.coordinates;
      if (isClockwise(coordinates)) {
        // Swap the order of the coordinates
        geoJSON.coordinates = coordinates.reverse();
      }
    } else if (geoJSON.type === "MultiPolygon") {
      const polygons = geoJSON.coordinates;
      for (const polygon of polygons) {
        if (isClockwise(polygon[0])) {
          // Swap the order of the coordinates
          polygon[0] = polygon[0].reverse();
        }
      }
    }
    return geoJSON;
  }

  function isClockwise(coordinates: string | any[]) {
    let sum = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const [x1, y1] = coordinates[i];
      const [x2, y2] = coordinates[i + 1];
      sum += (x2 - x1) * (y2 + y1);
    }
    return sum > 0;
  }