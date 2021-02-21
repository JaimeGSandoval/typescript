import {Country} from "../domain";
import {WorldExplorerView} from "./world-explorer-view.intf";
import {ChartDetails} from "./chart-details.intf";
import Chart = require("chart.js");

export class WorldExplorerHTMLView implements WorldExplorerView {
    private readonly _countrySelect: HTMLSelectElement;
    private readonly _indicatorSelect: HTMLSelectElement;
    private readonly _fromYearSelect: HTMLSelectElement;
    private readonly _toYearSelect: HTMLSelectElement;
    private readonly _chartTypeSelect: HTMLSelectElement;
    private readonly _chartConfigurationForm: HTMLFormElement;
    private readonly _canvas: HTMLCanvasElement;
    private _chart?: Chart;

    constructor() {
          this._countrySelect = document.getElementById('countrySelect') as HTMLSelectElement;
          if (!this._countrySelect) {
              throw new Error("Could not initialize the view. The 'countrySelect' element id was not found. Was the template changed?");
          }

          this._indicatorSelect = document.getElementById('indicatorSelect') as HTMLSelectElement;

          // Next, implement the constructor validation checks and element retrieval:
          if (!this._indicatorSelect) {
              throw new Error("Could not initialize the view. The 'indicatorSelect' element id was not found. Was the template changed?");
          }

          this._fromYearSelect = document.getElementById('fromYearSelect') as HTMLSelectElement;

          if (!this._fromYearSelect) {
              throw new Error("Could not initialize the view. The 'fromYearSelect' element id was not found. Was the template changed?");
          }

          this._toYearSelect = document.getElementById('toYearSelect') as HTMLSelectElement;

          if (!this._toYearSelect) {
              throw new Error("Could not initialize the view. The 'toYearSelect' element id was not found. Was the template changed?");
          }

          this._chartTypeSelect = document.getElementById('chartTypeSelect') as HTMLSelectElement;

          if (!this._chartTypeSelect) {
              throw new Error("Could not initialize the view. The 'chartTypeSelect' element id was not found. Was the template changed?");
          }

          this._chartConfigurationForm = document.getElementById('chartConfigurationForm') as HTMLFormElement;

          if (!this._chartConfigurationForm) {
              throw new Error("Could not initialize the view. The 'chartConfigurationForm' element id was not found. Was the template changed?");
          }

          this._canvas = document.getElementById("worldExplorerChart") as HTMLCanvasElement;
          if (!this._canvas) {
              throw new Error("Could not initialize the view. The 'worldExplorerChart' element id was not found. Was the template changed?");
          }
    }

     displayErrorMessage(errorMessage: string): void {
        if (!errorMessage) {
            throw new Error("An error message must be provided!");
        }
        alert(errorMessage); // bad user experience but ignore
      }// this for now

    displayCountries(countries: Country[]): void {
       if (!countries) {
        throw new Error("The list of countries to display must be provided!");
    } else if (countries.length === 0) {
        throw new Error("The list of countries cannot be empty!");
    }

    console.log("Displaying the countries");

    let countriesOptions = "";
    countries.forEach(country => {
        countriesOptions += `<option
        value="${country.id}">${country.name}</option>`;
    });
    this._countrySelect.innerHTML = countriesOptions;
    }

