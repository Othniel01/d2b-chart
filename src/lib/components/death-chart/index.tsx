import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type DataPoint = {
  Year: number;
  "Cause of death": string;
  Estimate: number;
};

const MalariaDeathsChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    d3.json<DataPoint[]>("/sheets/death.json").then((data) => {
      if (!data) return;

      const parsedData: {
        year: number;
        malariaDeaths: number;
        otherDeaths: number;
      }[] = [];
      const dataByYear = d3.group(data, (d) => d.Year);

      dataByYear.forEach((records, year) => {
        const malaria = records.find((d) => d["Cause of death"] === "Malaria");
        const other = records.find(
          (d) => d["Cause of death"] === "Other under-5 deaths"
        );

        if (malaria && other) {
          parsedData.push({
            year: year,
            malariaDeaths: malaria.Estimate,
            otherDeaths: other.Estimate,
          });
        }
      });

      const width = 700;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 50, left: 60 };

      const x = d3
        .scaleLinear()
        .domain(d3.extent(parsedData, (d) => d.year) as [number, number])
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(parsedData, (d) => Math.max(d.malariaDeaths, d.otherDeaths)) ||
            0,
        ])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const lineMalaria = d3
        .line<{ year: number; malariaDeaths: number }>()
        .x((d) => x(d.year))
        .y((d) => y(d.malariaDeaths));

      const lineOther = d3
        .line<{ year: number; otherDeaths: number }>()
        .x((d) => x(d.year))
        .y((d) => y(d.otherDeaths));

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("class", "w-full h-auto");

      svg.selectAll("*").remove();

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickFormat(d3.format("d"))
        )
        .attr("class", "text-gray-500");

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format(".2s")))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", width - margin.left - margin.right)
            .attr("stroke-opacity", 0.1)
        )
        .attr("class", "text-gray-500");

      svg
        .append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", lineMalaria)
        .attr("class", "malaria-line");

      svg
        .append("path")
        .datum(parsedData)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 1.5)
        .attr("d", lineOther)
        .attr("class", "other-line");

      const verticalLine = svg
        .append("line")
        .attr("stroke", "lightgray")
        .attr("stroke-width", 0.9)
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .style("opacity", 0);

      const malariaTooltip = svg.append("g").style("display", "none");

      malariaTooltip.append("circle").attr("r", 5).attr("fill", "red");

      malariaTooltip
        .append("rect")
        .attr("width", 90)
        .attr("height", 30)
        .attr("x", -48)
        .attr("y", -33)
        .attr("rx", 8)
        .style("fill", "white")
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))");

      const malariaTooltipText = malariaTooltip
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", -20)
        .style("font-size", "8px");

      const otherTooltip = svg.append("g").style("display", "none");

      otherTooltip.append("circle").attr("r", 5).attr("fill", "orange");

      otherTooltip
        .append("rect")
        .attr("width", 90)
        .attr("height", 30)
        .attr("x", -47)
        .attr("y", -33)
        .attr("rx", 8)
        .style("fill", "white")
        .style("filter", "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))");

      const otherTooltipText = otherTooltip
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", -20)
        .style("font-size", "8px");

      svg.on("mousemove", (event: MouseEvent) => {
        const [mouseX] = d3.pointer(event);
        const hoveredYear = Math.round(x.invert(mouseX));
        const malariaDataPoint = parsedData.find((d) => d.year === hoveredYear);
        const otherDataPoint = parsedData.find((d) => d.year === hoveredYear);

        if (malariaDataPoint) {
          const xPosition = x(malariaDataPoint.year);
          verticalLine
            .attr("x1", xPosition)
            .attr("x2", xPosition)
            .style("opacity", 1);

          malariaTooltip
            .attr(
              "transform",
              `translate(${xPosition},${y(malariaDataPoint.malariaDeaths)})`
            )
            .style("display", "block");

          malariaTooltipText.selectAll("*").remove();
          malariaTooltipText
            .append("tspan")
            .attr("fill", "red")
            .text(`Malaria: `);
          malariaTooltipText
            .append("tspan")
            .attr("font-weight", "bold")
            .text(`${malariaDataPoint.malariaDeaths}`);
          malariaTooltipText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "1.2em")
            .text(`Year: ${malariaDataPoint.year}`);
        }

        if (otherDataPoint) {
          const xPosition = x(otherDataPoint.year);
          otherTooltip
            .attr(
              "transform",
              `translate(${xPosition},${y(otherDataPoint.otherDeaths)})`
            )
            .style("display", "block");

          otherTooltipText.selectAll("*").remove();
          otherTooltipText
            .append("tspan")
            .attr("fill", "orange")
            .text(`Other deaths: `);
          otherTooltipText
            .append("tspan")
            .attr("font-weight", "bold")
            .text(`${otherDataPoint.otherDeaths}`);
          otherTooltipText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", "1.2em")
            .text(`Year: ${otherDataPoint.year}`);
        }
      });

      svg.on("mouseleave", () => {
        malariaTooltip.style("display", "none");
        otherTooltip.style("display", "none");
        verticalLine.style("opacity", 0);
      });
    });
  }, []);

  return (
    <div className="w-[840px] h-auto">
      <div className=" w-full mt-10 h-auto shadow-md">
        <svg ref={svgRef} />
      </div>
    </div>
  );
};

export default MalariaDeathsChart;
