// Display the default plot
function init() {
    let dropdown = d3.select("#selDataset");

  // dropdown list
     d3.json("samples.json").then((data)=> {
         let names = data.names;
         names.forEach((sample) => {dropdown
            .append("option")
            .text(sample)
            .property("value", sample);
        });
        buildCharts(names[0]);
        buildmetadata(names[0]);
     });
}

function buildCharts(sample){
    d3.json("samples.json").then((data)=>{
        console.log("hello")
        let samples=data.samples
        filtred_data=samples.filter(s=>s.id==sample)
        let results=filtred_data[0]
        let otu_ids= results.otu_ids
        let otu_values= results.sample_values
        let otu_labels=results.otu_labels

        let bar_d=[
            {
                y:otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x: otu_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type:"bar",
                orientation:"h"
            }
        ];

        Plotly.newPlot("bar", bar_d);

        let bubble =[
            {
            x:otu_ids,
            y: otu_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                size:otu_values,
                color: otu_ids
            }
        }
        ];
        Plotly.newPlot("bubble", bubble);

    });
}



function buildmetadata(sample){
    d3.json("samples.json").then((data)=>{
        let metadata=data.metadata
        filtred_data=metadata.filter(s=>s.id==sample)
        let results=filtred_data[0]
        let panel = d3.select("#sample-metadata");
        panel.html("")

        Object.entries(results).forEach(([key, value]) => {
            panel.append("h6").text(`${key} ${value}`)
        
    })
})
}

function optionChanged(newsample){
    buildCharts(newsample)
    buildmetadata(newsample)
}
init();