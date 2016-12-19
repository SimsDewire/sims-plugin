/// <reference path="typings/ue.d.ts">/>

"use strict"
try {
const network = require('request');
console.log("dasdasdasd");
// class PieChartClass extends Root.ResolveClass('BP_Pie_chart') {
class PieChartClass extends Blueprint.Load('/Game/StandardGraphs/PieChart/Blueprints/BP_Pie_chart').GeneratedClass {
    Properties() {
        this.DoUpdateValues/*EditAnywhere+boolean*/
        this.timeDelay/*EditAnywhere+int*/
    }
    ReceiveBeginPlay() {
        console.log("HGds");
        super.ReceiveBeginPlay();
        this.DoUpdateValues = true;
        this.timeDelay = 10;
        this.UpdateValuesLoop();
    }
    UpdateValuesLoop(values) {
        if(!this.DoUpdateValues) return false;
        var self = this;
        this.UpdateValues(values || [1]).then(function(response) {
            setTimeout(function() {
                if(!self.DoUpdateValues) return false;
                // self.UpdateValuesLoop(response);
                console.log(response);
                self.UpdateValuesLoop([1 - response.Test/1000, response.Test/1000]);
            }, self.timeDelay);
        });
        return true;
    }
    UpdateValues(values) {
        this.UpdatePieChartData(values); // Where values should be an array of numbers like: [1, 43, 134, 54, 13...]
        // return network('GET', '127.0.0.1:3002/test/exp');
        return GWorld.Network('GET', '127.0.0.1:3002/test/exp');
        // return {then: function(f) {f(dummyArray());}}
    }
    Destroyed() {
        this.DoUpdateValues = false;
    }
}

var plugins = {
    "Piechart": {
        actor: PieChartClass,
        description: "A nice piechart that display important information about an important server status",
        thumbnail: "thumbnail.png"
    }
};
function getPluginActors() {
    return plugins;
}

function dummyArray(){
    return ([1,1,1,1,1].map(function(){return (Math.random() * 10) + 1;}));
}
var options = {};
GWorld.exports =  {};
GWorld.exports.getPluginActors = getPluginActors;
GWorld.exports.options = options;
}
catch(e) {
    console.error("error: ", e);
}
