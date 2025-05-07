(function () {
  let chart, data;

  const template = document.createElement("template");
  template.innerHTML = `<div id="gauge_div" style="width: 400px; height: 120px;"></div>`;

  class GaugeWidget extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._gaugeDiv = this._shadowRoot.querySelector("#gauge_div");

      google.charts.load("current", {
        packages: ["gauge"]
      });
    }

    onCustomWidgetAfterUpdate(changedProps) {
      const value = this.value || 0;
      const title = this.title || "Gauge";

      google.charts.setOnLoadCallback(() => {
        data = google.visualization.arrayToDataTable([
          ["Label", "Value"],
          [title, value]
        ]);

        const options = {
          width: 400,
          height: 120,
          redFrom: 90,
          redTo: 100,
          yellowFrom: 70,
          yellowTo: 90,
          minorTicks: 5,
          max: 100
        };

        chart = new google.visualization.Gauge(this._gaugeDiv);
        chart.draw(data, options);
      });
    }
  }

  customElements.define("custom-gauge-widget", GaugeWidget);
})();