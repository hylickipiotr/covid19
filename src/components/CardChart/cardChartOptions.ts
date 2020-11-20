import { ApexOptions } from "apexcharts";

export const cardChartOpitons: ApexOptions = {
  chart: {
    offsetX: 0,
    offsetY: 0,
    parentHeightOffset: 0,
    redrawOnWindowResize: true,
    redrawOnParentResize: true,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
};
