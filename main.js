'use strict';


class Room{

    //Рисуем комнату по заданым размерам
    render(height, width){
        var svgNS = "http://www.w3.org/2000/svg";  
        var rect = document.createElementNS(svgNS,"rect"); 
        rect.setAttributeNS(null,"id","room");
        rect.setAttributeNS(null,"height", height);
        rect.setAttributeNS(null,"width",width);
        rect.setAttributeNS(null,"x",50);
        rect.setAttributeNS(null,"y",50);            
        rect.setAttributeNS(null,"fill","white");
        rect.setAttributeNS(null,"stroke","blue");
        document.getElementById("svg").appendChild(rect);
        
    }
    //Рисуем линию от start елемента до end елемента
    renderLine(start, end){
       
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        newElement.setAttribute("d","M "+(start.x+55)+" "+(start.y+60)+" L "+(end.x+50)+" "+(end.y+35)); //Set path's data
        newElement.style.stroke = "black"; //Set stroke colour
        newElement.style.strokeWidth = "2px"; //Set stroke width
        document.getElementById("svg").appendChild(newElement);

    }
    //Добавляем елемент HUB на нашу svg схему по координатам внутри схемы
    renderHub(x, y){
        var svgNS = "http://www.w3.org/2000/svg";  
        var rect = document.createElementNS(svgNS,"rect");

        rect.setAttributeNS(null,"id","hub");
        rect.setAttributeNS(null,"height", 15);
        rect.setAttributeNS(null,"width",15);
        rect.setAttributeNS(null,"x",50+x);
        rect.setAttributeNS(null,"y",50+y);            
        rect.setAttributeNS(null,"fill","red");
        
        document.getElementById("svg").appendChild(rect);
    }
    //Рисуем елемент Sensor на нашей svg схеме по координатам внутри схемы
    renderSensor(x, y){
        var svgNS = "http://www.w3.org/2000/svg";  
        var sens = document.createElementNS(svgNS,"circle"); 
        sens.setAttributeNS(null,"r",7.5);
        sens.setAttributeNS(null,"cx",50+x);
        sens.setAttributeNS(null,"cy",35+y);
        sens.setAttributeNS(null,"fill","white");            
        sens.setAttributeNS(null,"stroke","blue");
        document.getElementById("svg").appendChild(sens);
    }

}


let data =[
    {
        'name':"room1",
        'height':250,
        'width':600,
        'hub':{
            'x':50,
            'y':0
        },
        'sensor':[
            {
                'x':150,
                'y':50
            },
            {
                'x':100,
                'y':50
            }
        ]
    },
    {
        'name':"room2",
        'height':250,
        'width':600,
        'hub':{
            'x':0,
            'y':100
        },
        'sensor':[
            {
                'x':50,
                'y':50
            },
            {
                'x':10,
                'y':20
            }
        ]
    }
];

//получаем выбраный номер комнаты с елемента 
let rooms = document.getElementById('rooms');
let roomIndex = 0;
data.forEach(function(item,i,array){
    let option = document.createElement("option");
    option.text = item.name;
    rooms.add(option,i)
})
//Обработчик выбора комнаты, рисуем новую комнату при ее выборе
rooms.onchange = ()=> {
    roomIndex = rooms.selectedIndex;
    let roomParams = data[roomIndex];
    let b = new Room();
    b.render(roomParams.height,roomParams.width);
    if(roomParams.hub.x==0 || roomParams.hub.y==0){
        b.renderHub(roomParams.hub.x,roomParams.hub.y);    
        roomParams.sensor.forEach((item,i,array)=>{
           if(item.y<=roomParams.height && item.x<=roomParams.width){
                b.renderSensor(item.x,item.y)
                b.renderLine(roomParams.hub,item);
            }else{
                console.log("Сенсор залез в другую комнату");
            }    
        });
    }else{
        console.log("У хаба должно быть 0 на x или y");
    }
        
}

let roomParams = data[roomIndex];
let b = new Room();
b.render(roomParams.height,roomParams.width);
b.renderHub(roomParams.hub.x,roomParams.hub.y);
roomParams.sensor.forEach((item,i,array)=>{
    b.renderSensor(item.x,item.y)
    b.renderLine(roomParams.hub,item);    
});
