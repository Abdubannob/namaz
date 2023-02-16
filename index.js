const prayerTimes = document.getElementById("pray")
const month = document.querySelector('table')
const screen = document.querySelector(".months")
let Today = `https://api.aladhan.com/v1/timingsByCity?city=fergana&country=uzbekistan`
let monthly = `https://api.aladhan.com/v1/calendarByCity?city=Tashkent&country=Uzbekistan&method=2023`


async function getTimes(Today){
    let res = await fetch(Today)
    let database = await res.json()
    return database
}

async function RenderHTML(api){
    let data = await getTimes(api)
    
    prayerTimes.innerHTML +=`
    <div class="box box1">
    <p><h1>Bomdod</h1></p>
    <span>${data.data.timings.Fajr}</span>
    <div>Month: ${data.data.date.hijri.month.en}</div>
    
    <div>Hijriy: ${data.data.date.hijri.date}</div>
    <div>Milodiy: ${data.data.date.gregorian.date}</div>
   
</div>
<div class="box box2">
    <p><h1>Quyosh</h1></p>
    <span>${data.data.timings.Sunrise}</span>
    <div>Month: ${data.data.date.hijri.month.en}</div>
<div>Hijriy: ${data.data.date.hijri.date}</div>
<div>Milodiy: ${data.data.date.gregorian.date}</div>
</div>


<div class="box box3">
<p><h1>Peshin</h1></p>
<span>${data.data.timings.Dhuhr}</span>
<div>Month: ${data.data.date.hijri.month.en}</div>

<div>Hijriy: ${data.data.date.hijri.date}</div>
<div>Milodiy: ${data.data.date.gregorian.date}</div>
</div>


<div class="box box4">
<p><h1>Asr</h1></p>
<span>${data.data.timings.Asr}</span>
<div>Month: ${data.data.date.hijri.month.en}</div>

<div>Hijriy: ${data.data.date.hijri.date}</div>
<div>Milodiy: ${data.data.date.gregorian.date}</div>
</div>


<div class="box box5">
<p><h1>Shom</h1></p>
<span>${data.data.timings.Maghrib}</span>
<div>Month: ${data.data.date.hijri.month.en}</div>

<div>Hijriy: ${data.data.date.hijri.date}</div>
<div>Milodiy: ${data.data.date.gregorian.date}</div>
</div>


<div class="box box6">
<p><h1>Xufton</h1></p>
<span>${data.data.timings.Isha}</span>
<div>Month: ${data.data.date.hijri.month.en}</div>

<div>Hijriy: ${data.data.date.hijri.date}</div>
<div>Milodiy: ${data.data.date.gregorian.date}</div>
</div>

    `
}

RenderHTML(Today)

document.getElementById('home').onclick =()=>{
    $('.section-operation').css('display', "inline-block")
    $('.monthly').css('display', "inline-block")
    $('.prayer-times').css('display', "grid")
}

document.getElementById('select').onclick =()=>{
    let select = document.getElementById('select')
    if(select.value === 'Daily'){
        $('.section-operation').css('display', "none")
        $('.monthly').css('display', "none")
        $('.prayer-times').css('display', "grid")
    }
    else if(select.value === 'Monthly'){
        $('.section-operation').css('display', "none")
        $('.prayer-times').css('display', "none")
        $('.monthly').css('display', "inline-block")
    }

}

async function GetMonth(monthly){
    let res = await fetch(monthly)
    let database = await res.json()
    return database
}

async function RenderMonth(api){
    let data = await GetMonth(api)

    data.data.forEach(async (e) => {
        let inf = await e
        screen.innerHTML =`
       <span class="dates">
        <h1>${inf.date.gregorian.month.en}</h1>
        <h1>${inf.date.gregorian.year}</h1>
        </span>
        <h1>${inf.date.hijri.month.en}  ${inf.date.hijri.year}</h1>
        `
        month.innerHTML +=`
     
        <tr>
            <td>${inf.date.gregorian.day} ${inf.date.gregorian.weekday.en}</td>
            <td>${inf.timings.Fajr}</td>
            <td>${inf.timings.Sunrise}</td>
            <td>${inf.timings.Dhuhr}</td>
            <td>${inf.timings.Asr}</td>
            <td>${inf.timings.Maghrib}</td>
            <td>${inf.timings.Isha}</td>
            <td>${inf.date.hijri.month.en}</td>
            <td>${inf.date.hijri.month.number}</td>
        </tr>
       
        `

    })
}
RenderMonth(monthly)