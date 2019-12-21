import {
  LitElement,
  html,
  css,
  unsafeCSS
} from 'lit-element';


import style from "./style.css";


const sheet = new CSSStyleSheet();
sheet.replace('@import url("../src/style.css")')
  .then(sheet => {
    console.log('Styles loaded successfully');
  })
  .catch(err => {
    console.error('Failed to load:', err);
  });



export class PlanetClockElement extends LitElement {
  static get properties() {
    return {
      date: {
        type: String,
        reflect: true
      },
      daysThisYear: {
        type: Number,
        reflect: true
      },
      color: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();

    this.loaded = false;

    if (typeof style === 'undefined') {
      this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    // this.date = new Date();
    this.date = new Date('Thu Aug 22 2019 20:36:10 GMT-0800 (Pacific Standard Time)');

    // compute elapsed time in centuries, which is what JPL tables use
    const janFirst2000 = new Date(2000, 0, 1, 12, 0, 0);
    this.refDate = new Date(janFirst2000.getTime() - janFirst2000.getTimezoneOffset() * 60 * 1000);

    this.constructClock();

  }

  static get styles() {

    if (typeof style !== 'undefined') {
      return [
        css `${unsafeCSS(style)}`
      ];
    }
  }

  togglePlanetAnimation(event) {
    console.log("Toggling animation");
    this.planets.forEach(function (planet) {
      planet.classList.toggle('play');
    })

  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log('attribute change: ', name, newVal);

    if (name == 'date' && this.loaded) {
      super.attributeChangedCallback(name, oldVal, new Date(newVal));
      this.updatePlanetMap()
    } else {
      super.attributeChangedCallback(name, oldVal, newVal);
    }
  }

  render() {
    return html ` 

    <style>
      #myastro {
          --orbit-color: ${this.color}!important;
        }
    </style>
    
    <svg @click="${this.togglePlanetAnimation}" class="myastro-render frag" id="myastro" viewBox="0 0 100 100" baseProfile="full" width="100px" height="100px" xmlns="http://www.w3.org/2000/svg">

      <line x1="0" y1="50" x2="100" y2="50" class="" />
      <line x1="50" y1="0" x2="50" y2="100" class="" />

      <circle cx="0" cy="0" r="0.7" id="sun" class="sun" />

      <circle cx="0" cy="0" r="0.1" class="orbit mercury-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet mercury" />

      <circle cx="0" cy="0" r="0.1" class="orbit venus-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet venus" />

      <circle cx="0" cy="0" r="0.1" class="orbit earth-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet earth" />

      <circle cx="0" cy="0" r="0.1" class="orbit mars-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet mars" />

      <circle cx="0" cy="0" r="0.1" class="orbit asteroid-belt-orbit" stroke-dasharray="0.25 1.7" />
      <circle cx="0" cy="0" r="0" class="planet" />

      <circle cx="0" cy="0" r="0.1" class="orbit jupiter-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet jupiter" />

      <circle cx="0" cy="0" r="0.1" class="orbit saturn-orbit" />
      <circle cx="0" cy="0" r="0.1" class="planet saturn" />

      <circle cx="0" cy="0" r="0.1" class="orbit uranus-orbit" />
      <circle cx="0" cy="0" r="0.1" id="planet-uranus" class="planet uranus" />

      <circle cx="0" cy="0" r="0.1" class="orbit neptune-orbit" />
      <circle cx="0" cy="0" r="0.1" id="planet-neptune" class="planet neptune" />

    </svg>
    `;
  }

  firstUpdated(changedProperties) {
    console.log(changedProperties);

    this.myastro = this.shadowRoot.querySelector('#myastro');
    this.planets = this.shadowRoot.querySelectorAll('.planet');
    this.orbits = this.shadowRoot.querySelectorAll('.orbit');
    this.sun = this.shadowRoot.querySelector('#sun');
    this.loaded = true;

    this.checkBrowser();
    this.updatePlanetMap();
  }

  computeReferenceAngles() {
    // compute reference angles of planets for
    // calendarDate using JPL tables.
    // JPL orrery reference time is Jan 1 2000
    // (noon UT, but that won't make a diff for display)
    var Teph =
      (this.date.getTime() - this.refDate.getTime()) /
      (1000 * 60 * 60 * 24 * 36525);
    var TephJan =
      (this.TimeSinceFirstJanOfThisYear.getTime() - this.refDate.getTime()) /
      (1000 * 60 * 60 * 24 * 36525);
    for (var index = 0; index < this.RefAngle.length; index++) {
      // adding pi changes the 0 axis from six-o-clock to noon
      // this seems to be how JPL (and others?) plot their stuff
      if (this.displayOffset) {
        this.RefAngle[index] = this.JPL(Teph, index) + Math.PI - this.JPL(TephJan, 2);
      } else {
        this.RefAngle[index] = this.JPL(Teph, index) + Math.PI;
      }
    }
  }

  updatePlanetMap() {
    this.computeReferenceAngles();
    this.myastro.style.setProperty("--days-this-year", parseInt(this.daysThisYear(this.date.getFullYear())));
    this.setPlanetsOrbits();
  }
  
  isLeapYear(yearDate) {
    return yearDate % 400 === 0 || (yearDate % 100 !== 0 && yearDate % 4 === 0);
  }

  daysThisYear(isLeapYearBool) {
    return this.isLeapYear(isLeapYearBool) ? 366 : 365;
  }




  JPL(T, pindex) {
    // compute the position of planet "pindex"
    // at the given Teps time using JPL tables
    //
    // pindex: 0=mercury, 1=venus, 2=earth, etc.
    // orbit parameters from tables
    var a = this.a_0[pindex] + T * this.a_dot[pindex];
    var e = this.e_0[pindex] + T * this.e_dot[pindex];
    var I = this.I_0[pindex] + T * this.I_dot[pindex];
    var L = this.L_0[pindex] + T * this.L_dot[pindex];
    var wbar = this.wbar_0[pindex] + T * this.wbar_dot[pindex];
    var omega = this.omega_0[pindex] + T * this.omega_dot[pindex];
    // argument of perhelion
    var w = wbar - omega;
    // mean anomaly
    // FINISH ME: add correction terms for outer planets
    // UPDATE: corrections only needed for 3000/3000 AD/BC tables
    // (we're using the 1800/2050 table)
    var M = L - wbar;
    // modulus M so that -180 < M < 180
    while (M < 180) M = M + 360;
    while (M > 180) M = M - 360;
    // obtain eccentric anomaly from solution of kepler's equation
    // a "conversion" of e is needed if M and E are in degrees
    //var e_degrees = (180.0 / Math.PI) * e;
    //var E = kepler_bisect(M,e_degrees);
    // better -- convert M to radians and just use e as given
    // this will return E in radians
    var M_radians = Math.PI / 180.0 * M;
    var E_radians = this.kepler_iterate(M_radians, e);
    // compute heliocentric coordinates
    // note zprime = 0 by definition
    // these equations are just x = a cos(foo) and y = b sin(foo)
    // we also translate x to the focus (by subtracting a*e)
    var x_prime = a * (Math.cos(E_radians) - e);
    var y_prime = a * Math.sqrt(1.0 - e * e) * Math.sin(E_radians);
    // compute coordinates in J2000 ecliptic
    // we don't care about z_ecl in our application
    var w_radians = Math.PI / 180.0 * w;
    var omega_radians = Math.PI / 180.0 * omega;
    var I_radians = Math.PI / 180.0 * I;
    var cc = Math.cos(w_radians) * Math.cos(omega_radians);
    var cs = Math.cos(w_radians) * Math.sin(omega_radians);
    var sc = Math.sin(w_radians) * Math.cos(omega_radians);
    var ss = Math.sin(w_radians) * Math.sin(omega_radians);
    var ssc = ss * Math.cos(I_radians);
    var scc = sc * Math.cos(I_radians);
    var csc = cs * Math.cos(I_radians);
    var ccc = cc * Math.cos(I_radians);
    var x_ecl = (cc - ssc) * x_prime + (-sc - csc) * y_prime;
    var y_ecl = (cs + scc) * x_prime + (-ss + ccc) * y_prime;
    // for display, we convert x_ecl and y_ecl
    // to an angle and map that onto our assumed radii
    // y coordinate goes first in atan2
    // returned value is [-pi,pi]
    var p_angle = Math.atan2(y_ecl, x_ecl);
    p_angle = p_angle * -1;
    return p_angle;
  }

  kepler_iterate(M, e) {
    // solve kepler's equation M = E - e * sin(E)
    // using iteration
    // mean anomaly (M) is assumed in radians
    // eccentric anomaly (E) is returned in radians
    // this may not converge if e is close to 1
    var err;
    var tol = 0.0001;
    var this_E = M;
    var next_E;
    var sanityCheck = 0;
    while (sanityCheck++ < 100) {
      next_E = M + e * Math.sin(this_E);
      err = next_E - this_E;
      if (Math.abs(err) < tol) return next_E;
      this_E = next_E;
    }
    alert("kepler_iterate: No convergence");
    // assume caller checks returned value
    // (by plugging into keplers equation)
    // so we can just return 0 on fail
    return 0;
  }


  setPlanetsOrbits() {
    const offset = -1;
    let angle = [];
    for (let index = 0; index < 8; index++) {
      //added 180 deg to put 1st of jan at the top
      angle[index] = offset * this.RefAngle[index] * 180 / Math.PI + 180;
    }
    this.myastro.style.setProperty("--start-mercury", angle[0]);
    this.myastro.style.setProperty("--start-venus", angle[1]);
    // this.myastro.style.setProperty("--start-earth", currentTime.getDate());
    this.myastro.style.setProperty("--start-earth", angle[2]);
    this.myastro.style.setProperty("--start-mars", angle[3]);
    this.myastro.style.setProperty("--start-jupiter", angle[4]);
    this.myastro.style.setProperty("--start-saturn", angle[5]);
    this.myastro.style.setProperty("--start-uranus", angle[6]);
    this.myastro.style.setProperty("--start-neptune", angle[7]);
  }

  setLayout() {
    const planetCenterCoordinates = 50;
    const planetSizes = [0.8, 1.6, 2.0, 1.4, 0, 3, 2.5, 1.8, 1.6];
    const orbitCoordinates = [1.04, 1.111, 1.20, 1.29, 1.35, 1.44, 1.57, 1.68, 1.78];
    const planets = this.planets;
    const orbits = this.orbits;
    const sun = this.sun;

    sun.setAttribute('r', 1);
    sun.setAttribute('cx', 50);
    sun.setAttribute('cy', 50);

    for (let index = 0; index < 9; index++) {
      let planetOrbitSize = ((orbitCoordinates[index] * 1.03 * planetCenterCoordinates) - planetCenterCoordinates);

      orbits[index].setAttribute('r', planetOrbitSize);
      orbits[index].setAttribute('cx', planetCenterCoordinates);
      orbits[index].setAttribute('cy', planetCenterCoordinates);

      planets[index].setAttribute('r', planetSizes[index]);
      planets[index].setAttribute('cx', (planetCenterCoordinates + planetOrbitSize));
      planets[index].setAttribute('cy', planetCenterCoordinates);

    }
  }

  checkBrowser() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) {
      console.log("Browser is FIREFOX switching to 'Layout JS' function ");
      this.setLayout();
    }
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    var BrowerDetect = 'Detecting browsers by ducktyping:<hr>';
    BrowerDetect += 'isFirefox: ' + isFirefox + '<br>';
    BrowerDetect += 'isChrome: ' + isChrome + '<br>';
    BrowerDetect += 'isSafari: ' + isSafari + '<br>';
    BrowerDetect += 'isOpera: ' + isOpera + '<br>';
    BrowerDetect += 'isIE: ' + isIE + '<br>';
    BrowerDetect += 'isEdge: ' + isEdge + '<br>';
    BrowerDetect += 'isBlink: ' + isBlink + '<br>';
    // document.body.innerHTML = BrowerDetect;
    // console.log(BrowerDetect);
  }


