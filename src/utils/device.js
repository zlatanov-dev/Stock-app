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
      width: collapsed ? 80 : 200,
      fontSize: 20,
      fontSizePercent: collapsed ? "130%" : "100%" ,
      searchBarWidth: 350,
    }
  } else if (device === "tablet") {
    return {
      width: collapsed ? 100 : 250,
      fontSize: 25,
      fontSizePercent: collapsed ? "130%" : "100%" ,
      searchBarWidth: 400,
    }
  } else {
    return {
      width: collapsed ? 120 : 300,
      fontSize: 30,
      fontSizePercent: collapsed ? "130%" : "100%" ,
      searchBarWidth: 700,
    }
  }
}