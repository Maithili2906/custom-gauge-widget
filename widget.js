(function () {
  let chart;

  const template = document.createElement("template");
  template.innerHTML = `<canvas id="customChart" width="400" height="300"></canvas>`;

  class CustomChart extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.canvas = this._shadowRoot.querySelector("#customChart");
    }

    onCustomWidgetAfterUpdate(changedProps) {
      const ctx = this.canvas.getContext("2d");
      if (chart) chart.destroy(); // Clean up previous chart

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Port A", "Port B", "Port C"],
          datasets: [{
            label: "Cost",
            data: [100000, 75000, 95000],
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: this.chartTitle || "Cost by Port"
            }
          }
        }
      });
    }
  }

  customElements.define("custom-chart-widget", CustomChart);
})();
