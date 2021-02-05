// INSTRUCTIONS TO EVERY OTHER CLASS ON HOW THEY CAN BE AN ARGUMENT TO 'addMarker()'
interface Mappable {
   location: {
     lat: number;
     lng: number;
   }

   markerContent(): string;
}

export class CustomMap {
   private googleMap: google.maps.Map; // sets type to be the Map object

   constructor(divId: string) {
     this.googleMap = new google.maps.Map(document.getElementById(divId), {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0
        }
      });
   }

// ADD MARKER CAN TAKE ANY ARGUMENT SO LONG AS IT MEETS THE REQUIREMENTS OF THE MAPPABLE INTERFACE,
// MEANING THAT THE ARGUMENT MUST HAVE A 'location' PROPERTY THAT'S AN OBJECT AND THE 'location' OBJECT MUST HAVE A 'lat' PROPERTY THAT'S A NUMBER AND A 'lng' PROPERTY THAT A NUMBER. ASS LONG AS THEY SATISFY THE MAPPABLE INTERFACE, IT CAN BE AN ARGUMENT FOR addMarker()
   addMarker(mappable: Mappable): void {
     const marker = new google.maps.Marker({
        map: this.googleMap,
        position: {
          lat: mappable.location.lat,
          lng: mappable.location.lng
        }
     });

     marker.addListener('click', () => {
       const infoWindow = new google.maps.InfoWindow({
         content: mappable.markerContent()
       });

       infoWindow.open(this.googleMap, marker)
     });
   }


  // BAD PRACTICE VERSION
  //  addUserMarker(user: User): void {
  //    new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: user.location.lat,
  //         lng: user.location.lng
  //       }
  //    });
  //  }

  // BAD PRACTICE VERSION
  //  addCompanyMarker(company: Company): void {
  //    new google.maps.Marker({
  //      map: this.googleMap,
  //      position: {
  //        lat: company.location.lat,
  //        lng: company.location.lng
  //      }
  //    });
  //  }
}
