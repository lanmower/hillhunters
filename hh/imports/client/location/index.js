import BackgroundLocation from "./BackgroundLocation.js";
import Location from "./Location";
import AppState from "./lib/AppState";
import { ReactiveVar } from 'meteor/reactive-var';

function sanitizeLocation(location) {
  location.timestamp = location.updatedAt;
  delete location.updatedAt;
  return location;
}

const CombinedLocation = {
  isRunning:           false,
  tracker:             null, // Used to switch between background and foreground location tracking
  locationCallback:    null, // combined location callback for bg and fg
  reactiveLocation:    new ReactiveVar(null),
  bgConfig:            {
    desiredAccuracy:      0, // Desired Accuracy of the location updates (lower = more accurate).
    distanceFilter:       1, // (Meters) Distance between points aquired.
    debug:                false, // Show debugging info on device.
    interval:             2000, // (Milliseconds) Requested Interval in between location updates.
    //ANDROID ONLY BELOW
    notificationTitle:    'Combined Location', // Customize the title of the notification.
    notificationText:     'Tracking In Progress.', // Customize the text of the notification.
    fastestInterval:      1000, //(Milliseconds) - Fastest interval OS will give updates.
    useActivityDetection: false // Use still detection
  },
  fgConfig:            {
    enableHighAccuracy: true,
    maximumAge:         5000
  },
  //Start running the background tracker, and if in the foreground, the foreground tracker
  startWatching:       function (callback) {
    var self = this;

    if (!callback) {
      throw new Meteor.Error("callback-required", "You did not pass a callback to the start watching function");
    }

    function _bgIntercept(location) {
      //We set the reactive location variable before handing it back to the callback
      self.reactiveLocation.set(location);
      self.locationCallback && self.locationCallback(location);
    }

    if(BackgroundLocation.plugin) {
      BackgroundLocation.configure(CombinedLocation.bgConfig);
      BackgroundLocation.registerForLocationUpdates(_bgIntercept);
      BackgroundLocation.start();
    }

    this.locationCallback = callback;

    this.createUpdateTracker();
    this.isRunning = true;
  },
  //Stop both background and foreground trackers
  stopWatching:        function (callback) {
    Location.stopWatching(callback);

    if(Meteor.isCordova) {
      BackgroundLocation.stop();
    }

    this.tracker && this.tracker.stop();
    this.tracker = null;


    this.isRunning = false;
  },
  //This function saves battery and app resources by turning off foreground location tracking (very aggressive)
  //while we are in the background.
  createUpdateTracker: function () {
    var self = this;
    var i = 0;
    //This tracker fires when the app goes into the background or the foreground and handles the switch
    //Between background and foreground tracking
    this.tracker = Tracker.autorun(function () {
      if (AppState.stateReactive.get() == AppState.STATES.FOREGROUND) {
        console.warn("App State Reached Foreground, spin up foreground GPS", i++);
        Location.startWatching(function (location) {
          if (location) {
            //We "sanitize" the location because the paramaters passed back are a bit different
            //for the background and foreground callbacks ( the timestamp is different)
            var sanitized = sanitizeLocation(location);
            //We set a reactive variable that can be used in trackers or other reactive contexts
            self.reactiveLocation.set(sanitized);
            //We also send the fetched location back to the callback from startWatching
            self.locationCallback(sanitized);
          }
        });
      } else {
        console.warn("App State Reached Background, spin down foreground GPS");
        Location.stopWatching();
      }
    });
  }
};

if (Meteor.isCordova) {
  Meteor.startup(function () {
    //Configure both services on startup
    BackgroundLocation.configure(CombinedLocation.bgConfig); // background
    Location.setWatchOptions(CombinedLocation.fgConfig); // foreground
    Location.debug = true;
    //You can enable this to stagger the amount of foreground GPS updates by x seconds
    //Location.enableTimeFilter(5);

    //fetch a location immediately in the foreground ( this is required before we can run the background tracker)
    Location.locate();
  });
}

export default CombinedLocation;