  constructClock() {
    /**
     * Until CSS can enable us to tell time,
     * we need js to set the correct time.
     * The accuracy of this clock depends on that of your device.
     * This is still a pure CSS clock because it's functionality is
     * completely in CSS.
     */
    // var date = new Date(1986, 3, 1, 3, 30, 00);
    // var date = new Date(2001, 0, 1, 12, 00, 00);

    this.RefAngle = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]; // filled in on init
    this.displayOffset = true;
    let FirstJanOfThisYear = new Date(this.date.getFullYear(), 0, 1, 12, 0, 0);
    this.TimeSinceFirstJanOfThisYear = new Date(
      FirstJanOfThisYear.getTime() -
      FirstJanOfThisYear.getTimezoneOffset() * 60 * 1000
    );
    var twopi = 2 * Math.PI; // aka 2.0*Math.PI
    var orbitScale = 70; // looks nice
    // useful data
    //
    // actual orbit data: 0.4, 0.7, 1.0, 1.5,      5.2, 9.5, 19.2, 30.1
    // (on this scale, all the inner planets will be smooshed)
    //
    // more accurate orbit data (in millions of km)
    // 57.9 108.2 149.6 227.9 778.6 1433.5 2872.5 4495.1
    //
    // actual size (radius in km)
    // 4879 12104 12756 6792 142984 120536 51118 49528
    //
    // orbital period (days)
    // 88.0 224.7 365.2 687.0 4331 10,747 30,589 59,800
    // scale planet radii so everything fits on one plot
    // scaling outer planets by 0.3x looks reasonably nice
    /*
    var Size = [ 4879/12756, 12104/12756, 12756/12756, 6792/12756, 0.3*142984/12756, 0.3*120536/12756, 0.3*51118/12756, 0.3*49528/12756 ];
    */
    var erf = 0.2 * 12756;
    var Size = [
      4879 / erf, 12104 / erf, 12756 / erf, 6792 / erf, 0.18 * 142984 / erf, 0.2 * 120536 / erf, 0.2 * 51118 / erf, 0.3 * 49528 / erf
    ];
    // orbit radius -- need to scale outer planets so it all fits on one plot
    // testing indicated there was no mathematical way that gave good results
    // so we just made up something that looked nice
    var Orbit = [0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0, 6.0];
    //var Orbit = [ 0.4, 0.7, 1.0, 1.5,     3.0, 4.0, 5.0, 6.0 ];
    // orbit periods -- we use these to speed up animation
    // (caluating new positions de novo from JPL data in each frame may be too slow)
    var Period = [88.0, 224.7, parseInt(this.daysThisYear(2019)), 687.0, 4331.0, 10747.0, 30589.0, 59800.0];
    // this.RefAngle[ ] are angle in radians computed from JPL The JPL
    // tables return these wrt First Point of Aries which according
    // to canvas plotting convention would be at the six-o-clock position
    // this.RefAngle = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]; // filled in on init
    // JPL DATA TABLES
    // all derivatives are wawa/century
    // semimajor axis (AU)
    this.a_0 = [
      0.38709927, 0.72333566, 1.00000261, 1.52371034, 5.202887, 9.53667594, 19.18916464, 30.06992276
    ];
    this.a_dot = [
      0.00000037, 0.0000039, 0.00000562, 0.00001847, -0.00011607, -0.0012506, -0.00196176, 0.00026291
    ];
    // eccentricity (dimensionless)
    this.e_0 = [
      0.20563593, 0.00677672, 0.01671123, 0.0933941, 0.04838624, 0.05386179, 0.04725744, 0.00859048
    ];
    this.e_dot = [
      0.00001906, -0.00004107, -0.00004392, 0.00007882, -0.00013253, -0.00050991, -0.00004397, 0.00005105
    ];
    // inclination (degrees)
    this.I_0 = [
      7.00497902, 3.39467605, -0.00001531, 1.84969142, 1.30439695, 2.48599187, 0.77263783, 1.77004347
    ];
    this.I_dot = [
      -0.00594749, -0.0007889, -0.01294668, -0.00813131, -0.00183714, 0.00193609, -0.00242939, 0.00035372
    ];
    // mean longitude (degrees)
    this.L_0 = [
      252.2503235, 181.9790995, 100.46457166, -4.55343205, 34.39644051, 49.95424423, 313.23810451, -55.12002969
    ];
    this.L_dot = [
      149472.67411175, 58517.81538729, 35999.37244981, 19140.30268499, 3034.74612775, 1222.49362201, 428.48202785, 218.45945325
    ];
    // longitude of perihelion (degrees)
    this.wbar_0 = [
      77.45779628, 131.60246718, 102.93768193, -23.94362959, 14.72847983, 92.59887831, 170.9542763, 44.96476227
    ];
    this.wbar_dot = [
      0.16047689, 0.00268329, 0.32327364, 0.44441088, 0.21252668, -0.41897216, 0.40805281, -0.32241464
    ];
    // longitude of ascending node (degrees)
    this.omega_0 = [
      48.33076593, 76.67984255, 0.0, 49.55953891, 100.47390909, 113.66242448, 74.01692503, 131.78422574
    ];
    this.omega_dot = [
      -0.12534081, -0.27769418, 0.0, -0.29257343, 0.20469106, -0.28867794, 0.04240589, -0.00508664
    ];


    // console.log(daysThisYear(2015));
    // console.log(daysThisYear(2016));
    // console.log(currentTime.getHours());
    // console.log(currentTime.getDate());
    // console.log(currentTime.getYear());
    // console.log(currentTime.getMonth());
    var markOffset = 360 / this.daysThisYear(2016);
    // console.log(markOffset);


  }

}

// Register the element with the browser
// customElements.define('planet-clock-element', PlanetClockElement);
