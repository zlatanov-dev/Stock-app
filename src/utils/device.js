export function deviceType(screenSize) {
   
  if (screenSize <= 768) {
    return "mobile";
  } else if (screenSize <= 992) {
    return "tablet";
  } else {
    return "desktop";
  }
  }

export function sizeByDevice(device, collapsed) {

  if(device === "mobile") {
    return {
      width: collapsed ? 80 : 150,
      fontSize: 10,
      fontSizePercent: collapsed ? "120%" : "100%" ,
      searchBarWidth: 350,
    }
  } else if (device === "tablet") {
    return {
      width: collapsed ? 100 : 170,
      fontSize: 15,
      fontSizePercent: collapsed ? "120%" : "100%" ,
      searchBarWidth: 400,
    }
  } else {
    return {
      width: collapsed ? 120 : 200,
      fontSize: 20,
      fontSizePercent: collapsed ? "120%" : "100%" ,
      searchBarWidth: 600,
    }
  }
}