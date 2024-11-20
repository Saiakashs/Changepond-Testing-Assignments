/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "Overview of FXEC-1"], "isController": false}, {"data": [1.0, 500, 1500, "Rank Holders-0"], "isController": false}, {"data": [0.5, 500, 1500, "Leadership"], "isController": false}, {"data": [0.5, 500, 1500, "Rank Holders-1"], "isController": false}, {"data": [1.0, 500, 1500, "Exam Meet-0"], "isController": false}, {"data": [0.5, 500, 1500, "Overview of FXEC-0"], "isController": false}, {"data": [1.0, 500, 1500, "Exam Meet-1"], "isController": false}, {"data": [1.0, 500, 1500, "TimeTable-1"], "isController": false}, {"data": [0.5, 500, 1500, "TimeTable-0"], "isController": false}, {"data": [0.5, 500, 1500, "Exam Meet"], "isController": false}, {"data": [0.5, 500, 1500, "Result"], "isController": false}, {"data": [0.5, 500, 1500, "TimeTable"], "isController": false}, {"data": [1.0, 500, 1500, "Sylabbus Coe-0"], "isController": false}, {"data": [1.0, 500, 1500, "Principals Desk-1"], "isController": false}, {"data": [1.0, 500, 1500, "Sylabbus Coe-1"], "isController": false}, {"data": [0.5, 500, 1500, "Founder Message"], "isController": false}, {"data": [0.5, 500, 1500, "Managing Desk-0"], "isController": false}, {"data": [0.5, 500, 1500, "Managing Desk-1"], "isController": false}, {"data": [1.0, 500, 1500, "Principals Desk"], "isController": false}, {"data": [1.0, 500, 1500, "Admission-1"], "isController": false}, {"data": [1.0, 500, 1500, "Admission-0"], "isController": false}, {"data": [0.5, 500, 1500, "Instructions"], "isController": false}, {"data": [1.0, 500, 1500, "Principals Desk-0"], "isController": false}, {"data": [0.5, 500, 1500, "Circular"], "isController": false}, {"data": [0.0, 500, 1500, "CA Result"], "isController": false}, {"data": [0.5, 500, 1500, "Exam Rules"], "isController": false}, {"data": [1.0, 500, 1500, "Leadership-0"], "isController": false}, {"data": [1.0, 500, 1500, "Schedule-0"], "isController": false}, {"data": [1.0, 500, 1500, "Leadership-1"], "isController": false}, {"data": [1.0, 500, 1500, "Schedule-1"], "isController": false}, {"data": [1.0, 500, 1500, "CA Result-1"], "isController": false}, {"data": [0.0, 500, 1500, "CA Result-0"], "isController": false}, {"data": [0.5, 500, 1500, "Research"], "isController": false}, {"data": [1.0, 500, 1500, "Founder Message-0"], "isController": false}, {"data": [0.5, 500, 1500, "Founder Message-1"], "isController": false}, {"data": [1.0, 500, 1500, "COE"], "isController": false}, {"data": [0.0, 500, 1500, "Francis Xavier Engineering College"], "isController": false}, {"data": [0.0, 500, 1500, "Managing Desk"], "isController": false}, {"data": [1.0, 500, 1500, "Exam Rules-0"], "isController": false}, {"data": [1.0, 500, 1500, "Research-1"], "isController": false}, {"data": [1.0, 500, 1500, "Exam Rules-1"], "isController": false}, {"data": [1.0, 500, 1500, "Research-0"], "isController": false}, {"data": [1.0, 500, 1500, "Statistics-0"], "isController": false}, {"data": [1.0, 500, 1500, "Statistics-1"], "isController": false}, {"data": [1.0, 500, 1500, "COE-1"], "isController": false}, {"data": [1.0, 500, 1500, "COE-0"], "isController": false}, {"data": [1.0, 500, 1500, "Sylabbus Coe"], "isController": false}, {"data": [0.5, 500, 1500, "Statistics"], "isController": false}, {"data": [1.0, 500, 1500, "Instructions-0"], "isController": false}, {"data": [0.5, 500, 1500, "Instructions-1"], "isController": false}, {"data": [0.0, 500, 1500, "Francis Xavier Engineering College-0"], "isController": false}, {"data": [0.0, 500, 1500, "Francis Xavier Engineering College-1"], "isController": false}, {"data": [0.0, 500, 1500, "Overview of FXEC"], "isController": false}, {"data": [0.5, 500, 1500, "Result-0"], "isController": false}, {"data": [1.0, 500, 1500, "Schedule"], "isController": false}, {"data": [0.5, 500, 1500, "Result-1"], "isController": false}, {"data": [0.5, 500, 1500, "Rank Holders"], "isController": false}, {"data": [0.5, 500, 1500, "Circular-1"], "isController": false}, {"data": [1.0, 500, 1500, "Admission"], "isController": false}, {"data": [1.0, 500, 1500, "Circular-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 60, 0, 0.0, 721.5166666666669, 145, 4214, 459.0, 1684.3, 2134.7499999999995, 4214.0, 2.767144767790435, 79.68052809228428, 0.4941587303417424], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Overview of FXEC-1", 1, 0, 0.0, 1105.0, 1105, 1105, 1105.0, 1105.0, 1105.0, 1105.0, 0.9049773755656109, 57.63044400452489, 0.11754100678733032], "isController": false}, {"data": ["Rank Holders-0", 1, 0, 0.0, 303.0, 303, 303, 303.0, 303.0, 303.0, 303.0, 3.3003300330033003, 1.6727258663366338, 0.45121699669966997], "isController": false}, {"data": ["Leadership", 1, 0, 0.0, 669.0, 669, 669, 669.0, 669.0, 669.0, 669.0, 1.4947683109118086, 104.93010790358744, 0.39412836322869954], "isController": false}, {"data": ["Rank Holders-1", 1, 0, 0.0, 515.0, 515, 515, 515.0, 515.0, 515.0, 515.0, 1.941747572815534, 35.59048847087379, 0.2654733009708738], "isController": false}, {"data": ["Exam Meet-0", 1, 0, 0.0, 371.0, 371, 371, 371.0, 371.0, 371.0, 371.0, 2.6954177897574128, 1.358237870619946, 0.3606174191374663], "isController": false}, {"data": ["Overview of FXEC-0", 1, 0, 0.0, 510.0, 510, 510, 510.0, 510.0, 510.0, 510.0, 1.9607843137254901, 0.9803921568627451, 0.254672181372549], "isController": false}, {"data": ["Exam Meet-1", 1, 0, 0.0, 460.0, 460, 460, 460.0, 460.0, 460.0, 460.0, 2.1739130434782608, 46.908967391304344, 0.29084578804347827], "isController": false}, {"data": ["TimeTable-1", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 143.49200274493245, 0.4552892736486487], "isController": false}, {"data": ["TimeTable-0", 1, 0, 0.0, 529.0, 529, 529, 529.0, 529.0, 529.0, 529.0, 1.890359168241966, 0.9544098534971645, 0.2547554347826087], "isController": false}, {"data": ["Exam Meet", 1, 0, 0.0, 832.0, 832, 832, 832.0, 832.0, 832.0, 832.0, 1.201923076923077, 26.54090294471154, 0.3216083233173077], "isController": false}, {"data": ["Result", 1, 0, 0.0, 1328.0, 1328, 1328, 1328.0, 1328.0, 1328.0, 1328.0, 0.7530120481927711, 13.474797628012048, 0.1985480986445783], "isController": false}, {"data": ["TimeTable", 1, 0, 0.0, 826.0, 826, 826, 826.0, 826.0, 826.0, 826.0, 1.2106537530266344, 52.0321012409201, 0.3263090193704601], "isController": false}, {"data": ["Sylabbus Coe-0", 1, 0, 0.0, 222.0, 222, 222, 222.0, 222.0, 222.0, 222.0, 4.504504504504505, 2.269847972972973, 0.6026534346846847], "isController": false}, {"data": ["Principals Desk-1", 1, 0, 0.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 236.22615461847388, 0.5490712851405622], "isController": false}, {"data": ["Sylabbus Coe-1", 1, 0, 0.0, 235.0, 235, 235, 235.0, 235.0, 235.0, 235.0, 4.25531914893617, 101.33394281914894, 0.5693151595744681], "isController": false}, {"data": ["Founder Message", 1, 0, 0.0, 1054.0, 1054, 1054, 1054.0, 1054.0, 1054.0, 1054.0, 0.9487666034155597, 58.474227644686906, 0.2761059060721062], "isController": false}, {"data": ["Managing Desk-0", 1, 0, 0.0, 1057.0, 1057, 1057, 1057.0, 1057.0, 1057.0, 1057.0, 0.9460737937559129, 0.4868953997161779, 0.1367372280037843], "isController": false}, {"data": ["Managing Desk-1", 1, 0, 0.0, 1083.0, 1083, 1083, 1083.0, 1083.0, 1083.0, 1083.0, 0.9233610341643582, 53.461161126500464, 0.13345452446906741], "isController": false}, {"data": ["Principals Desk", 1, 0, 0.0, 453.0, 453, 453, 453.0, 453.0, 453.0, 453.0, 2.207505518763797, 130.9650075883002, 0.6036147902869757], "isController": false}, {"data": ["Admission-1", 1, 0, 0.0, 145.0, 145, 145, 145.0, 145.0, 145.0, 145.0, 6.896551724137931, 631.9908405172414, 0.9024784482758621], "isController": false}, {"data": ["Admission-0", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 2.5957334844559585, 0.6780278497409327], "isController": false}, {"data": ["Instructions", 1, 0, 0.0, 886.0, 886, 886, 886.0, 886.0, 886.0, 886.0, 1.128668171557562, 23.282087683408577, 0.31082463318284426], "isController": false}, {"data": ["Principals Desk-0", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 2.4844898897058827, 0.6701899509803922], "isController": false}, {"data": ["Circular", 1, 0, 0.0, 948.0, 948, 948, 948.0, 948.0, 948.0, 948.0, 1.0548523206751055, 21.626532832278482, 0.28431566455696206], "isController": false}, {"data": ["CA Result", 1, 0, 0.0, 2073.0, 2073, 2073, 2073.0, 2073.0, 2073.0, 2073.0, 0.482392667631452, 8.487567082730342, 0.12907772551857213], "isController": false}, {"data": ["Exam Rules", 1, 0, 0.0, 815.0, 815, 815, 815.0, 815.0, 815.0, 815.0, 1.2269938650306749, 34.04907975460123, 0.3331096625766871], "isController": false}, {"data": ["Leadership-0", 1, 0, 0.0, 339.0, 339, 339, 339.0, 339.0, 339.0, 339.0, 2.949852507374631, 1.4806876843657817, 0.3888965707964602], "isController": false}, {"data": ["Schedule-0", 1, 0, 0.0, 165.0, 165, 165, 165.0, 165.0, 165.0, 165.0, 6.0606060606060606, 3.0539772727272725, 0.810842803030303], "isController": false}, {"data": ["Leadership-1", 1, 0, 0.0, 330.0, 330, 330, 330.0, 330.0, 330.0, 330.0, 3.0303030303030303, 211.2008759469697, 0.3995028409090909], "isController": false}, {"data": ["Schedule-1", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 71.61458333333333, 0.47953068996415765], "isController": false}, {"data": ["CA Result-1", 1, 0, 0.0, 380.0, 380, 380, 380.0, 380.0, 380.0, 380.0, 2.631578947368421, 44.975842927631575, 0.3520764802631579], "isController": false}, {"data": ["CA Result-0", 1, 0, 0.0, 1692.0, 1692, 1692, 1692.0, 1692.0, 1692.0, 1692.0, 0.5910165484633569, 0.29781693262411346, 0.07907154994089835], "isController": false}, {"data": ["Research", 1, 0, 0.0, 635.0, 635, 635, 635.0, 635.0, 635.0, 635.0, 1.574803149606299, 28.33107775590551, 0.4090797244094488], "isController": false}, {"data": ["Founder Message-0", 1, 0, 0.0, 200.0, 200, 200, 200.0, 200.0, 200.0, 200.0, 5.0, 2.578125, 0.7275390625], "isController": false}, {"data": ["Founder Message-1", 1, 0, 0.0, 853.0, 853, 853, 853.0, 853.0, 853.0, 853.0, 1.1723329425556857, 71.64854740621337, 0.17058360199296602], "isController": false}, {"data": ["COE", 1, 0, 0.0, 353.0, 353, 353, 353.0, 353.0, 353.0, 353.0, 2.8328611898017, 114.49849504249292, 0.708215297450425], "isController": false}, {"data": ["Francis Xavier Engineering College", 1, 0, 0.0, 4214.0, 4214, 4214, 4214.0, 4214.0, 4214.0, 4214.0, 0.23730422401518747, 35.24338514475557, 0.057935601566207875], "isController": false}, {"data": ["Managing Desk", 1, 0, 0.0, 2141.0, 2141, 2141, 2141.0, 2141.0, 2141.0, 2141.0, 0.4670714619336758, 27.283085444885568, 0.13501284446520317], "isController": false}, {"data": ["Exam Rules-0", 1, 0, 0.0, 456.0, 456, 456, 456.0, 456.0, 456.0, 456.0, 2.1929824561403506, 1.1093407346491229, 0.29768023574561403], "isController": false}, {"data": ["Research-1", 1, 0, 0.0, 413.0, 413, 413, 413.0, 413.0, 413.0, 413.0, 2.4213075060532687, 42.3492357748184, 0.31448622881355937], "isController": false}, {"data": ["Exam Rules-1", 1, 0, 0.0, 358.0, 358, 358, 358.0, 358.0, 358.0, 358.0, 2.793296089385475, 76.10095146648045, 0.3791681215083799], "isController": false}, {"data": ["Research-0", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 2.262443438914027, 0.5877050339366516], "isController": false}, {"data": ["Statistics-0", 1, 0, 0.0, 359.0, 359, 359, 359.0, 359.0, 359.0, 359.0, 2.785515320334262, 1.4090790389972145, 0.37811194289693595], "isController": false}, {"data": ["Statistics-1", 1, 0, 0.0, 392.0, 392, 392, 392.0, 392.0, 392.0, 392.0, 2.5510204081632653, 44.56064652423469, 0.34628109056122447], "isController": false}, {"data": ["COE-1", 1, 0, 0.0, 169.0, 169, 169, 169.0, 169.0, 169.0, 169.0, 5.9171597633136095, 236.22989090236686, 0.7396449704142012], "isController": false}, {"data": ["COE-0", 1, 0, 0.0, 183.0, 183, 183, 183.0, 183.0, 183.0, 183.0, 5.46448087431694, 2.7055584016393444, 0.6830601092896175], "isController": false}, {"data": ["Sylabbus Coe", 1, 0, 0.0, 458.0, 458, 458, 458.0, 458.0, 458.0, 458.0, 2.1834061135371177, 53.09472229803493, 0.5842317139737991], "isController": false}, {"data": ["Statistics", 1, 0, 0.0, 751.0, 751, 751, 751.0, 751.0, 751.0, 751.0, 1.3315579227696406, 23.93293317243675, 0.3614971704394141], "isController": false}, {"data": ["Instructions-0", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 2.4892769607843137, 0.6749770220588236], "isController": false}, {"data": ["Instructions-1", 1, 0, 0.0, 682.0, 682, 682, 682.0, 682.0, 682.0, 682.0, 1.466275659824047, 29.501638104838708, 0.2018992851906158], "isController": false}, {"data": ["Francis Xavier Engineering College-0", 1, 0, 0.0, 2072.0, 2072, 2072, 2072.0, 2072.0, 2072.0, 2072.0, 0.48262548262548266, 0.23754222972972971, 0.058914243484555984], "isController": false}, {"data": ["Francis Xavier Engineering College-1", 1, 0, 0.0, 2138.0, 2138, 2138, 2138.0, 2138.0, 2138.0, 2138.0, 0.4677268475210477, 69.23453578110384, 0.057095562441534145], "isController": false}, {"data": ["Overview of FXEC", 1, 0, 0.0, 1615.0, 1615, 1615, 1615.0, 1615.0, 1615.0, 1615.0, 0.6191950464396285, 39.740953947368425, 0.16084558823529413], "isController": false}, {"data": ["Result-0", 1, 0, 0.0, 801.0, 801, 801, 801.0, 801.0, 801.0, 801.0, 1.2484394506866416, 0.6266580836454432, 0.16458918539325842], "isController": false}, {"data": ["Schedule", 1, 0, 0.0, 445.0, 445, 445, 445.0, 445.0, 445.0, 445.0, 2.247191011235955, 46.032303370786515, 0.6012991573033708], "isController": false}, {"data": ["Result-1", 1, 0, 0.0, 527.0, 527, 527, 527.0, 527.0, 527.0, 527.0, 1.8975332068311195, 33.00299454459203, 0.250163069259962], "isController": false}, {"data": ["Rank Holders", 1, 0, 0.0, 819.0, 819, 819, 819.0, 819.0, 819.0, 819.0, 1.221001221001221, 22.998702686202687, 0.3338675213675214], "isController": false}, {"data": ["Circular-1", 1, 0, 0.0, 708.0, 708, 708, 708.0, 708.0, 708.0, 708.0, 1.4124293785310735, 28.244449593926554, 0.1903469279661017], "isController": false}, {"data": ["Admission", 1, 0, 0.0, 339.0, 339, 339, 339.0, 339.0, 339.0, 339.0, 2.949852507374631, 271.7983729719764, 0.7720317109144542], "isController": false}, {"data": ["Circular-0", 1, 0, 0.0, 239.0, 239, 239, 239.0, 239.0, 239.0, 239.0, 4.184100418410042, 2.1124803870292888, 0.5638729079497908], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 60, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