    displayYears(years: number[]): void {
      if (!years) {
        throw new Error("The list of years must be provided!");
    } else if (years.length === 0) {
        throw new Error("The list of years cannot be empty!");
  }

    console.log("Displaying the years");
    let fromYearOptions = "";
    years.forEach(year => {
        fromYearOptions += `<option value="${year}">${year}</option>`;
  });

    // reverse order
    let toYearOptions = "";
    years.reverse().forEach(year => {
        toYearOptions += `<option value="${year}">${year}</option>`;
  });
    this._fromYearSelect.innerHTML = fromYearOptions;
    this._toYearSelect.innerHTML = toYearOptions;
    // The only thing to notice here is that, in order to build toYearOptions, we iterate through the provided array in reverse order using the reverse() method of Array. We did this to simplify selecting a date range ending with the last year by default.
}

// This method will be used by the controller to retrieve the form selections
   getChartFormDetails(): { error?: string; countryId?: string; indicator?: string; fromYear?: number; toYear?: number, chartType?: string } {
    // As stated before, notice the return type again. We reuse the same trick as in the previous chapter, by defining a custom type including an optional error. Then, we check the different form fields and report back to the user when something is invalid.

    if (this._chartConfigurationForm.checkValidity() === false) {
        this._chartConfigurationForm.reportValidity();
        return {
            error: "The chart configuration form is invalid!"
        }
    }

    // we check the validity of specific form fields
    if (this._countrySelect.checkValidity() === false) {
        this._countrySelect.reportValidity();
        return {
            error: "A country must be selected!"
        }
    }

    if (this._indicatorSelect.checkValidity() === false) {
        this._indicatorSelect.reportValidity();
        return {
            error: "An indicator must be selected!"
        }
    }

    if (this._fromYearSelect.checkValidity() === false) {
        this._fromYearSelect.reportValidity();
        return {
            error: "A start year must be selected!"
        }
    }

    if (this._toYearSelect.checkValidity() === false) {
        this._toYearSelect.reportValidity();
        return {
            error: "An end year must be selected!"
        }
    }

    if (this._chartTypeSelect.checkValidity() === false) {
        this._chartTypeSelect.reportValidity();
        return {
            error: "A chart type must be selected!"
        }
    }

    // Finally, we can create the return value if all validation tests have passed successfully:
    const countryId: string = this._countrySelect.value;
    const indicator: string = this._indicatorSelect.value;
    const fromYear = Number.parseInt(this._fromYearSelect.value);
    const toYear = Number.parseInt(this._toYearSelect.value);
    const chartType: string = this._chartTypeSelect.value;

    return {
        countryId,
        indicator,
        fromYear,
        toYear,
        chartType
    };
    // When the form is fully validated, we return our custom object. For the definition of that object, we have used the property shorthand notation introduced by ES2015. It allows us to write countryId, for example, instead of countryId: countryId.
}

// Last but not least, we can now implement the method that will render the chart. The displayChart function accepts a ChartDetails object, containing everything we need to know in order to render.

// Before we implement this method, we first need to import Chart.js and retrieve the canvas element from the DOM:

//  Add the following import at the top of the world-explorer-view.ts file: import Chart = require("chart.js");. That is all we need to do in order to load Chart.js!
//  Add a private and read-only class field for the canvas: private readonly _canvas: HTMLCanvasElement;. It can be marked as readonly because we won't need to reassign it later.

    displayChart(chartDetails: ChartDetails): void {
        if (!chartDetails) {
         throw new Error("The chart details must be provided!");
        }
      // Next, we need to create two arrays:
      // One with the labels of our data: In our case, the date property of each DataPoint instance
      // One with the values: In our case, the value property of each DataPoint instance
      const dataLabels: string[] = [];
      const dataValues: number[] = [];

      chartDetails.data.forEach(dataPoint => {
      dataLabels.push(dataPoint.date);
      dataValues.push(dataPoint.value);
     });

    //  Now, we need to make sure that, whenever we try to render a new chart, the previous one (if there was one) gets removed:
    if(this._chart) {
      this._chart.clear();
      this._chart.destroy();
    }

    // Finally, here's the code that generates the chart:
    this._chart = new Chart(this._canvas, { // <1>
    type: chartDetails.chartType, // <2>
    data: { // <3>
        labels: dataLabels, // <4>
        datasets: [ // <5>
            {
              data: dataValues, // <6>
              label: chartDetails.dataLabel, // <7>

              // <8>
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
            }
        ]
    },
    options: { // <9>
        animation: { // <10>
            animateRotate: true,
            easing: "easeOutQuart"
        },
        responsive: true, // <11>
        scales: {
            xAxes: [{ // <12>
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: chartDetails.yAxisLabel
                }
            }],
            yAxes: [{ // <13>
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: chartDetails.yAxisLabel
                }
            }]
        },
        title: { // <14>
            display: true,
            text: chartDetails.title
        }
    }
   });
  }
  // Here are more details about the preceding code:
// 1. To create the chart, we create a new instance of the Chart class provided by Chart.js:
//    a. The first thing that we pass to its constructor is the canvas element.
//    b. The second thing is the configuration object, which contains the data, the labels, the options, and so on.
// 2. The type property is used to define the type of chart to render. The list of supported types can be found here: https://www.chartjs.org/docs/latest/charts.
// 3. The data property is used to provide the data of the chart.
// 4. The data is composed of labels, representing the label associated with each data point and datasets, accepting an array of data sets.
// 5. The actual data is passed through the data property.
// 6. Each dataset, of course, contains values and has a specific label.
// 7. It is also possible to define many settings for each dataset, including colors, borders, background, points, and many others.
// 8. Through the options object, we can further configure the chart to generate.
// 9. With the animation options, we can control the animation when the data is rendered.
// 10. When the responsive option is enabled, it adapts the size of the canvas depending on the available screen real estate.
// 11. With the scales option, we can configure the different axes, their labels, and so on.
// 12. Finally, with the title options, we can define and configure the title of the chart.

}
