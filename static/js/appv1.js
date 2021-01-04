function getData(sampleID){
    d3.json("samples.json").then((jsonData) => {
        var jdata = jsonData;
        console.log(jdata);
    
        var sampleData = jdata.samples;
        console.log(sampleData);
        var resultsArray = sampleData.filter(sampleObject => sampleObject.id == sampleID);
        var finalArr = resultsArray[0];
        console.log(finalArr);
        var pickedValue = finalArr.sample_values;
        //console.log(pickedValue);
        var otuID = finalArr.otu_ids;
        //console.log(otuID);
        var otuLabel = finalArr.otu_labels;
        //console.log(otuLabel);

        //get wfreqdata
        var mData = jdata.metadata;
        var resultFreq = mData.filter(freqObject => freqObject.id == sampleID);
        var freqData = resultFreq[0];
        console.log(freqData);
        var wFreq = freqData.wfreq;

        //create bar chart
        var arrData = [{
            x: pickedValue.slice(0, 10).reverse(),
            y: otuID.slice(0,10).map(otuID => `OTU${otuID}`).reverse(),
            text: otuLabel.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgba(58,200,225,.5)'
            }
        }];

        var barLayout = {
            title: "Top 10 OTUs found",
            font: { family: 'Raleway, sans-serif'}
        };

        Plotly.newPlot("bar", arrData, barLayout);

        //create bubble data
        var bubbleData =[{
            x: otuID,
            y: pickedValue,
            text: otuLabel,
            mode: "markers",
            marker: {
                size: pickedValue,
                color: otuID,
                colorScale: "Jet"
            }
        }];

        var bubbleLayout = {
            title: "OTUs Sample Size"
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        //create gauge chart
        var gaugeData = [{
            type: "indicator",
            mode: "gauge+number+delta",
            value: wFreq,
            title: "Scrub per Week",
            gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 5], color: "cyan" },
                  { range: [5, 7], color: "lightblue"},
                  { range: [7, 9], color: "royalblue" }
                ],
                
            } 

        }];
        var gaugeLayout = {
            title: "Belly Button Washing Frequency",
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 }
        };

        Plotly.newPlot("gauge",gaugeData, gaugeLayout)
    });

};

function getDemoData(metaID){
    d3.json("samples.json").then((jsonData) => {
        var jdata = jsonData;
        console.log(jdata);

        var metaData = jdata.metadata;
        console.log(metaData);
        var metaArr = metaData.filter(metaObject => metaObject.id == metaID);
        var varArr = metaArr[0];

        var ethnicity = varArr.ethnicity;
        console.log(ethnicity);
        var gender = varArr.gender;
        console.log(gender);
        var age = varArr.age;
        console.log(age);
        var location = varArr.location;
        console.log(location);
        var bbtype = varArr.bbtype;
        console.log(bbtype);
        var wfreq = varArr.wfreq;
        console.log(wfreq);

        var metaDataset = d3.select("#sample-metadata");

        metaDataset.html("");
        Object.entries(varArr).forEach(([key, value]) =>{
            metaDataset.append("h6").text(`${key}: ${value}`);
        })

    });

};
 

//initalize the page with default plot
function init(){
    d3.json("samples.json").then((d) => {
        var sampleName = d.names;
        var dataset = d3.select("#selDataset");
        sampleName.forEach((sample) =>{
            dataset.append("option")
            .text(sample)
            .property("value", sample);
        });
    
    var resultSample = sampleName[0];
    getData(resultSample);
    getDemoData(resultSample);
    });
    
};

init();

d3.selectAll("#selDataset").on("change", optionChanged);

//get new data and create new chart per new data
function optionChanged(newSample){
    getData(newSample);
    getDemoData(newSample);

};