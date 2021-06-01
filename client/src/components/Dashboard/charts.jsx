var Chartist = require("chartist");


// // // Daily Sales
// #############################

export const dailySalesChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[12, 17, 7, 17, 23, 18, 38]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 100,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    // fullWidth: true,
    // seriesBarDistance: 10,
  },
};


// // // Email Subscriptions
// #############################

export const emailsSubscriptionChart = {
  data: {
    labels: ["Ja", "Fe", "Ma", "Ap", "My", "Ju", "Jy", "Au", "S", "Oc", "No", "De"],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  },
  options: {
    axisX: {
      showGrid: true
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    },
    // fullWidth: true,
    // seriesBarDistance: 10,
  },
};


// // // Completed Tasks
// #############################

export const completedTasksChart = {
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug"],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  },
};


export const issueChart = {
  data: {
    labels: ['Bug', 'Feature', 'Documentation', 'Feature'],
    series: [[2, 33, 18, 11]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  },
};

