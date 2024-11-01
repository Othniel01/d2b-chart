import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import * as topojson from "topojson-client";

async function fetchData(filePath) {
  const response = await fetch(filePath);
  return await response.json();
}

const renameMap = new Map([
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bolivia (Plurinational State of)", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Brunei Darussalam", "Brunei"],
  ["Central African Republic", "Central African Rep."],
  ["Cook Islands", "Cook Is."],
  ["Democratic People's Republic of Korea", "North Korea"],
  ["Democratic Republic of the Congo", "Dem. Rep. Congo"],
  ["Dominican Republic", "Dominican Rep."],
  ["Equatorial Guinea", "Eq. Guinea"],
  ["Iran (Islamic Republic of)", "Iran"],
  ["Lao People's Democratic Republic", "Laos"],
  ["Marshall Islands", "Marshall Is."],
  ["Micronesia (Federated States of)", "Micronesia"],
  ["Republic of Korea", "South Korea"],
  ["Republic of Moldova", "Moldova"],
  ["Russian Federation", "Russia"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["Saint Vincent and the Grenadines", "St. Vin. and Gren."],
  ["Sao Tome and Principe", "São Tomé and Principe"],
  ["Solomon Islands", "Solomon Is."],
  ["South Sudan", "S. Sudan"],
  ["Swaziland", "eSwatini"],
  ["Syrian Arab Republic", "Syria"],
  ["The former Yugoslav Republic of Macedonia", "Macedonia"],
  ["United Republic of Tanzania", "Tanzania"],
  ["Venezuela (Bolivarian Republic of)", "Venezuela"],
  ["Viet Nam", "Vietnam"],
]);

const MalariaMap = () => {
  const svgRef = useRef(null);
  const [casesData, setCasesData] = useState([]);
  const [worldData, setWorldData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchData("/sheets/cases.json"),
      fetchData("/sheets/countries-50m.json"),
    ]).then(([cases, world]) => {
      const processedCases = cases.map((entry) => ({
        country: renameMap.get(entry.country) || entry.country,
        malariaCases:
          entry["malaria cases"] === "-"
            ? 0
            : parseInt(entry["malaria cases"].replace(/,/g, ""), 10),
      }));
      setCasesData(processedCases);
      setWorldData(world);
    });
  }, []);

  useEffect(() => {
    if (!casesData.length || !worldData) return;

    const width = 928;
    const height = 450;

    const colorScale = d3
      .scaleThreshold()
      .domain([
        5000, 50000, 100000, 500000, 2000000, 7000000, 30000000, 70000000,
      ])
      .range([
        "#ffffe0",
        "#fffac2",
        "#ffe784",
        "#ffcc5c",
        "#ff9933",
        "#ff6666",
        "#cc0000",
        "#990000",
      ]);

    const caseMap = new Map(casesData.map((d) => [d.country, d.malariaCases]));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto");

    svg.selectAll("*").remove();

    const projection = d3
      .geoEqualEarth()
      .scale(160)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    svg
      .append("path")
      .datum({ type: "Sphere" })
      .attr("d", path({ type: "Sphere" }))
      .attr("fill", "white")
      .attr("stroke", "currentColor");

    const countries = topojson.feature(worldData, worldData.objects.countries);

    countries.features.forEach((feature) => {
      feature.properties.malariaCases =
        caseMap.get(feature.properties.name || "") || 0;
    });

    svg
      .append("g")
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("fill", (d) => colorScale(d.properties.malariaCases))
      .attr("d", path)
      .append("title")
      .text(
        (d) =>
          `${d.properties.name || "Unknown"}\n${
            caseMap.get(d.properties.name || "") || "No Data"
          }`
      );

    const countryMesh = topojson.mesh(
      worldData,
      worldData.objects.countries,
      (a, b) => a !== b
    );

    svg
      .append("path")
      .datum(countryMesh)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.5);
  }, [casesData, worldData]);

  return <svg ref={svgRef} />;
};

export default MalariaMap;
