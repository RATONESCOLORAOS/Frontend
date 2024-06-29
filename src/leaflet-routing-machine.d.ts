
declare module 'leaflet-routing-machine' {
  import * as L from 'leaflet';

  namespace Routing {
    function control(options: any): any;
    function plan(waypoints: L.LatLng[], options: any): any;
    class OSRMv1 {
      constructor(options?: any);
    }
  }

  export = Routing;
}
