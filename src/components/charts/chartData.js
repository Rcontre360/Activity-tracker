import Chart from 'chart.js';

class ChartConfig{

    constructor(type,data,ctx){
        this.chartData.container = ctx;

        if (type==="week")
            this.setByWeek();
        else if (type==="month")
            this.setByMonth();
        else if (type==="year")
            this.setByYear();
        else if (type==="day")
            this.setByDay();

        this.setDataset(type,data);
    }

    auxData = {
        "week":{
            size:(day)=>7,
            get:(date)=>date.getDay()
        },
        "month":{
            size:(month)=>{
                if (month==2) return 28;
                if ((month<=7 && month%2==0) || (month>7 && month%2==1))
                    return 31;
                return 30;
            },
            get:(date)=>date.getMonth()
        },
        "year":{
            size:(year)=>12,
            get:(date)=>date.getMonth()
        },
        "day":{
            size:(hour)=>24,
            get:(date)=>date.getHours()
        },
        "currentDate":(type)=>{
            if (type==="month" || type==="year") 
                return (new Date()).getMonth();
            if (type==="week")
                return (new Date()).getDay();
            if (type==="day")
                return (new Date()).getHours();
        }
    }

    chartData = {
        start:undefined,
        end:undefined,
        unit:undefined,
        dataSet:undefined,
        colors:["#3e95cd","#aaff","#ed0543","#ecf589","#4b7ab8"],
        container:undefined
    }

    setValues(start,end,unit){
        this.chartData.start = start;
        this.chartData.end = end;
        this.chartData.unit = unit;
    }

    setByDay(){
        let morning = (new Date(Date.now())).setHours(0,0,0,0);
        let night = (new Date(Date.now())).setHours(24,0,0,0);
        
        this.setValues(morning,night,"hours");
    }

    setByWeek(){
        let monday = (new Date()).getDate()-((new Date()).getDay());
        let sunday = (new Date()).getDate()-((new Date()).getDay())+6;
        monday = (new Date()).setDate(monday);
        sunday = (new Date()).setDate(sunday);

        this.setValues(monday,sunday,"day");
    }

    setByMonth(){
        let firstDay = (new Date(Date.now())).setDate(1);
        const month = new Date(Date.now()).getMonth();
        
        let lastDay = (new Date(Date.now())).setDate(this.auxData.month.size(month));

        firstDay = (new Date(firstDay)).setHours(0,0,0,0);
        lastDay = (new Date(lastDay)).setHours(23,59,59,0);

        this.setValues(firstDay,lastDay,"day");
    }

    setByYear(){
        let beginningYear = (new Date(Date.now())).setMonth(0,1);
        let endOfYear = (new Date(Date.now())).setMonth(11,31);

        beginningYear = (new Date(beginningYear)).setHours(0,0,0,0);
        endOfYear = (new Date(endOfYear)).setHours(23,59,59,0);

        this.setValues(beginningYear,endOfYear,"month")
    }

    setDataset(type,userData){
        const data = userData.tasksData;
        let today = this.auxData["currentDate"](type)
        let siz = this.auxData[type].size(today);
        

        let dataRes = userData.userTasksArray.map((el,k)=>{

            let datesArr = userData.tasksData.get(el.id).data
            datesArr = datesArr.filter((e)=>e.end!=undefined);
            let cur = new Array(this.auxData[type].size(siz));
            const func = this.auxData[type].get;
            cur.fill({x:0,y:0});

            for (var i in datesArr){
                const place = func(new Date(datesArr[i].end));
                cur[place].x=new Date(datesArr[i].end)
                cur[place].y+=datesArr[i].end-datesArr[i].start;
                cur[place].y = Math.floor(cur[place].y/1000)
            }

            cur = cur.filter((d,i)=>i<=today);
            cur = cur.map((d)=>{return {x:d.x,y:d.y};});

            return {
                label:el.name,
                data:cur,
                fill:false,
                borderColor:this.chartData.colors[k%5],
                backgroundColor:this.chartData.colors[k%5]
            }
        })

        this.chartData.dataSet = dataRes;
    }

    startChart(){

        const chartObj = {
          responsive:true,
          type: 'line',
          data: {
            labels: [this.chartData.start,this.chartData.end],
            datasets: this.chartData.dataSet,
          },
          options: {
            scales: {
              xAxes: [{
                type: "time",
                time: {
                    unit:this.chartData.unit,
                    round:this.chartData.unit,
                    displayFormats: {
                        hours: 'HH : SS'
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    min: this.chartData.start,
                    max: this.chartData.end
                }
              }],
              yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: 'Seconds'
                    },
                    ticks: {
                        beginAtZero: true  
                    }
                }]
            }
          }
        }
        
        var myChart = new Chart(this.chartData.container,chartObj);
    }

}

export default ChartConfig;