export function startTime() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        const resultTime = {
          Sofia: h + ":" + m + ":" + s,
          London: formatTime(h - 2, m, s),
          NewYork: formatTime(h - 7, m, s),
          Shanghai: formatTime(h + 5, m, s),
          Tokyo: formatTime(h + 6, m, s)
        };
        clearInterval(interval); 
        resolve(resultTime);
      }, 1000);
    });
  }
  
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function formatTime(h, m, s) {
    h = (h + 24) % 24; 
    return h + ":" + m + ":" + s;
  }
  

  