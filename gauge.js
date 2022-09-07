// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var metadata = data.metadata; 
    var samples = data.samples; 
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(Object => Object.id === sample); 
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filter_variable = data.metadata.filter(Object => Object.id == sample); 
    // Create a variable that holds the first sample in the array.
    var result = resultArray[0]; 

    // 2. Create a variable that holds the first sample in the metadata array.
    var result2 = filter_variable[0]; 
    console.log(result2); 

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var outside_ids = result["otu_ids"]; 
    var outside_labels = result["otu_labels"]; 
    var values = result["sample_values"];

    // 3. Create a variable that holds the washing frequency.
    var washing_frequency = parseFloat(result2.wfreq); 

    console.log(washing_frequency); 
    
    // Create the yticks for the bar chart.
    var yticks = outside_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
        {
          domain: {x: [0,1] , y: [0,1]},
          value: washing_frequency,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 380 },
          gauge: {
            axis: { range: [null, 10] },
            bar: {color: "black"}, 
            steps: [
              { range: [0, 2], color: "red" },
              { range: [2, 4], color: "orange" }, 
              { range: [4, 6], color: "yellow" }, 
              { range: [6, 8], color: "yellowgreen" }, 
              { range: [8, 10], color: "green" }

            ],
           
          }
        }
      ];

      
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width: 600, 
     height: 500, 
     margin: {t: 0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
