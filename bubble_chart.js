// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata; 
    
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    

    var result = resultArray[0]; 
    var outside_ids = result["otu_ids"]; 
    var outside_labels = result["otu_labels"]; 
    var values = result["sample_values"]; 

    var yticks = outside_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    var size = values.forEach(function(element){
      return element * 100; 
    });   
    

    // 1. Create the trace for the bubble chart.
    var bubbleData =  [{
      x : outside_ids,
      y : values, 
      text: outside_labels, 
      mode : "markers",
      marker: {
        size : size
      }
     }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title : "Bacteria Cultures Per Sample", 
      showlegend : false, 
      height : 800, 
      width : 800, 
    

      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("plot2", bubbleData, bubbleLayout); 
  });
}
