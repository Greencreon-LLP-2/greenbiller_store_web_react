import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import DataTable from "react-data-table-component";
import "../styles/Dashboard.css";


const DashboardPage = () => {
  const chartRef = useRef();

  // Product inventory
  const [products, setProducts] = useState([
    { id: 1, product: "Red Premium Handy", sku: "PT006", manufacturedDate: "17 Jan 2023", expiredDate: "29 Mar 2023" },
    { id: 2, product: "Iphone 14 Pro", sku: "PT007", manufacturedDate: "22 Feb 2023", expiredDate: "04 Apr 2023" },
    { id: 3, product: "Black Slim 200", sku: "PT008", manufacturedDate: "18 Mar 2023", expiredDate: "13 May 2023" },
    { id: 4, product: "Woodcraft Sandal", sku: "PT009", manufacturedDate: "29 Mar 2023", expiredDate: "27 May 2023" },
    { id: 5, product: "Apple Series 5 Watch", sku: "PT010", manufacturedDate: "24 Mar 2023", expiredDate: "26 May 2023" },
  ]);

  // Recent products (right side)
  const [recentProducts] = useState([
    { id: 1, product: "Lenevo 3rd Generation", price: "$12500" },
    { id: 2, product: "Bold V3.2", price: "$1600" },
    { id: 3, product: "Nike Jordan", price: "$2000" },
    { id: 4, product: "Apple Series 5 Watch", price: "$800" },
  ]);

  // checkbox selection state
  const [selectedRows, setSelectedRows] = useState([]);
  const toggleRow = (id) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleSelectAll = () => {
    if (selectedRows.length === products.length) setSelectedRows([]);
    else setSelectedRows(products.map((p) => p.id));
  };

  // delete
  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  // DataTable columns (checkbox + product fields)
  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={selectedRows.length === products.length && products.length > 0}
          onChange={toggleSelectAll}
          aria-label="Select all"
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      width: "64px",
    },
    { name: "Product", selector: (row) => row.product, sortable: true },
    { name: "SKU", selector: (row) => row.sku, sortable: true },
    { name: "Manufactured Date", selector: (row) => row.manufacturedDate, sortable: true },
    { name: "Expired Date", selector: (row) => row.expiredDate, sortable: true },
    {
  name: "Actions",
  cell: (row) => (
    <>
      <button className="action-btn" onClick={() => alert(`Edit ${row.product}`)}>
        <i className="bi bi-pencil-square"></i>
      </button>
      <button className="action-btn" onClick={() => handleDelete(row.id)}>
        <i className="bi bi-trash"></i>
      </button>
    </>
  ),
}

  ];

  // D3 chart rendering: ensures axes, gridlines, lines, points, legend, labels
  useEffect(() => {
    const data = [
      { month: "Jan", sales: 100, purchase: 80 },
      { month: "Feb", sales: 120, purchase: 90 },
      { month: "Mar", sales: 150, purchase: 110 },
      { month: "Apr", sales: 180, purchase: 130 },
      { month: "May", sales: 200, purchase: 160 },
      { month: "Jun", sales: 220, purchase: 180 },
      { month: "Jul", sales: 250, purchase: 200 },
      { month: "Aug", sales: 270, purchase: 220 },
      { month: "Sep", sales: 300, purchase: 250 },
      { month: "Oct", sales: 280, purchase: 230 },
      { month: "Nov", sales: 260, purchase: 210 },
      { month: "Dec", sales: 240, purchase: 190 },
    ];

    // sizing (responsive via viewBox)
    const width = 700;
    const height = 360;
    const margin = { top: 60, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // clear
    d3.select(chartRef.current).selectAll("*").remove();

    // create svg with viewBox so CSS width:100% works
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // background group
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // scales
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([-200, 300])
      .nice()
      .range([innerHeight, 0]);

    // gridlines (horizontal)
    const yTicks = [-200, -100, 0, 100, 200, 300];
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickValues(yTicks).tickSize(-innerWidth).tickFormat(""));

    // X axis
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("dy", "0.6em")
      .style("font-size", "12px");

    // Y axis with explicit ticks
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickValues(yTicks))
      .selectAll("text")
      .style("font-size", "12px");

    // line generators (monotone)
    const lineSales = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.sales))
      .curve(d3.curveMonotoneX);

    const linePurchase = d3
      .line()
      .x((d) => x(d.month))
      .y((d) => y(d.purchase))
      .curve(d3.curveMonotoneX);

    // append lines (draw behind axes labels)
    g.append("path")
      .datum(data)
      .attr("class", "chart-line sales")
      .attr("d", lineSales)
      .attr("fill", "none");

    g.append("path")
      .datum(data)
      .attr("class", "chart-line purchase")
      .attr("d", linePurchase)
      .attr("fill", "none");

    // points (circles) for each line
    g.selectAll(".dot.sales")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "chart-dot sales")
      .attr("cx", (d) => x(d.month))
      .attr("cy", (d) => y(d.sales))
      .attr("r", 4);

    g.selectAll(".dot.purchase")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "chart-dot purchase")
      .attr("cx", (d) => x(d.month))
      .attr("cy", (d) => y(d.purchase))
      .attr("r", 4);

    // Axis labels
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Months (2025)");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", `translate(15,${margin.top + innerHeight / 2}) rotate(-90)`)
      .attr("text-anchor", "middle")
      .text("Value");

    // Title
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", 24)
      .attr("text-anchor", "middle")
      .attr("class", "chart-title")
      .text("Sales vs Purchase");

    // Legend (top-right inside chart)
    const legend = svg.append("g").attr("transform", `translate(${margin.left + innerWidth - 140},20)`);
    legend
      .append("rect")
      .attr("class", "legend-box sales")
      .attr("width", 12)
      .attr("height", 12)
      .attr("rx", 2)
      .attr("ry", 2);
    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 10)
      .text("Sales")
      .style("font-size", "12px");
    legend
      .append("rect")
      .attr("class", "legend-box purchase")
      .attr("x", 70)
      .attr("width", 12)
      .attr("height", 12)
      .attr("rx", 2)
      .attr("ry", 2);
    legend
      .append("text")
      .attr("x", 92)
      .attr("y", 10)
      .text("Purchase")
      .style("font-size", "12px");
  }, []);

  return (
    <div className="dashboard-page">
      {/* Metrics (top) */}
<div className="metrics-grid">
  <div className="metric-card">
    <div className="metric-info">
      <h4 className="metric-title">Total Purchase Due</h4>
      <p className="metric-value">$307,144</p>
    </div>
    <i className="bi bi-bag-check metric-icon"></i> {/* purchase-related icon */}
  </div>

  <div className="metric-card">
    <div className="metric-info">
      <h4 className="metric-title">Total Sales Due</h4>
      <p className="metric-value">$4,385</p>
    </div>
    <i className="bi bi-cart-check metric-icon"></i> {/* sales-related icon */}
  </div>

  <div className="metric-card">
    <div className="metric-info">
      <h4 className="metric-title">Total Sale Amount</h4>
      <p className="metric-value">$385,656.50</p>
    </div>
    <i className="bi bi-graph-up-arrow metric-icon"></i> {/* sale amount graph */}
  </div>

  <div className="metric-card">
    <div className="metric-info">
      <h4 className="metric-title">Total Expense Amount</h4>
      <p className="metric-value">$40,000</p>
    </div>
    <i className="bi bi-wallet2 metric-icon"></i> {/* expense wallet */}
  </div>
</div>



<div className="metrics-grid">
  
  <div className="metric-card customers-card">
  <div className="metric-info">
    <h4 className="metric-title">Customers</h4>
    <p className="metric-value">150</p>
  </div>
  <i className="bi bi-person-fill metric-icon"></i>
</div>

<div className="metric-card packages-card">
  <div className="metric-info">
    <h4 className="metric-title">Packages</h4>
    <p className="metric-value">75</p>
  </div>
  <i className="bi bi-person-check-fill metric-icon"></i>
</div>

<div className="metric-card purchase-invoice-card">
  <div className="metric-info">
    <h4 className="metric-title">Purchase Invoice</h4>
    <p className="metric-value">35</p>
  </div>
  <i className="bi bi-receipt-cutoff metric-icon"></i>
</div>

<div className="metric-card sales-card">
  <div className="metric-info">
    <h4 className="metric-title">Sales</h4>
    <p className="metric-value">200</p>
  </div>
  <i className="bi bi-receipt metric-icon"></i>
</div>
</div>


      {/* chart (left) + recent products (right) */}
      <div className="dashboard-row">
        <div className="chart-container">
          <div ref={chartRef} />
        </div>

        <div className="recent-products-section">
          <div className="recent-products-header">
            <h3>Recent Products</h3>
            <button className="btn-view-all">View All</button>
          </div>

          <table className="recent-products-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td>{r.product}</td>
                  <td>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Inventory (DataTable) */}
      <div className="table-container">
        <h3>Product Inventory</h3>
        <DataTable columns={columns} data={products} pagination highlightOnHover striped responsive />
      </div>
    </div>
  );
};

export default DashboardPage;