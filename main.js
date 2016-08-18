$(document).ready(function () {
    var timetable = new Timetable();
    var data = [];

    $("ul.rooms-list li").click(function () {
        var id = $(this).attr("id");

        $.getJSON("http://api.borusan.com/middleware/v1/Exchange/GetMeetings/" + id, function (json) {
            console.log(timetable);
            var roomMeetings = json.data[0].detail;
            timetable.addLocations([json.data[0].roomName]);
            var filteredRoomMeetings = roomMeetings.filter(function (meeting, index) {



                console.log('Karsılastıracagımız toplantı', meeting)
                for (var i = 0; i < roomMeetings.length; i++) {

                    console.log(i + '. toplantıyla karsılastır', roomMeetings[i]);

                }

                /* if (new Date(meeting.end).getDate() == new Date().getDate()) {
                     return new Date(meeting.end) > new Date();
                 } else {
                     return new Date(meeting.end).getHours() < new Date().getHours();
                 } */


                if (true) { //saatler cakısıyorsa
                    if (new Date(meeting.end).getDate() == new Date().getDate()) {
                        return new Date(meeting.end) > new Date();
                    }
                } else {
                    if (new Date(meeting.end).getDate() != new Date().getDate()) {
                        return new Date(meeting.end).getHours() < new Date().getHours();
                    }

                }


            });

            $.each(filteredRoomMeetings, function (i, val) {
                //gelen toplantı odası tek bir obje oldugu için array içerisinde gelmesine gerek yok

                timetable.addEvent(val.subject, json.data[0].roomName, new Date(val.start), new Date(val.end), '#');
            });

            var renderer = new Timetable.Renderer(timetable);
            renderer.draw('.timetable');
            console.log($('.time-entry'));
            $('.time-entry small').click(function (event) {
                             
                event.preventDefault();
                event.stopPropagation();

                
                $("#meeting-room").text(this.innerText);
            })
        });
    });





    /*$('#batman').click(function (e) {
         e.preventDefault
         var roomName = '';
 
         var n = $(".rooms-list li").index(this);
         //console.log(n);
         $.getJSON("http://api.borusan.com/middleware/v1/Exchange/GetMeetings/" + n, function (json) {
             //$(".content").html(JSON.stringify(json.data, undefined, 2));
             //var timetable = new Timetable();
             data=json.data;
            //timetable.setScope(9, 2)
             data.filter(function (item) {
                 if (item.roomName === "Batman Toplantı Odası / Ataşehir / Büyükhanlı Plaza") {
                      roomName = item.roomName;
                      timetable.addLocations([roomName]);
 
                      item.detail.filter(function(detail) {
                       console.log(detail.subject);
                        
                       var subjects = [];
                       for (var i = 0; i < item.detail.length; i++) {
                           subjects.push(item.detail[i].subject);
                           
                       }
                       timetable.addEvent(item.detail[0].subject, roomName, new Date(2016, 7, 17, 8, 30), new Date(2016, 7, 17, 10, 45), '#');
                       timetable.addEvent(item.detail[1].subject, roomName, new Date(2016, 7, 17, 12, 45), new Date(2016, 7, 17, 14, 30), '#');
                       timetable.addEvent(item.detail[2].subject, roomName, new Date(2016, 7, 17, 14, 45), new Date(2016, 7, 17, 16, 30), '#');
                       timetable.addEvent(item.detail[3].subject, roomName, new Date(2016, 7, 17, 16, 45), new Date(2016, 7, 17, 18, 30), '#');
                       
                      });
                 }
             });
            
 
             var renderer = new Timetable.Renderer(timetable);
             renderer.draw('.timetable');
         });
 
 
     });*/
});

$('.rooms-list li').mouseenter(function () {
    $(this).animate({
        height: '+=50px'
    });
});

$('.rooms-list li').mouseleave(function () {
    $(this).animate({
        height: '-=50px'
    });
});








