import * as d3 from 'd3';
import React, { useEffect, useMemo, useRef } from 'react';

export default function Polar({
    width = 400,
    height = 400,
    data: inData = [],
    type = 'single', // 'double'
}) {
    const wrapper = useRef();
    const { current } = useRef({ chart: null, maxAngle: 180 });
    const data = useMemo(() => {
        return inData.map(item => {
            let [cyl, axis, name] = item;
            axis = cyl > 0 ? (axis <= 90 ? axis + 90 : axis - 90) : axis;
            return [Math.abs(cyl), (type == 'single' ? 1 : 2) * axis, name];
        })
    }, [type, inData]);

    useEffect(() => {
        if (!current.chart) current.chart = d3.select(wrapper.current);
        const chart = current.chart;
        chart.attr('width', width + 40);
    }, []);

    useEffect(() => {
        if (type === 'single') {
            current.maxAngle = 180;
            current.chart.attr('height', height / 2 + 40);
        }
        else if (type === 'double') {
            current.maxAngle = 360;
            current.chart.attr('height', height);
        }
    }, [type]);

    useEffect(() => {
        current.defs?.remove();
        current.g?.remove();
        current.legend?.remove();
        current.defs = current.chart.append("defs");
        current.g = current.chart.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);
        current.legend = current.chart.append('g')
            .attr('transform', `translate(${width}, 10)`);

        const radius = Math.min(width, height) / 2 - 40;

        let max = d3.max(data, d => d[0]);
        max = (Math.floor(max) + 1) || 1;

        const angle = d3.scaleLinear().domain([0, -360])
            .range([Math.PI / 2, 5 / 2 * Math.PI]);

        const r = d3.scaleLinear().domain([0, max])
            .range([0, radius]);

        const gr = current.g.append('g')
            .selectAll('g')
            .data(r.ticks(10).slice(1))
            .enter().append('g');

        gr.append('path')
            .attr("d", d => {
                const _d = d3.arc()
                    .innerRadius([r(d)])
                    .outerRadius([r(d)])
                    .startAngle(Math.PI / 2)
                    .endAngle(Math.PI * (1 / 2 - (current.maxAngle / 180)));
                return _d();
            })
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-dasharray', (d, i) => (i + 1) % 4 == 0 && i > 0 ? 0 : 6);

        const ga = current.g.append("g")
            .selectAll("g")
            .data(d3.range(0, -Math.min((current.maxAngle + 1), 359), -45))
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "rotate(" + d + ")";
            })

        ga.append("line")
            .attr("x2", radius)
            .attr('stroke', 'steelblue')
            .attr('stroke-dasharray', 4)
            .filter((d, i) => i == 0)
            .attr('stroke-dasharray', 0);

        ga.append("text")
            .attr("x", radius + 6)
            .attr("dy", ".35em")
            .style("text-anchor", function (d) { return Math.abs(d) < 270 && Math.abs(d) > 90 ? "end" : null; })
            .attr("transform", function (d) {
                if (Math.abs(d) === 90) return `rotate(90 ${radius + 12}, -3)`;
                if (Math.abs(d) === 270) return `rotate(-90 ${radius + 12}, 4)`;
                return Math.abs(d) < 270 && Math.abs(d) > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null;
            })
            .text(d => Math.abs(d));

        ga.filter((d, i) => i === 0)
            .append('g')
            .call(d3.axisBottom(r).ticks(4));

        ///
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.lineRadial()
            .angle(function (d) {
                return angle(d[1]);
            })
            .radius(function (d) {
                return r(d[0]);
            });

        var legends = current.legend.selectAll('.legend')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (_, i) => `translate(0, ${i * 20})`);

        legends
            .append('circle').attr('fill', d => color(d))
            .attr('r', 4)

        legends.append('text')
            .attr('transform', `translate(10, 4.5)`)
            .text(d => d[2]);

        current.g.selectAll(".point")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "point")
            .attr("x1", 0)
            .attr('y1', 0)
            .attr('x2', d => {
                var coors = line([d]).slice(1).slice(0, -1);
                return coors.split(',')[0];
            })
            .attr('y2', d => {
                var coors = line([d]).slice(1).slice(0, -1);
                return coors.split(',')[1];
            })
            .attr('title', d => `[${d.join(',')}]`)
            .attr("stroke", function (d) {
                return color(d);
            })
            .attr("stroke-width", 2)
            .attr("marker-end", d => {
                let id = d.join(',');
                const arrowMarker = current.defs.append("marker")
                    .attr("id", id)
                    .attr('viewBox', '0 -5 10 10')
                    .attr('refX', 10)
                    .attr('markerWidth', 6)//箭头参数适当按需调整
                    .attr('markerHeight', 10)
                    .attr('orient', 'auto');
                arrowMarker.append("path")
                    .attr("d", "M0,-5 L10,0 L0,5")
                    .attr("fill", color(d));
                return `url(#${id})`;
            });

    }, [type, data]);


    return <svg ref={wrapper} />
}