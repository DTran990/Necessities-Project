const hour = document.getElementById('hour');
const min = document.getElementById('minute');
const timezone = document.getElementById('timezone');
const date = document.getElementById('date');

const seconds_with_leading_zeros= (dt) =>
{ 
  return /\((.*)\)/.exec(new Date().toString())[1];
}
const clock= () =>{
  const dt = new Date();
  let h= dateFns.format(dt ,'hh');
  let m= dateFns.format(dt ,'mm');
  let tz=seconds_with_leading_zeros(dt);
  let fulldate=`${dateFns.format(dt,'ddd')}, ${dateFns.format(dt,'MMM')} ${dateFns.format(dt,'D')}, ${dateFns.format(dt,'YYYY')}`;
  let ap=dateFns.format(dt,'A');
  timezone.innerHTML=tz;
  hour.innerHTML=h;
  min.innerHTML=`<p id="minute">${m}<span id="ampm">${ap}</span></p>`;
  date.innerHTML=fulldate;

}
setInterval(clock,1000);

