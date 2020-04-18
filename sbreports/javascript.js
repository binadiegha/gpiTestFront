var dataobject;
var tokenObject = JSON.parse(localStorage.tokenObj);

if (localStorage.TestToken != undefined) {
                    var fgfgf = localStorage.TestToken;
                    url = "http://178.128.251.254:5800/prepareTestResults?names="+tokenObject.extra.fname+" "+tokenObject.extra.lname+"&userid="+tokenObject.extra.username+"&testtoken="+localStorage.TestToken+"&username="+tokenObject.extra.username+"&testid="+localStorage.TestID+"&testtype="+localStorage.TestGroup+"&testname="+localStorage.TestName;
                    
            } else {
                    url = "http://178.128.251.254:5800/getAllTestResults?names="+tokenObject.extra.fname+" "+tokenObject.extra.lname+"&userid="+tokenObject.extra.username+"&username="+tokenObject.extra.username;
                    
            }
var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {

                if (this.readyState == 4 && this.status == 200) {

                    //console.log(this.responseText);

                    //alert(this.responseText);
                    dataobject1 = JSON.parse(this.responseText);

                   //makeDataTable(this.responseText);
                   
                } else {

                   

                }

            };

            xhttp.open("GET", url, false);

            //xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();


            var DatatablesDataSourceHtml = function() {
//console.log(JSON.stringify(dataobject1['data']));
dataobject2 = dataobject1['data'];
var dataobject = [];


                    Object.keys(dataobject2).forEach(function(key,index) {

                        //console.log(key);
                        //console.log(index);
                        //console.log(Object.values(dataobject2[index]));
                        console.log(dataobject2[index]);
                        if (dataobject2[index].testtype != "Psychometrics") {
                            dataobject.push(Object.values(dataobject2[index]));
                        }

                    });
//console.log(dataobject);

//console.log(dataobject2);
//console.log(Object.keys(dataobject[1]));

var vasd = JSON.stringify(Object.values(dataobject));

//console.log(Object.values(vasd));
    //var dataJSONArray = JSON.parse('[["id":"3","uid":"coreadmin","testscore":"0","testid":"3","course":"Christian Religious Knowledge","takenon":"2019-07-09 07:47:25","testtype":"Religion"],["id":"2","uid":"coreadmin","testscore":"0","testid":"2","course":"Drivers Test","takenon":"2019-07-09 07:47:24","testtype":"Driving"],["id":"1","uid":"coreadmin","testscore":"0","testid":"1","course":"General Psychometric","takenon":"2019-07-09 07:47:24","testtype":"Psychometrics"]]');

 var dataJSONArray = JSON.parse(vasd);
    //dataobject.data; //JSON.parse(dataobject);

    var initTable1 = function() {
        var table = $('#m_table_1');

        // begin first table
        table.DataTable({
            responsive: true,
            data: dataJSONArray,
            columnDefs: [
                {
                    targets: -1,
                    title: 'Actions',
                    orderable: false,
                    render: function(data, type, full, meta) {
                        return `
                        <span class="dropdown">
                            <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <!--a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>
                                <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a-->
                                <a class="dropdown-item" href="../psyreport"><i class="la la-print"></i> Generate Report</a>
                            </div>
                        </span>
                        <a href="../psyreport" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                          <i class="la la-edit"></i>
                        </a>`;
                    },
                },
            ],
        });
    };

    return {

        //main function to initiate the module
        init: function() {
            initTable1();
        },

    };

}();

jQuery(document).ready(function() {
    DatatablesDataSourceHtml.init();
});