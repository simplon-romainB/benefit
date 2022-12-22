import { Component, OnInit, Renderer2 } from '@angular/core';
import * as $ from 'jquery'
import * as L from 'leaflet';

declare const google: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public count = 0
  public imageCount = 0
  public $animation_elements = $('.animate');
  public $window = $(window);
  public translate: number = 0;
  public map: any
  public marker: any
  public markerSource: any
  private x: any
  private y: any
  private z: any
  public service: any;
  public reviews: any = [];
  
  
  


  constructor(public renderer: Renderer2) {
   this.x = setInterval(()=>{this.switch()},10000)
   this.y = setInterval(()=>{this.switchInc()},10000)
   this.z = setInterval(()=>{this.prestaSwipe()},10000)
   }

  ngOnInit(): void {
    this.initMap()
    var actif1 = false
      var actif2 = false
      var actif3 = false
      var i = 0
      var j = 0
      var k = 0
    this.renderer.listen(window, 'scroll', () =>  {var window_height = this.$window.height();
      var window_top_position = this.$window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
      
      
      
      
      
    
      $.each($('.trait'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('grandtrait');
          
        }
      }); 
      $.each($('.presta'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('prestascale');
          
        }
      }); 
      $.each($('.contact'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('contactA');
          
        }
      });
      $.each($('#activites'), function() {
        
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position) &&
            (actif1 === false)) {
              actif1 = true
              var z = setInterval(()=>{
                document.getElementById('activites').innerHTML = (i+1).toString()
                i++
                if (i > 45) {
                  clearInterval(z)
                }
              },100) 
               
          
          console.log(actif1)
        }
      });
      $.each($('#confiance'), function() {
        
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)&&
            (actif2 === false)) {
              actif2 = true
              var z = setInterval(()=>{
                document.getElementById('confiance').innerHTML = (j+1).toString()
                j++
                if (j > 326) {
                  clearInterval(z)
                }
              },10) 
          
        }
      });
      $.each($('#clients'), function() {
        
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)&&
            (actif3 === false)) {
              actif3 = true
              var z = setInterval(()=>{
                document.getElementById('clients').innerHTML = (k+1).toString()
                k++
                if (k > 250) {
                  clearInterval(z)
                  
                }
              },10) 
          
          
        }
      });
      $.each($('.reviews'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('reviewsA');
          
        }
      });
    })//ChIJ35oygBLC9EcRsfDUxeHW3po
  }
  ngAfterViewInit() {
    const request = {
      placeId: "ChIJQ-zwucrD9EcRMd8LwshyAWI",
      fields: ['reviews']
    };
    this.service = new google.maps.places.PlacesService(document.getElementById('googleReviews'));

    this.service.getDetails(request, this.callback);
    
}

public callback = (place, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    this.reviews = place.reviews.slice()
    console.log(place.reviews)
   
  }
}
createRange(number) {
  const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
}

