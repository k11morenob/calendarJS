function calculate(){
    document.getElementById("calendar-dates").innerHTML='';
    //Get the initial date and end date
    var i= document.getElementById('initial_date').value
    var initial_date = new Date(i)
    initial_date.setDate(initial_date.getDate()+1)
    n_days = document.getElementById('days').value
    console.log(n_days)
    if(n_days==''){
        alert("Ingresa el número de días")
        return
    }
    var end_date  = getEndDate(initial_date, n_days)

    //declare constants
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    //get initial values
        while(initial_date.getTime()<end_date.getTime()){
        //get end of the month
        var month = initial_date.getMonth();   
        var year = initial_date.getFullYear(); 
        var end_of_month = new Date(year, month+1, 0);

        //get day number and day of the week
        var first_date = initial_date.getDate();
        var tmp = initial_date.toDateString();
        var first_day = tmp.substring(0, 3);    //Mon
        var day_no = day_name.indexOf(first_day);   //1

        //Evalue if end of month is mayor than end date
        if(end_of_month.getTime()<=end_date.getTime())
        {
        var days = end_of_month.getDate();
        initial_date = new Date(end_of_month.setDate(end_of_month.getDate()+1));
        }else{
        var days = end_date.getDate();
        initial_date = new Date(end_date.setDate(end_date.getDate()+1));
        }
        var title = month_name[month]+" "+year;
        var calendar = get_calendar(first_date ,day_no, days, title);
        document.getElementById("calendar-dates").appendChild(calendar);
        }
}

function getEndDate(date, days){
        var new_date = new Date(date);
        new_date.setDate(new_date.getDate() + parseInt(days));
        return new_date;
    }

function get_calendar(first_date, day_no, days, title){
    var table = document.createElement('table');
    table.setAttribute("class", "col-xs-4");
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = title;
    td.setAttribute("colspan", 7)
    tr.appendChild(td);
    table.appendChild(tr);
    tr = document.createElement('tr');
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        td.className = 'novalue';
        tr.appendChild(td);
    }
    
    var count = first_date;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        if(c==0 || c==6){
            td.className = 'weekend';
        }else{
            td.className = 'day';
        }
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            if(c==0 || c==6){
            td.className = 'weekend';
                 }else{
                  td.className = 'day';  
                 }
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
	return table;
}