addNumbers(target: any) {
  
}
ngOnDestroy() {
  clearInterval(this.x)
  clearInterval(this.y)
  clearInterval(this.z)

}
initMap(): void {
  this.map = L.map('map', {
    center: [45.70769912316588, 4.8733200921274],
    zoom: 18
  });
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);
      const marker = L.marker([45.70769912316588, 4.8733200921274]);
      
      marker.addTo(this.map);
      marker.bindPopup("<div>Benefit</div><div>1, rue Jules Serval</div><div>Venissieux</div>")
}

  
  switch() {
    let divarrays = ['div1', 'div2', 'div3']

    if (this.count === 1) {
      
          document.getElementById(divarrays[1]).style.display = "inline-block"
          document.getElementById(divarrays[0]).style.display = "none"
          document.getElementById(divarrays[2]).style.display = "none"
          this.count++
        
      
    }
    else if (this.count === 2) {
      document.getElementById(divarrays[2]).style.display = "inline-block"
      document.getElementById(divarrays[1]).style.display = "none"
      document.getElementById(divarrays[0]).style.display = "none"
      this.count = 0
    }
    else if(this.count === 0) {
      document.getElementById(divarrays[0]).style.display = "inline-block"
      document.getElementById(divarrays[1]).style.display = "none"
      document.getElementById(divarrays[2]).style.display = "none"
      this.count++

    }
  }
  switchInc() {
    let divarrays = ['/assets/img/photo1.jpg','/assets/img/photo2.jpg' ,'/assets/img/photo3.jpg' ]

    if (this.imageCount === 1) {
      
      document.getElementById('imgdroite').style.backgroundImage = "url(" + divarrays[1] + ")"
      this.imageCount++
        
      
    }
    else if (this.imageCount === 2) {
      document.getElementById('imgdroite').style.backgroundImage = "url(" + divarrays[2] + ")"
      this.imageCount = 0
    }
    else if(this.imageCount === 0) {
      document.getElementById('imgdroite').style.backgroundImage = "url(" + divarrays[0] + ")"
      this.imageCount++

    }
  }

  backSwitch() {
    let divarrays = ['div1', 'div2', 'div3']

    if (this.count === 1) {
      
      document.getElementById(divarrays[1]).style.display = "inline-block"
      document.getElementById(divarrays[0]).style.display = "none"
      document.getElementById(divarrays[2]).style.display = "none"
      this.count--
        
      
    }
    else if (this.count === 2) {
      document.getElementById(divarrays[2]).style.display = "inline-block"
      document.getElementById(divarrays[1]).style.display = "none"
      document.getElementById(divarrays[0]).style.display = "none"
      this.count --
    }
    else if(this.count === 0) {
      document.getElementById(divarrays[0]).style.display = "inline-block"
      document.getElementById(divarrays[1]).style.display = "none"
      document.getElementById(divarrays[2]).style.display = "none"
      this.count = 2

    }
  }
  backSwitchInc() {
    let divarrays = ['/assets/img/photo1.jpg','/assets/img/photo2.jpg' ,'/assets/img/photo3.jpg' ]

    if (this.imageCount === 1) {
      
      document.getElementById('imgdroite').style.backgroundImage = "url(" + divarrays[1] + ")"
      this.imageCount--
        
      
    }
    else if (this.imageCount === 2) {
      document.getElementById('imgdroite').style.backgroundImage = "url(" + divarrays[2] + ")"
      this.imageCount --
    }
    else if(this.imageCount === 0) {
      document.getElementById('imgdroite').style.backgroundImage = "url(" + divarrays[0] + ")"
      this.imageCount = 2

    }
  }
  prestaSwipe() {
    let divarrays = ['mobilediv1','mobilediv2' ,'mobilediv3' ]

    if (this.translate === 0) {
      document.getElementById('mobilediv3').style.transitionDuration = "0s"
      document.getElementById('mobilediv3').style.transform = "translate(0vw)"
      var t = setTimeout(()=>{
      document.getElementById('mobilediv1').style.transitionDuration = "1s"
      document.getElementById('mobilediv2').style.transitionDuration = "1s"
      document.getElementById('mobilediv3').style.transitionDuration = "1s"
      document.getElementById('mobilediv1').style.transform = "translate(-100vw)"
      document.getElementById('mobilediv2').style.transform = "translate(-100vw)"
      document.getElementById('mobilediv3').style.transform = "translate(-100vw)"
    })
      this.translate ++
    }
    else if (this.translate === 1) {
      document.getElementById('mobilediv1').style.transform = "translate(-200vw)"
      document.getElementById('mobilediv2').style.transform = "translate(-200vw)"
      document.getElementById('mobilediv3').style.transform = "translate(-200vw)"
      this.translate ++
    }
    else if(this.translate === 2) {
      document.getElementById('mobilediv1').style.transitionDuration = "0s"
      document.getElementById('mobilediv2').style.transitionDuration = "0s"
      document.getElementById('mobilediv1').style.transform = "translate(100vw)"
      document.getElementById('mobilediv2').style.transform = "translate(100vw)"
      var z = setTimeout(()=>{
        document.getElementById('mobilediv1').style.transitionDuration = "1s"
        document.getElementById('mobilediv2').style.transitionDuration = "1s"
        document.getElementById('mobilediv1').style.transform = "translate(0vw)"
        document.getElementById('mobilediv2').style.transform = "translate(0vw)"
        document.getElementById('mobilediv3').style.transform = "translate(-300vw)"
      }, 1)
      this.translate = 0
    }
  }
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}

